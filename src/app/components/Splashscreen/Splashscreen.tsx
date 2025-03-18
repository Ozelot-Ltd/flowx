'use client';

import React from 'react';
import styles from './Splashscreen.module.css';

export default function Splashscreen() {
  return (
    <div className={styles.container}>
      <div className={styles.drops}>
        <div className={styles.drop}></div>
        <div className={styles.drop}></div>
        <div className={styles.drop}></div>
        <div className={styles.drop}></div>
      </div>
    </div>
  );
}
