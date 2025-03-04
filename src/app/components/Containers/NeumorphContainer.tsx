'use client';

import React from 'react';

import styles from './NeumorphContainer.module.css';

export default function NeumorphContainer({
  children,
  key,
}: {
  children: React.ReactNode;
  key?: number;
}) {
  return (
    <div className={styles.container} key={key}>
      {children}
    </div>
  );
}
