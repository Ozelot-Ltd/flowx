import React from 'react';

import styles from './HeroBackground.module.css';

import Content from './Content';

export default function HeroBackground() {
  return (
    <div className={styles.background}>
      <Content styles={styles} />
    </div>
  );
}
