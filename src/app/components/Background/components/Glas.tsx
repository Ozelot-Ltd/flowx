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
export const NB_SECTIONS = 4;

export default function Glas() {
  const ref = useRef<Object3D>(null);
  const tl = useRef<gsap.core.Timeline>(null);
  const glassRef = useRef<Object3D>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  useGSAP(() => {
    tl.current = gsap.timeline();

    if (tl.current && ref.current && glassRef.current) {
      tl.current.to(glassRef.current.rotation, {
        duration: 0.5,
        y: Math.PI / 2,
      });
      tl.current.to(ref.current.position, {
        x: 2,
        duration: 2,
        ease: 'power3.inOut',
      });
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={glassRef} position={[2, 0, -2]}>
        <boxGeometry args={[2, 4, 0.1]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
