'use client';

import React, { Suspense } from 'react';

import Experience from './Experience';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

import { useMobile } from '../../../../../context/MobileContext';

export default function ReactCanvas() {
  const { isMobile, isInitialized } = useMobile();

  // The WebGL context's dpr/gl options are locked in at creation and can't be
  // changed afterwards. MobileContext reports desktop until it has measured the
  // viewport, so we wait for that first measurement before mounting the Canvas.
  // Otherwise a phone would briefly mount the heavy desktop config and the tab
  // would run out of GPU memory (crash -> reload loop) before we could downgrade.
  if (!isInitialized) return null;

  return (
    <Canvas
      // Remount with a fresh context if the device class crosses the breakpoint
      // (e.g. tablet rotation), so the gl options below always match the device.
      key={isMobile ? 'mobile' : 'desktop'}
      // Mobile: render at CSS resolution with no MSAA to keep GPU memory low;
      // desktop caps the retina pixel ratio at 2 for the transmission scene.
      dpr={isMobile ? 1 : [1, 2]}
      gl={{
        antialias: !isMobile,
        powerPreference: isMobile ? 'default' : 'high-performance',
      }}
      camera={{
        position: [0, 0, 0.6],
        fov: 60,
        near: 0.1,
        far: 100,
      }}
    >
      <Suspense fallback={null}>
        {/* The HDR environment map (a pre-filtered radiance map) is the biggest
            GPU-memory cost and the main mobile-Safari tab killer, so it is
            desktop-only. Experience adds cheap lights in its place on mobile. */}
        {!isMobile && <Environment preset="studio" />}
        <Experience isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
