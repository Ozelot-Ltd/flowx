import React, { useRef } from 'react';
import styles from './HeroButton.module.css';
import {
  useScrollStore,
  useWindowStore,
} from '../../../../../stores/useWindowStore';
import { HeroSectionSlice } from '../../../../../prismicio-types'; // Make sure path is correct
import { useGSAP } from '@gsap/react';
import { useMobile } from '../../../../../context/MobileContext';

import gsap from 'gsap';
gsap.registerPlugin(useGSAP);

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
  const { windowState } = useWindowStore();

  console.log('asdfasdf', isMobile);

  useGSAP(() => {
    if (!containerRef.current) return;

    if (
      windowState === 'front' ||
      windowState === 'back' ||
      windowState === 'between'
    ) {
      gsap.to(containerRef.current, {
        left: isMobile ? '2rem' : '4rem',
        ease: 'power2.out',
        duration: 0.5,
      });
    } else {
      gsap.to(containerRef.current, {
        left: 'calc(50% - 4rem)',
        ease: 'power2.out',
        duration: 0.5,
      });
    }

    return () => {
      gsap.killTweensOf(containerRef.current);
    };
  }, [windowState, isMobile]);

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
      </div>
    </div>
  );
}
