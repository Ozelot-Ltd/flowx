'use client';

import React from 'react';
import { HomeDocument } from '../../../../prismicio-types';

import styles from './HomeContent.module.css';
import HeroSection from './components/HeroSection';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollSmoother from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollSmoother);

export default function HomeContent({ page }: { page: HomeDocument }) {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
    });
  });

  return (
    <div className={styles.container} id="smooth-wrapper">
      <div id="smooth-content">
        <HeroSection page={page} id={'hero'} />
      </div>
    </div>
  );
}
