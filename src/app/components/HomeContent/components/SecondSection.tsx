import React from 'react';
import SectionContainer from './SectionContainer';
import { HomeDocument } from '../../../../../prismicio-types';
import useNavigation from '../../../../../stores/useNavigation';

import styles from './SecondSection.module.css';

export default function SecondSection({
  page,
  id,
}: {
  page: HomeDocument;
  id: string;
}) {
  const { activeSection } = useNavigation();
  console.log(page);
  return (
    <SectionContainer id={id}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.bg}></div>
              <div className={styles.blob}></div>
            </div>
            <div className={styles.card}>
              <div className={styles.bg}></div>
              <div className={styles.blob}></div>
            </div>
            <div className={styles.card}>
              <div className={styles.bg}></div>
              <div className={styles.blob}></div>
            </div>
            <div className={styles.card}>
              <div className={styles.bg}></div>
              <div className={styles.blob}></div>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}></div>
      </div>
    </SectionContainer>
  );
}
