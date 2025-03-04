'use client';

import React, { useState, useEffect, useRef } from 'react';

import { HeroSectionProps } from '..';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';

import Heading from './components/Heading';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../stores/useWindowStore';

import styles from './VerticalSlice.module.css';
import { SubHeading } from './components/SubHeading';
import ButtonBar from '@/slices/HeroSection/components/components/ButtonBar';
import HeroButton from './components/HeroButton';

export default function VerticalSlice({ slice }: HeroSectionProps) {
  const containerRef = useRef(null);

  const buttonRef = useRef(null);

  const [activeButton, setActiveButton] = useState('');
  const { setWindowState, windowState } = useWindowStore();
  const { setIsScroll, isScroll } = useScrollStore();

  console.log(activeButton);

  const onSeeMoreClick = () => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (
      windowState !== 'front' &&
      windowState !== 'back' &&
      windowState !== 'between'
    ) {
      setWindowState('front');
      setActiveButton('front');
    } else if (
      windowState === 'front' ||
      windowState === 'back' ||
      windowState === 'between'
    ) {
      setActiveButton('');
      setWindowState('hero_vertical');
    }

    if (window.scrollY > 0 && isScroll) {
      setIsScroll(!isScroll);
    } else {
      setIsScroll(!isScroll);
    }
  };

  useEffect(() => {
    if (!isScroll) {
      document.body.style.overflow = 'hidden';
    } else if (isScroll) {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isScroll]);

  return (
    <SectionContainer id={slice.primary.uid?.toString()}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        id={slice.id}
        className={styles.herocontent}
      >
        <div className={styles.verticalLayout} ref={containerRef}>
          <Heading slice={slice} index={0} slices={[]} context={undefined} />
          <SubHeading slice={slice} index={0} slices={[]} context={undefined} />
          <div className={styles.buttonsContainer}>
            <div ref={buttonRef}>
              <HeroButton slice={slice} onSeeMoreClick={onSeeMoreClick} />
              <ButtonBar slice={slice} setActiveButton={setActiveButton} />
            </div>
          </div>
        </div>
      </section>
    </SectionContainer>
  );
}
