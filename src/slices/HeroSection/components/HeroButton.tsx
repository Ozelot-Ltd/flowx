import React from 'react';

import styles from './HeroButton.module.css';

import { useScrollStore } from '../../../../stores/useWindowStore';

export default function HeroButton({
  onSeeMoreClick,
}: {
  onSeeMoreClick: () => void;
}) {
  const { isScroll } = useScrollStore();

  return (
    <div className={styles.buttonsContainer}>
      <div
        className={styles.button}
        onClick={() => {
          onSeeMoreClick();
        }}
      >
        <p>{isScroll ? 'GET INTERACTIVE' : 'GO TO SCROLLMODE'}</p>
      </div>
    </div>
  );
}
