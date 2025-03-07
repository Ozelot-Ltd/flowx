'use client';

import React, { useRef, useState } from 'react';

import styles from './ContentLeft.module.css';

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
import { PrismicNextImage } from '@prismicio/next';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContentLeft({
  item,
  index,
}: {
  item: Simplify<SolutionSliceSliceDefaultPrimarySolutionSectionsItem>;
  index: number;
}) {
  const { setWindowState } = useWindowStore();
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  const setSomeStuff = () => {
    setWindowState('left');
    setSectionVisible(true);
  };

  const setSomeOtherStuff = () => {
    setSectionVisible(false);
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setSomeStuff(),
      onLeave: () => setSomeOtherStuff(),
      onEnterBack: () => setSomeStuff(),
      markers: false,
    });

    const showTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setSectionVisible(true);
      },
      markers: true,
    });

    return () => {
      trigger.kill();
      showTrigger.kill();
    };
  }, []);

  return (
    <div
      className={styles.contentLeft}
      key={index}
      data-slice-side="left"
      ref={sectionRef}
    >
      <div
        className={`${styles.triggerContainer} ${sectionVisible && styles.visible} `}
      >
        <NeumorphContainer>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <PrismicRichText field={item.solution_subtitle_first} />
              <PrismicRichText field={item.solution_text_first} />
            </div>

            <div className={styles.iconContainer}>
              <PrismicNextImage field={item.solution_icon} />
            </div>
          </div>
        </NeumorphContainer>
      </div>
    </div>
  );
}
