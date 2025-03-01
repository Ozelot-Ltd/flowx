import React from 'react';
import SectionContainer from './SectionContainer';
import { HomeDocument } from '../../../../../prismicio-types';

import styles from './SecondSection.module.css';

export default function SecondSection({
  page,
  id,
}: {
  page: HomeDocument;
  id: string;
}) {
  console.log(page);
  return (
    <SectionContainer id={id}>
      <h1 className={styles.test}>SecondSection</h1>
    </SectionContainer>
  );
}
