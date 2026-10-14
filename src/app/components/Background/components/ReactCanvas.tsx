'use client';

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import Experience from './Experience';
import { useMobile } from '../../../../../context/MobileContext';

import { Canvas, type RootState } from '@react-three/fiber';
import { Environment, useEnvironment } from '@react-three/drei';

// Self-hosted copy of drei's 'studio' preset (studio_small_03_1k.hdr). The
// preset fetches from raw.githack.com, a third-party CDN we don't control.
const HDR_PATH = '/hdr/studio_small_03_1k.hdr';

// Fetch + decode the HDR during the splash so it's ready when the canvas mounts.
// Browser only: on the server three's FileLoader really fetches the file and
// then throws on the browser-only ProgressEvent global.
if (typeof window !== 'undefined') {
  useEnvironment.preload({ files: HDR_PATH });
}

export default function ReactCanvas() {
  // The canvas mounts after the splash, so the device context is initialized.
  // gl props are only read at creation — fine, a resize across the breakpoint
  // just keeps the original setting.
  const { isMobile } = useMobile();

  // Bumped when a lost WebGL context comes back: remounting the Canvas
  // rebuilds the renderer and re-uploads everything (cached GLB/HDR included).
  const [canvasKey, setCanvasKey] = useState(0);
  const removeContextListeners = useRef<(() => void) | null>(null);

  const onCreated = useCallback(({ gl }: RootState) => {
    removeContextListeners.current?.();
    const canvas = gl.domElement;

    // preventDefault signals we want the context restored (mobile Safari
    // drops it under memory pressure / when backgrounded).
    const onLost = (e: Event) => e.preventDefault();
    const onRestored = () => setCanvasKey((k) => k + 1);

    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    removeContextListeners.current = () => {
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
    };
  }, []);

  useEffect(() => {
    return () => {
      removeContextListeners.current?.();
      removeContextListeners.current = null;
    };
  }, []);

  return (
    <Canvas
      key={canvasKey}
      onCreated={onCreated}
      // Cap the pixel ratio: retina screens otherwise render this
      // transmission-heavy scene at 2-3x, which is the main frame-rate cost.
      // Lower on phones, where GPU memory is the tight constraint.
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      // MSAA buffers cost memory; at phone DPRs the edges barely benefit.
      gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
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
        <Environment files={HDR_PATH} />
        <Experience />
      </Suspense>
    </Canvas>
  );
}
