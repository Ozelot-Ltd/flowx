'use client';

import React, { useEffect, useRef } from 'react';

import styles from './ContentSpaced.module.css';

import NeumorphContainer from '@/app/components/Containers/NeumorphContainer';
import { PrismicRichText } from '@prismicio/react';
import {
  Simplify,
  SolutionSliceSliceDefaultPrimarySolutionSectionsItem,
} from '../../../../prismicio-types';

import { useWindowStore } from '../../../../stores/useWindowStore';

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
  const { setWindowState, windowState } = useWindowStore();
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setWindowState('spaced'),
      onEnterBack: () => setWindowState('spaced'),
      markers: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    console.log(windowState);
  }, [windowState]);

  return (
    <div
      className={styles.contentSpaced}
      key={index}
      data-slice-side="spaced"
      ref={sectionRef}
    >
      <NeumorphContainer>
        <div className={styles.textContainer}>
          <PrismicRichText field={item.solution_subtitle_first} />
          <PrismicRichText field={item.solution_text_first} />
        </div>
      </NeumorphContainer>
      <NeumorphContainer>
        <div className={styles.textContainer}>
          <PrismicRichText field={item.solution_subtitle_second} />
          <PrismicRichText field={item.solution_text_second} />
        </div>
      </NeumorphContainer>
    </div>
  );
}
