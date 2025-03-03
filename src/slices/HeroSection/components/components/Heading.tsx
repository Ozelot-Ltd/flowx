'use client';

import React, { useRef } from 'react';
import { HeroSectionProps } from '../..';
import styles from './Heading.module.css';

import { asText } from '@prismicio/client';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText);

export default function Heading({ slice }: HeroSectionProps) {
  const text = asText(slice.primary.hero_title);
  const textRef = useRef(null);

  useGSAP(() => {
    if (textRef.current) {
      const split = new SplitText(textRef.current, { type: 'chars' });
      const chars = split.chars;

      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });

      gsap.set(chars, {
        fontVariationSettings: "'wght' 300",
      });

      tl.to(chars, {
        fontVariationSettings: "'wght' 700",
        duration: 4,
        stagger: {
          each: 0.2,
          from: 'start',
          repeat: 1,
          yoyo: true,
        },
        ease: 'sine.inOut',
      });
    }
  }, [textRef, text]);

  return (
    <div className={styles.heading}>
      <h2 ref={textRef}>{text}</h2>
    </div>
  );
}
