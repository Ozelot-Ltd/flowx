'use client';

import React from 'react';
import { HomeDocument } from '../../../../prismicio-types';

import styles from './HomeContent.module.css';
import HeroSection from './components/HeroSection';
import FirstSection from './components/FirstSection';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollSmoother from 'gsap/ScrollSmoother';
import SecondSection from './components/SecondSection';
gsap.registerPlugin(ScrollSmoother);

export default function HomeContent({ page }: { page: HomeDocument }) {
  console.log(ScrollSmoother);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
    });
  });

  return (
    <div className={styles.container} id="smooth-wrapper">
      <div id="smooth-content">
        <HeroSection page={page} id={'hero'} />
        <FirstSection page={page} id={'vision'} />
        <SecondSection page={page} id={'mission'} />
        <FirstSection page={page} id={'product'} />
        <FirstSection page={page} id={'next'} />
      </div>
    </div>
  );
}
