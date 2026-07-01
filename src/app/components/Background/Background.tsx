'use client';

import React from 'react';

import styles from './Background.module.css';
import ReactCanvas from './components/ReactCanvas';

export default function Background() {
  return (
    <div className={styles.container}>
      <ReactCanvas />
    </div>
  );
}
