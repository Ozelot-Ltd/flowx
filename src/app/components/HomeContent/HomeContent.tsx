'use client';

import React from 'react';
import { HomeDocument } from '../../../../prismicio-types';

import styles from './HomeContent.module.css';
import HeroSection from './components/HeroSection';

export default function HomeContent({ page }: { page: HomeDocument }) {
  return (
    <div className={styles.container}>
      <HeroSection page={page} id={'#hero'} />
    </div>
  );
}
