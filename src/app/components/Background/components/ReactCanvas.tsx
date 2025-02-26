'use client';

import React from 'react';

import Experience from './Experience';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
export default function ReactCanvas() {
  return (
    <Canvas
      camera={{
        position: [2.3, 1.5, 2.3],
        fov: 90,
        near: 0.1,
        far: 100,
      }}
    >
      <Environment preset="studio" />
      <Experience />
    </Canvas>
  );
}
