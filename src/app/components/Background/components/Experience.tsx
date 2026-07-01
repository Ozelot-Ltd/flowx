'use client';

import React from 'react';
import Glas from './Glas';

export default function Experience({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
  return (
    <>
      <ambientLight intensity={isMobile ? 1.1 : 0.8} />
      {/* Cheap stand-in lighting for the HDR environment that mobile skips, so
          the physical materials still get some shading and highlights. */}
      {isMobile && (
        <>
          <hemisphereLight intensity={0.6} groundColor="#888888" />
          <directionalLight position={[2, 3, 4]} intensity={1.2} />
        </>
      )}
      <Glas />
    </>
  );
}
