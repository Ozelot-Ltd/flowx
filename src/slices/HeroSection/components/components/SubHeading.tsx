import React, { useRef } from 'react';
import { HeroSectionProps } from '../..';
import { PrismicRichText } from '@prismicio/react';
import styles from './SubHeading.module.css';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { useWindowStore } from '../../../../../stores/useWindowStore';

export const SubHeading = ({ slice }: HeroSectionProps) => {
  const { windowState } = useWindowStore();
  const subHeadingRef = useRef(null);
  // GSAP animation setup
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    // Set up animation to play when windowState changes to 'front'
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
      });
    }

    return () => {
      tl.kill(); // Clean up
    };
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
