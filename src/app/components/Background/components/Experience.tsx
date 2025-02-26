'use client';

import React from 'react';

import { OrbitControls, ScrollControls } from '@react-three/drei';
import Glas from './Glas';

export default function Experience() {
  return (
    <>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <ScrollControls pages={3} damping={0.25}>
        <Glas />
      </ScrollControls>
    </>
  );
}
