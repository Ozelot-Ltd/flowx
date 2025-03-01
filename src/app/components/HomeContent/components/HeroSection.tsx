import React, { useEffect, useState } from 'react';

import styles from './HeroSection.module.css';
import { HomeDocument } from '../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';
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

  const [activeButton, setActiveButton] = useState('');

  const onSeeMoreClick = () => {
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (activeButton === '') {
      setWindowState('front');
    } else {
      setWindowState('front');
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
      document.body.style.overflow = 'auto'; // Reset to default
    };
  }, [isScroll]);

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
                <p>{isScroll ? 'GET INTERACTIVE' : 'GO TO SCROLLMODE'}</p>
              </div>
            </div>
          </div>
        </div>{' '}
        <ButtonBar page={page} setActiveButton={setActiveButton} />
      </div>
    </SectionContainer>
  );
}
