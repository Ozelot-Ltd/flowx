'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import styles from './Background.module.css';
import CanvasErrorBoundary from './components/CanvasErrorBoundary';
import { useSplashStore } from '../../../../stores/useSplashStore';

// three / R3F / drei live in their own chunk so they stay out of the page's
// first-load JS. Browser only: there's nothing to render on the server.
// (Inline import so Next's dynamic transform sees it.)
const ReactCanvas = dynamic(() => import('./components/ReactCanvas'), {
  ssr: false,
});

export default function Background() {
  // Mount the canvas only after the intro: WebGL context creation, the env map
  // PMREM pass and shader compiles otherwise block the main thread mid-intro.
  const isSplashDone = useSplashStore((s) => s.isSplashDone);

  // Start downloading the 3D chunk right away so it arrives during the splash.
  // Evaluating it also runs the module-level GLB + HDR preloads, so the model
  // and env map are fetched in the background too. Load failures surface (and
  // are contained) when the canvas actually mounts. Same specifier as above,
  // so webpack resolves both to the one chunk.
  useEffect(() => {
    import('./components/ReactCanvas').catch(() => {});
  }, []);

  return (
    <div className={styles.container}>
      {isSplashDone && (
        <CanvasErrorBoundary>
          <ReactCanvas />
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
