'use client';

import React from 'react';

import Experience from './Experience';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

export default function ReactCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 0.6],
        fov: 60,
        near: 0.1,
        far: 100,
      }}
    >
      <Environment preset="forest" />
      <Experience />
    </Canvas>
  );
}
