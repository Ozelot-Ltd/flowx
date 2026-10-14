'use client';

import React, { useState, useEffect, useRef } from 'react';

import { HeroSectionProps } from '..';

import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import useNavigation from '../../../../stores/useNavigation';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../stores/useWindowStore';

import styles from './VerticalSlice.module.css';
import { SubHeading } from './components/SubHeading';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import ButtonContainer from './components/ButtonContainer';
import InformationContainer from './components/InformationContainer';
import HeroBackground from '@/app/components/HeroBackground/HeroBackground';
import Splashscreen from '@/app/components/Splashscreen/Splashscreen';

gsap.registerPlugin(useGSAP);

export default function VerticalSlice({ slice }: HeroSectionProps) {
  const containerRef = useRef(null);

  const [, setActiveButton] = useState('');
  const windowState = useWindowStore((s) => s.windowState);
  const setWindowState = useWindowStore((s) => s.setWindowState);
  const isScroll = useScrollStore((s) => s.isScroll);
  const setIsScroll = useScrollStore((s) => s.setIsScroll);
  const setHeroSectionId = useNavigation((s) => s.setHeroSectionId);

  const heroId = slice.primary.uid?.toString() ?? null;

  // Expose the hero's CMS-driven section id so the Header logo can target it.
  useEffect(() => {
    setHeroSectionId(heroId);
  }, [heroId, setHeroSectionId]);

  const onSeeMoreClick = () => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Read the live values: the Header can change them outside this render.
    const current = useWindowStore.getState().windowState;

    if (current !== 'front' && current !== 'back' && current !== 'between') {
      setWindowState('front');
      setActiveButton('front');
    } else {
      setActiveButton('');
      setWindowState('hero_vertical');
    }

    setIsScroll(!useScrollStore.getState().isScroll);
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
    <SectionContainer id={heroId}>
      <Splashscreen />
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        id={slice.id}
        className={styles.herocontent}
      >
        <div className={styles.verticalLayout} ref={containerRef}>
          <SubHeading slice={slice} index={0} slices={[]} context={undefined} />
          <ButtonContainer
            slice={slice}
            setActiveButton={setActiveButton}
            onSeeMoreClick={onSeeMoreClick}
          />{' '}
          <InformationContainer slice={slice} windowState={windowState} />
        </div>
      </section>
      <HeroBackground />
    </SectionContainer>
  );
}
