'use client';

import React, { useRef } from 'react';
import { Object3D } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useScroll, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

gsap.registerPlugin(useGSAP);

const materialProps = {
  thickness: 0.1,
  roughness: 0.11,
  transmission: 0.8,
  ior: 1.5,
  chromaticAberration: 0.1,
  backside: true,
};

export const GLASS_HEIGHT = 1;
export const NB_SECTIONS = 3;

export default function Glas() {
  // Container group for background subtle movement
  const containerRef = useRef<Object3D>(null);
  // Glass object that will be animated with GSAP
  const glassRef = useRef<Object3D>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const scroll = useScroll();
  const { viewport } = useThree();

  useFrame(({ clock }) => {
    // Apply scroll-based timeline progress
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }

    // Subtle ambient movement for the container only
    const time = clock.getElapsedTime() / 4;
    if (containerRef.current) {
      containerRef.current.rotation.y = Math.cos(time * Math.sin(1.5)) / 45;
      containerRef.current.rotation.z = Math.cos(time * Math.sin(1)) / 50;
    }
  });

  useGSAP(() => {
    tl.current = gsap.timeline();

    if (tl.current && glassRef.current) {
      glassRef.current.position.set(1.5, 0, -1.5);
      glassRef.current.rotation.set(0, 0, 0);

      tl.current
        .to(glassRef.current.rotation, {
          duration: 4,
          y: Math.PI + 0.2,
          ease: 'sine',
        })

        .to(glassRef.current.position, {
          x: -1.5,
          duration: 4,
          ease: 'sine',
        })
        .to(
          glassRef.current.rotation,
          {
            y: Math.PI * 2,
            duration: 4,
            ease: 'sine',
          },
          '<'
        );
    }
  });

  return (
    <group ref={containerRef}>
      <mesh ref={glassRef} scale={viewport.width / 2}>
        <boxGeometry args={[1.5, 3, 0.05]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
