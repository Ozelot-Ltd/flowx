'use client';

import React, { useRef, useState } from 'react';

import styles from './ContentSpaced.module.css';

import { PrismicRichText } from '@prismicio/react';
import {
  Simplify,
  SolutionSliceSliceDefaultPrimarySolutionSectionsItem,
} from '../../../../prismicio-types';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../stores/useWindowStore';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContentLeft({
  item,
  index,
}: {
  item: Simplify<SolutionSliceSliceDefaultPrimarySolutionSectionsItem>;
  index: number;
}) {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Called from ScrollTrigger callbacks created once on mount, so read the
  // store live instead of from the first render.
  const setSomeStuff = () => {
    // While the hero is in interactive (button-driven) mode the hero buttons
    // own windowState — scroll-driven sections must not touch it.
    if (useScrollStore.getState().isScroll) {
      useWindowStore.getState().setWindowState('spaced');
    }

    setSectionVisible(true);
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setSomeStuff(),
      onEnterBack: () => setSomeStuff(),
      markers: false,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      className={styles.contentSpaced}
      key={index}
      data-slice-side="spaced"
      ref={sectionRef}
    >
      {' '}
      <div
        className={`${styles.triggerContainer} ${sectionVisible ? styles.visible : ''}`}
      >
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={item.solution_subtitle_first} />
            <PrismicRichText field={item.solution_text_first} />
          </div>
        </div>
      </div>{' '}
      <div
        className={`${styles.triggerContainer} ${sectionVisible ? styles.visible : ''}`}
      >
        <div className={styles.textContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={item.solution_subtitle_second} />
            <PrismicRichText field={item.solution_text_second} />
          </div>
        </div>
      </div>
    </div>
  );
}
