'use client';

import React from 'react';
import { HomeDocument } from '../../../../prismicio-types';

import styles from './HomeContent.module.css';
import HeroSection from './components/HeroSection';
import FirstSection from './components/FirstSection';

export default function HomeContent({ page }: { page: HomeDocument }) {
  return (
    <div className={styles.container}>
      <HeroSection page={page} id={'hero'} />
      <FirstSection page={page} id={'vision'} />
    </div>
  );
}
