import React, { useRef } from 'react';
import { HeroSectionProps } from '../..';
import { PrismicRichText } from '@prismicio/react';
import styles from './SubHeading.module.css';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useWindowStore } from '../../../../../stores/useWindowStore';

export const SubHeading = ({ slice }: HeroSectionProps) => {
  const windowState = useWindowStore((s) => s.windowState);
  const subHeadingRef = useRef(null);
  // Slide the subheading out for the info states and back in otherwise.
  // overwrite: 'auto' kills the previous tween's y when the state flips
  // mid-animation; useGSAP reverts the tweens on unmount.
  useGSAP(() => {
    if (
      windowState === 'front' ||
      windowState === 'back' ||
      windowState === 'between'
    ) {
      gsap.to(subHeadingRef.current, {
        y: '-100%',
        stagger: 0.5,
        ease: 'power2.out',
        duration: 0.8,
        overwrite: 'auto',
      });
    } else if (
      windowState !== 'front' &&
      windowState !== 'back' &&
      windowState !== 'between'
    ) {
      gsap.to(subHeadingRef.current, {
        y: '0%',
        stagger: 0.5,
        ease: 'power2.out',
        duration: 0.8,
        overwrite: 'auto',
      });
    }
  }, [windowState]);

  return (
    <div className={styles.subHeading}>
      <div className={styles.overflowContainer} ref={subHeadingRef}>
        <PrismicRichText field={slice.primary.hero_subtitle_first} />
        <PrismicRichText field={slice.primary.hero_subtitle_second} />
      </div>
    </div>
  );
};
