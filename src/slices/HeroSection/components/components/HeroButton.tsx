import React, { useRef } from 'react';
import styles from './HeroButton.module.css';
import { useScrollStore } from '../../../../../stores/useWindowStore';
import { HeroSectionSlice } from '../../../../../prismicio-types'; // Make sure path is correct
import { useGSAP } from '@gsap/react';

import gsap from 'gsap';
import Arrow from '@/app/components/Icons/Arrow';
gsap.registerPlugin(useGSAP);

import { useMobile } from '../../../../../context/MobileContext';

export default function HeroButton({
  slice,
  onSeeMoreClick,
}: {
  slice: HeroSectionSlice;
  onSeeMoreClick: () => void;
}) {
  const { isScroll } = useScrollStore();
  const containerRef = useRef(null);

  const { isMobile } = useMobile();

  return (
    <div className={styles.buttonsContainer} ref={containerRef}>
      <div
        className={styles.button}
        onClick={() => {
          onSeeMoreClick();
        }}
      >
        <p>
          {isScroll
            ? slice.primary.toggle_button_text
            : slice.primary.toggle_button_text_active}
        </p>
        <div>
          <Arrow height={isMobile ? 16 : 22} />
        </div>
      </div>
    </div>
  );
}
