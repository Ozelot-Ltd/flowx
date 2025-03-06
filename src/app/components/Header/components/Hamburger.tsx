import React from 'react';

import styles from './Hamburger.module.css';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

export default function Hamburger({ isMenuOpen, setIsMenuOpen }: Props) {
  return (
    <div
      className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
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
