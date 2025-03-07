import React from 'react';

import styles from './Hamburger.module.css';

import { useScrollStore } from '../../../../../stores/useWindowStore';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

export default function Hamburger({ isMenuOpen, setIsMenuOpen }: Props) {
  const { isScroll } = useScrollStore();
  return (
    <div
      className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}
      ${!isScroll ? styles.hidden : ''}`}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-expanded={isMenuOpen}
      aria-label="Toggle menu"
    >
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
  );
}
