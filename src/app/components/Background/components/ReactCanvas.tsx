'use client';

import React from 'react';

import Experience from './Experience';

import { Canvas } from '@react-three/fiber';
export default function ReactCanvas() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <Experience />
    </Canvas>
  );
}
