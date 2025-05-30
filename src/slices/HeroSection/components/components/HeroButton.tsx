import React, { useRef } from 'react';
import styles from './HeroButton.module.css';
import { useScrollStore } from '../../../../../stores/useWindowStore';
import { HeroSectionSlice } from '../../../../../prismicio-types'; // Make sure path is correct

import Arrow from '@/app/components/Icons/Arrow';

export default function HeroButton({
  slice,
  onSeeMoreClick,
}: {
  slice: HeroSectionSlice;
  onSeeMoreClick: () => void;
}) {
  const { isScroll } = useScrollStore();
  const containerRef = useRef(null);

  return (
    <div className={styles.buttonsContainer} ref={containerRef}>
      <div
        className={`${styles.button} ${!isScroll ? styles.scrollDisabled : ''}`}
        onClick={() => {
          onSeeMoreClick();
        }}
      >
        <div className={styles.leftArrow}>
          <Arrow />
        </div>
        <p>
          {isScroll
            ? slice.primary.toggle_button_text
            : slice.primary.toggle_button_text_active}
        </p>
        <div className={styles.rightArrow}>
          <Arrow />
        </div>
      </div>
    </div>
  );
}
