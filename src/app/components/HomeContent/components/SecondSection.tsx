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

  return (
    <SectionContainer id={id}>
      <div className={styles.container}></div>
    </SectionContainer>
  );
}
