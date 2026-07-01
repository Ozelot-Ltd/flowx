'use client';

import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Object3D, Mesh, MeshStandardMaterial, MeshPhysicalMaterial } from 'three';
import gsap from 'gsap';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

import { useWindowStore, useScrollStore } from '../../../../../stores/useWindowStore';
import useNavigation from '../../../../../stores/useNavigation';
import { useMobile } from '../../../../../context/MobileContext';

import {
  STATES,
  SECTION_STATE,
  POSITION_KEYS,
  COLOR_KEYS,
  NODE_NAMES,
  MESH_MATERIAL,
  DURATION,
  EASE,
  MODEL_PATH,
  getColor,
  getGroupTarget,
  getScaleForDevice,
  createMaterials,
  type WindowState,
  type PositionKey,
  type ColorKey,
  type Vec3,
} from './glassConfig';

// Preload so the GLB is parsed/decoded before this component ever mounts,
// which removes the hitch during the hero -> 3D transition.
useLoader.preload(GLTFLoader, MODEL_PATH);

type MaterialRef = MeshStandardMaterial | MeshPhysicalMaterial | null;

export default function Glass() {
  const containerRef = useRef<Object3D>(null);
  const glassRef = useRef<Object3D>(null);

  // Single mutable maps of the model's nodes and materials, keyed by our
  // logical names (replaces the dozen individual refs).
  const nodes = useRef<Record<PositionKey, Object3D | null>>({
    fluid1: null,
    fluid2: null,
    gas: null,
    glassFrame: null,
    glassMesh1: null,
    glassMesh2: null,
  });
  const mats = useRef<Record<ColorKey, MaterialRef>>({
    fluid1: null,
    fluid2: null,
    gas: null,
    frame: null,
    glassMesh1: null,
    glassMesh2: null,
  });

  // The one transition timeline in flight, so a new state can cleanly kill it.
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [nodesLoaded, setNodesLoaded] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const model = useLoader(GLTFLoader, MODEL_PATH);

  const { windowState, setWindowState } = useWindowStore();
  const { isScroll } = useScrollStore();
  const { activeSection } = useNavigation();
  const device = useMobile();

  const materials = useMemo(() => createMaterials(), []);

  // Apply custom materials, capture node + material references, and remember
  // each node's original position so state offsets are relative to it.
  useEffect(() => {
    if (!model?.scene) return;

    const byName = new Map<string, Object3D>();
    model.scene.traverse((node) => byName.set(node.name, node));

    // Remember each animated node and its original position.
    for (const key of POSITION_KEYS) {
      const node = byName.get(NODE_NAMES[key]) ?? null;
      nodes.current[key] = node;
      if (node && !node.userData.originalPosition) {
        node.userData.originalPosition = {
          x: node.position.x,
          y: node.position.y,
          z: node.position.z,
        } satisfies Vec3;
      }
    }

    // Assign + capture materials by stable node name (idempotent, safe across
    // the cached GLTF scene and re-mounts).
    for (const { node: nodeName, colorKey, material } of MESH_MATERIAL) {
      const mesh = byName.get(nodeName);
      if (mesh instanceof Mesh) {
        mesh.material = materials[material];
        mats.current[colorKey] = materials[material] as MaterialRef;
      }
    }

    setNodesLoaded(true);
  }, [model, materials]);

  // Build ONE timeline that animates the group transform, every node position,
  // and every material color together. All tweens start at 0 (parallel), so the
  // whole transition is a single coordinated, killable unit.
  const applyState = useCallback(
    (rawState: string) => {
      if (!glassRef.current) return;

      const state = (
        rawState in STATES ? rawState : 'hero_vertical'
      ) as WindowState;
      const visual = STATES[state];

      timelineRef.current?.kill();
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      timelineRef.current = tl;

      const { position, rotation } = getGroupTarget({
        windowState: state,
        isScroll,
        activeSection,
        device,
      });
      tl.to(glassRef.current.position, { ...position, duration: DURATION.group }, 0);
      tl.to(glassRef.current.rotation, { ...rotation, duration: DURATION.group }, 0);

      for (const key of POSITION_KEYS) {
        const node = nodes.current[key];
        if (!node) continue;
        const base = (node.userData.originalPosition ?? { x: 0, y: 0, z: 0 }) as Vec3;
        const offset = visual.positions?.[key] ?? { x: 0, y: 0, z: 0 };
        tl.to(
          node.position,
          {
            x: base.x + offset.x,
            y: base.y + offset.y,
            z: base.z + offset.z,
            duration: DURATION.node,
          },
          0
        );
      }

      for (const key of COLOR_KEYS) {
        const material = mats.current[key];
        if (!material) continue;
        const c = getColor(visual.colors[key]);
        // No `needsUpdate`: color uniforms upload every frame automatically;
        // setting it forced a shader recompile on every tween tick.
        tl.to(material.color, { r: c.r, g: c.g, b: c.b, duration: DURATION.color }, 0);
      }
    },
    [isScroll, activeSection, device]
  );

  // One-time setup: park the glass off-screen so its first transition is a
  // slide-in from the right.
  useEffect(() => {
    if (!nodesLoaded || !glassRef.current || initialized) return;
    gsap.set(glassRef.current.position, { x: 1.5, y: 0, z: 0 });
    setInitialized(true);
  }, [nodesLoaded, initialized]);

  // Keep the group scaled correctly for the current device (re-runs on resize,
  // which also fixes mobile previously being stuck at the desktop scale).
  useEffect(() => {
    if (!nodesLoaded || !glassRef.current) return;
    glassRef.current.scale.setScalar(getScaleForDevice(device));
  }, [nodesLoaded, device]);

  // Run the transition whenever the resolved state changes.
  useEffect(() => {
    if (!nodesLoaded || !initialized) return;
    applyState(windowState);
  }, [nodesLoaded, initialized, windowState, applyState]);

  // Kill any in-flight transition on unmount.
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  // Translate the currently visible nav section into a glass state via the
  // single declarative SECTION_STATE map. While the hero is in button-driven
  // interactive mode (isScroll === false) the nav must not touch the glass —
  // the hero buttons own windowState then.
  useEffect(() => {
    if (!isScroll) return;
    const next = SECTION_STATE[activeSection];
    if (next && next !== windowState) setWindowState(next);
  }, [isScroll, activeSection, windowState, setWindowState]);

  // Subtle continuous float.
  useFrame(({ clock }) => {
    if (!containerRef.current) return;
    const time = clock.getElapsedTime() * 0.4;
    containerRef.current.rotation.y = Math.sin(time) * 0.03;
    containerRef.current.rotation.z = Math.cos(time) * 0.03;
  });

  return (
    <group ref={containerRef}>
      <group ref={glassRef}>
        <primitive object={model.scene} />
      </group>
    </group>
  );
}
