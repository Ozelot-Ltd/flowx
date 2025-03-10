'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import {
  Object3D,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  DoubleSide,
  Color,
  Mesh,
  Material,
} from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useFrame } from '@react-three/fiber';
import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';
import useNavigation from '../../../../../stores/useNavigation';
import { useMobile } from '../../../../../context/MobileContext';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

gsap.registerPlugin(useGSAP);

const shortTransition = 1.2;
const longTransition = 2.5;

// Helper to track the previous state to prevent redundant animations
const usePrevious = <T,>(value: T) => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default function Glass() {
  const containerRef = useRef<Object3D>(null);
  const glassRef = useRef<Object3D>(null);
  // Track animation in progress to prevent overlapping animations
  const animating = useRef(false);

  const model = useLoader(GLTFLoader, '/asset/glasss.glb');

  const { windowState, setWindowState } = useWindowStore();
  const { isScroll } = useScrollStore();
  const { activeSection } = useNavigation();
  const { isMobile } = useMobile();

  // Track previous states to prevent redundant animations
  const prevWindowState = usePrevious(windowState);
  const prevActiveSection = usePrevious(activeSection);
  const prevIsScroll = usePrevious(isScroll);

  // Create custom materials
  const materials = useMemo(() => {
    return {
      // Glass material
      'Architectural Glass.001': new MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.3,
        color: new Color('#ffffff'),
        metalness: 0.4,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
        ior: 1.5, // Glass-like refraction
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),

      // Light material
      'Bulb Emmision Light.001': new MeshPhysicalMaterial({
        color: new Color('#ffffff'),
        emissive: new Color('#ffee88'),
        emissiveIntensity: 2,
        metalness: 0.5,
        roughness: 0.2,
        transparent: true,
      }),

      // Basic white material
      'Default White': new MeshStandardMaterial({
        color: new Color('#ffffff'),
        roughness: 0.2,
        metalness: 0.1,
      }),

      // Glitter material
      'Glitter Gel.002': new MeshPhysicalMaterial({
        color: new Color('#ffffff'),
        roughness: 0.3,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        transparent: true,
      }),

      // Gas cloud material
      'Procedural volumetric gas cloud.001': new MeshStandardMaterial({
        color: new Color('lightgreen'),
        transparent: true,
        opacity: 0.8,
        side: DoubleSide,
        metalness: 0.1,
        roughness: 0.9,
      }),
    };
  }, []);

  // Apply materials to the model
  useEffect(() => {
    if (model && model.scene) {
      model.scene.traverse((node) => {
        if (node instanceof Mesh && node.material) {
          const material = node.material as Material;
          const materialName = material.name as keyof typeof materials;

          if (materials[materialName]) {
            node.material = materials[materialName];
          }
        }
      });
    }
  }, [model, materials]);

  // Subtle floating movement
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.4; // Slower animation
    if (containerRef.current) {
      containerRef.current.rotation.y = Math.sin(time) * 0.03;
      containerRef.current.rotation.z = Math.cos(time) * 0.03;
    }
  });

  // Handle section-based state changes but prevent excessive re-renders
  useEffect(() => {
    if (!glassRef.current) return;

    // Set initial scale only once
    if (!glassRef.current.userData.initialized) {
      glassRef.current.scale.set(0.42, 0.42, 0.42);
      glassRef.current.userData.initialized = true;
    }

    // Only update state if there's an actual change to avoid triggering animations
    const needsUpdate =
      isScroll !== prevIsScroll || activeSection !== prevActiveSection;

    if (!needsUpdate) return;

    if (isScroll === true && activeSection === 'hero_vertical') {
      setWindowState('hero_vertical');
    }
    if (activeSection === 'vision') {
      setWindowState('vision');
    }
    if (activeSection === 'solution') {
      setWindowState('solution');
    }
    if (activeSection === 'team') {
      setWindowState('team');
    }
  }, [
    isScroll,
    activeSection,
    setWindowState,
    isMobile,
    prevIsScroll,
    prevActiveSection,
  ]);

  // Initial position setup
  useGSAP(() => {
    if (!glassRef.current) return;
    gsap.set(glassRef.current.position, {
      x: 1,
      y: 0,
    });
  }, [window.onload]);

  // Handle animations based on state changes
  useGSAP(() => {
    if (!glassRef.current) return;

    // Skip if no state change or if animation is in progress
    if (windowState === prevWindowState && !animating.current) return;

    // Prevent animation stacking
    if (animating.current) {
      gsap.killTweensOf(glassRef.current.rotation);
      gsap.killTweensOf(glassRef.current.position);
    }

    animating.current = true;

    // Create onComplete callback to mark when animation is done
    const onComplete = () => {
      animating.current = false;
    };

    // Check for hero_vertical state when in scroll mode
    if (isScroll === true && windowState === 'hero_vertical') {
      gsap.to(glassRef.current.position, {
        x: 1.1,
        y: 0,
        duration: shortTransition,
        onComplete,
      });
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }

    if (windowState === 'front') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: -0.5,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.25,
        y: 0.05,
        z: 0,
        duration: shortTransition,
        onComplete,
      });
    }

    if (windowState === 'back') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.25,
        y: 0.05,
        z: 0,
        duration: shortTransition,
        onComplete,
      });
    }

    if (windowState === 'between') {
      gsap.to(glassRef.current.rotation, {
        x: Math.PI / 1.8,
        y: 0,
        z: 0.3,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.2,
        y: -0.05,
        z: 0.1,
        duration: shortTransition,
        onComplete,
      });
    }

    if (isScroll === true && activeSection === 'mission') {
      gsap.to(glassRef.current.position, {
        x: 1.1,
        y: 0,
        duration: shortTransition,
        onComplete,
      });
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }

    if (isScroll === true && activeSection === 'solution') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI * 1.8,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: -0.2,
        y: 0,
        z: 0,
        duration: shortTransition,
        onComplete,
      });
    }

    if (windowState === 'spaced') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI * 2,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: shortTransition,
        onComplete,
      });
    }

    if (windowState === 'team') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI * 2.2,
        z: 0,
        duration: longTransition,
      });
      gsap.to(glassRef.current.position, {
        x: -1,
        y: 0,
        z: 0,
        duration: longTransition,
        onComplete,
      });
    }
  }, [isScroll, windowState, activeSection, prevWindowState]);

  return (
    <group ref={containerRef}>
      <group ref={glassRef}>
        <primitive object={model.scene} />
      </group>
    </group>
  );
}
