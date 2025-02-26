'use client';

import React from 'react';

import { useMobile } from '../../../../context/MobileContext';

import styles from './Background.module.css';
import ReactCanvas from './components/ReactCanvas';

export default function Background() {
  const { isMobile } = useMobile();
  console.log(isMobile);

  return (
    <div className={styles.container}>
      <ReactCanvas />
    </div>
  );
}
