'use client';

import React from 'react';

type Props = {
  styles: { readonly [key: string]: string };
};

export default function Content({ styles }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.bg}></div>
      <div className={styles.blob}></div>
    </div>
  );
}
