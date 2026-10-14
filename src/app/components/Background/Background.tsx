'use client';

import React from 'react';

import styles from './Background.module.css';
import ReactCanvas from './components/ReactCanvas';
import { useSplashStore } from '../../../../stores/useSplashStore';

export default function Background() {
  // Mount the canvas only after the intro: WebGL context creation, the env map
  // PMREM pass and shader compiles otherwise block the main thread mid-intro.
  // The model + HDR are still fetched during the splash (module-level preloads).
  const isSplashDone = useSplashStore((s) => s.isSplashDone);

  return (
    <div className={styles.container}>
      {isSplashDone && <ReactCanvas />}
    </div>
  );
}
