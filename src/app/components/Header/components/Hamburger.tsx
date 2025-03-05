import React from 'react';

import styles from './Hamburger.module.css';

type Props = {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
};

export default function Hamburger({ isMenuOpen, setIsMenuOpen }: Props) {
  return (
    <div
      className={styles.hamburger}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
