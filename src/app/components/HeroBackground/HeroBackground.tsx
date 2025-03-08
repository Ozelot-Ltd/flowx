import React from 'react';

import styles from './HeroBackground.module.css';

import Content from './Content';

import { useScrollStore } from '../../../../stores/useWindowStore';

export default function HeroBackground() {
  const { isScroll } = useScrollStore();
  return (
    <div className={`${styles.background} ${!isScroll ? styles.hidden : ''}`}>
      <Content styles={styles} />
    </div>
  );
}
