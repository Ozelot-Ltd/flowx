'use client';

import React from 'react';

import Glas from './Glas';
export default function Experience() {
  return (
    <>
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
      <spotLight
        intensity={1}
        position={[0, 10, 0]}
        angle={0.2}
        penumbra={1}
        castShadow
      />
      <Glas />
    </>
  );
}
