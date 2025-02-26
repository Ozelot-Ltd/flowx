import React from 'react';

import { OrbitControls } from '@react-three/drei';

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
      </mesh>
    </>
  );
}
