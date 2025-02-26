'use client';

import React from 'react';

import Experience from './Experience';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
export default function ReactCanvas() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight
        intensity={2}
        position={[2, 5, 2]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        intensity={5.5}
        position={[-2, 5, -2]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <spotLight
        intensity={1}
        position={[0, 10, 0]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      <Environment preset="city" />
      <Experience />
    </Canvas>
  );
}
