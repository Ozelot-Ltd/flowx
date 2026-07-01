'use client';

import React, { Suspense } from 'react';

import Experience from './Experience';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

export default function ReactCanvas() {
  return (
    <Canvas
      // Cap the pixel ratio: retina screens otherwise render this
      // transmission-heavy scene at 2-3x, which is the main frame-rate cost.
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{
        position: [0, 0, 0.6],
        fov: 60,
        near: 0.1,
        far: 100,
      }}
    >
      {/* The model and the HDR environment both load async — a Suspense
          boundary keeps them from suspending the whole Canvas with no fallback. */}
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Experience />
      </Suspense>
    </Canvas>
  );
}
