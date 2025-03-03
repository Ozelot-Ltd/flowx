import React, { useEffect, useState } from 'react';

import styles from './HeroSection.module.css';
import { HomeDocument } from '../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';
import SectionContainer from './SectionContainer';
import ButtonBar from '../../../../slices/HeroSection/components/ButtonBar';

export default function HeroSection({
  page,
  id,
}: {
  page: HomeDocument;
  id: string;
}) {
  return (
    <SectionContainer id={id}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.contentContainer}>
            <div className={styles.textContainer}>
              <PrismicRichText field={page.data.hero_title} />
              <PrismicRichText field={page.data.hero_description} />
            </div>
          </div>
        </div>{' '}
      </div>
    </SectionContainer>
  );
}
