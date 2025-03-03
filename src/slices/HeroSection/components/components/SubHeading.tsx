import React from 'react';
import { HeroSectionProps } from '../..';
import { PrismicRichText } from '@prismicio/react';
import styles from './SubHeading.module.css';

export const SubHeading = ({ slice }: HeroSectionProps) => {
  return (
    <div className={styles.subHeading}>
      <PrismicRichText field={slice.primary.hero_subtitle_first} />
      <PrismicRichText field={slice.primary.hero_subtitle_second} />
    </div>
  );
};
