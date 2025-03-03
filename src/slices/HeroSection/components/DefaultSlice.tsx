import React from 'react';

import { HeroSectionProps } from '..';
import SectionContainer from '@/app/components/HomeContent/components/SectionContainer';
import Heading from './Heading';

import styles from './DefaultSlice.module.css';
import { SubHeading } from './SubHeading';

export default function DefaultSlice({ slice }: HeroSectionProps) {
  console.log(slice.primary.uid?.toString());
  return (
    <SectionContainer id={slice.primary.uid?.toString()}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        id={slice.id}
        className={styles.content}
      >
        <div className={styles.horizontal}>
          <Heading slice={slice} index={0} slices={[]} context={undefined} />
          <SubHeading slice={slice} index={0} slices={[]} context={undefined} />
        </div>
      </section>
    </SectionContainer>
  );
}
