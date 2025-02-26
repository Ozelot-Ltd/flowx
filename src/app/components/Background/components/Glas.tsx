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
  roughness: 0.15,
  transmission: 1,
  ior: 1.5,
  chromaticAberration: 0.1,
  backside: true,
};

export const GLASS_HEIGHT = 2;
export const NB_SECTIONS = 4;

export default function Glas() {
  const ref = useRef<Object3D>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  const scroll = useScroll();

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  useGSAP(() => {
    tl.current = gsap.timeline();

    if (tl.current && ref.current) {
      tl.current.to(
        ref.current.position,
        {
          y: GLASS_HEIGHT * (NB_SECTIONS - 1),
          duration: 2,
          ease: 'none',
        },
        0
      );
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <boxGeometry args={[2, 4, 0.1]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
