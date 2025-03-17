'use client';

import React from 'react';
import Glas from './Glas';

export default function Experience() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} />

      {/* Main directional light (simulating sunlight) */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.7}
        color="#fff"
        castShadow
      />

      {/* Fill light from opposite direction */}
      <directionalLight
        position={[-5, 3, -2]}
        intensity={0.8}
        color="#f8f9fa"
      />

      {/* Subtle ground bounce light */}
      <directionalLight position={[0, -5, 0]} intensity={0.8} color="#f5f5f5" />

      <Glas />
    </>
  );
}
