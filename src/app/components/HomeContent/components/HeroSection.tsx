import React from 'react';

import styles from './HeroSection.module.css';
import { HomeDocument } from '../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';

import Arrow from '../../Icons/Arrow';
import SectionContainer from './SectionContainer';
import ButtonBar from './ButtonBar';

export default function HeroSection({
  page,
  id,
}: {
  page: HomeDocument;
  id: string;
}) {
  const { setWindowState } = useWindowStore();
  const { setIsScroll, isScroll } = useScrollStore();

  const onSeeMoreClick = () => {
    setWindowState('front');
    setIsScroll(false);
  };

  return (
    <SectionContainer id={id}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.contentContainer}>
            <div className={styles.textContainer}>
              <PrismicRichText field={page.data.hero_title} />
              <PrismicRichText field={page.data.hero_description} />
            </div>

            <div className={styles.buttonsContainer}>
              <div
                className={styles.button}
                onClick={() => {
                  onSeeMoreClick();
                }}
              >
                GET INTERACTIVE
              </div>
            </div>
            <div
              className={`${styles.arrowContainer} ${!isScroll ? styles.show : ''}`}
              onClick={() => {
                setIsScroll(true);
                setWindowState('hero');
              }}
            >
              <Arrow height={18} fill={'var(--darkgreen)'} />
            </div>
          </div>
        </div>{' '}
        <ButtonBar page={page} />
      </div>
    </SectionContainer>
  );
}
