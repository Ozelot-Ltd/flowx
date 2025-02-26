'use client';

import React, { useRef } from 'react';
import { Object3D } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useScroll, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

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
  const ref = useRef<Object3D>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const glassRef = useRef<Object3D>(null);
  const scroll = useScroll();

  useFrame(({ clock }) => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }

    const time = clock.getElapsedTime() / 4;

    if (ref.current) {
      ref.current.rotation.y = Math.cos(time * Math.sin(1.5)) / 45;
      ref.current.rotation.z = Math.cos(time * Math.sin(1)) / 50;
    }
  });

  useGSAP(() => {
    tl.current = gsap.timeline();

    if (tl.current && ref.current && glassRef.current) {
      ref.current.rotation.set(0, 0, 0);
      tl.current
        .to(glassRef.current.rotation, {
          duration: 4,
          y: 0,
          ease: 'sine',
        })
        .to(glassRef.current.rotation, {
          duration: 4,
          y: Math.PI,
          ease: 'sine',
        });
      tl.current.to(glassRef.current.position, {
        x: -1.5,
        duration: 4,
        ease: 'sine',
      });
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={glassRef} position={[1.5, 0, -1.5]} scale={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[1.5, 3, 0.05]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
