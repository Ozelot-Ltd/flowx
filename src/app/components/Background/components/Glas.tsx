'use client';

import React, { useRef, useEffect } from 'react';
import { Object3D } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  useScrollStore,
  useWindowStore,
} from '../../../../../stores/useWindowStore';

gsap.registerPlugin(useGSAP);

const materialProps = {
  thickness: 0.05,
  roughness: 0.1,
  transmission: 0.8,
  ior: 1.0,
  chromaticAberration: 0.1,
  backside: true,
};

export const GLASS_HEIGHT = 1;
export const NB_SECTIONS = 3;

export default function Glass() {
  const containerRef = useRef<Object3D>(null);
  const glassRef = useRef<Object3D>(null);
  const scrollTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const interactiveTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const { viewport } = useThree();

  const { isScroll } = useScrollStore();
  const { windowState } = useWindowStore();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() / 2.5;
    if (containerRef.current) {
      containerRef.current.rotation.y = Math.cos(time * Math.sin(1.5)) / 45;
      containerRef.current.rotation.z = Math.cos(time * Math.sin(1)) / 50;
    }
  });

  useFrame(() => {});

  // Decide which animation mode to use based on states
  useEffect(() => {
    // Clean up any existing animations when state changes
    if (interactiveTimelineRef.current) {
      interactiveTimelineRef.current.kill();
      interactiveTimelineRef.current = null;
    }

    if (scrollTimelineRef.current) {
      scrollTimelineRef.current.kill();
      scrollTimelineRef.current = null;
    }
  }, [isScroll]);

  // Set up and manage interactive animations
  useGSAP(() => {
    if (!glassRef.current) return;

    glassRef.current.position.set(1.2, -0.1, -1.4);
    glassRef.current.rotation.set(0, 0, 0);

    if (windowState === 'front') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI * 2,
        z: 0,
        x: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
      });
    } else if (windowState === 'back') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI,
        z: 0,
        x: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
      });
    } else if (windowState === 'between') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI,
        x: Math.PI / 2,
        z: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
      });
    }
    console.log('windowState', windowState);
  }, [windowState]);

  return (
    <group ref={containerRef}>
      <mesh ref={glassRef} scale={viewport.width / 2}>
        <boxGeometry args={[1.5, 3, 0.05]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
