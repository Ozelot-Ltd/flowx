'use client';

import React from 'react';

import ButtonBar from './ButtonBar';
import HeroButton from './HeroButton';

import styles from './ButtonContainer.module.css';
import { HeroSectionSlice } from '../../../../../prismicio-types';

type Props = {
  slice: HeroSectionSlice;
  onSeeMoreClick: () => void;
  setActiveButton: (value: string) => void;
};

export default function ButtonContainer({
  slice,
  onSeeMoreClick,
  setActiveButton,
}: Props) {
  return (
    <div className={styles.buttonsContainer}>
      <HeroButton slice={slice} onSeeMoreClick={onSeeMoreClick} />
      <ButtonBar slice={slice} setActiveButton={setActiveButton} />
    </div>
  );
}
