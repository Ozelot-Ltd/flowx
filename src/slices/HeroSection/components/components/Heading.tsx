'use client';

import React, { useRef } from 'react';
import { HeroSectionProps } from '../..';
import styles from './Heading.module.css';

import { asText } from '@prismicio/client';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import { useWindowStore } from '../../../../../stores/useWindowStore';

gsap.registerPlugin(SplitText);

export default function Heading({ slice }: HeroSectionProps) {
  const text = asText(slice.primary.hero_title);
  const textRef = useRef(null);
  const splitRef = useRef<SplitText | null>(null);

  const { windowState } = useWindowStore();

  useGSAP(() => {
    if (textRef.current && !splitRef.current) {
      splitRef.current = new SplitText(textRef.current, { type: 'chars' });
    }

    if (!splitRef.current) return;

    const chars = splitRef.current.chars;

    if (
      windowState === 'front' ||
      windowState === 'back' ||
      windowState === 'between'
    ) {
      gsap.to(chars, {
        y: '-100%',
        stagger: 0.05,
        ease: 'power2.out',
        duration: 0.25,
      });
    } else {
      gsap.to(chars, {
        y: '0%',
        stagger: 0.05,
        ease: 'power2.out',
        duration: 0.25,
      });
    }

    return () => {
      gsap.killTweensOf(chars);
    };
  }, [textRef, text, windowState]);

  return (
    <div className={styles.heading}>
      <h2 ref={textRef}>{text}</h2>
    </div>
  );
}
