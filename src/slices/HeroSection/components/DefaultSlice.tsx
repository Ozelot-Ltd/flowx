import React from 'react';

import { HeroSectionProps } from '..';
import SectionContainer from '@/app/components/HomeContent/components/SectionContainer';
import Heading from './Heading';

import styles from '../index.module.css';

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
        <Heading slice={slice} index={0} slices={[]} context={undefined} />
        <Heading slice={slice} index={0} slices={[]} context={undefined} />
        <Heading slice={slice} index={0} slices={[]} context={undefined} />
        <Heading slice={slice} index={0} slices={[]} context={undefined} />
      </section>
    </SectionContainer>
  );
}
