'use client';

import { FC } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import VerticalSlice from './components/VerticalSlice';

/**
 * Props for `HeroSection`.
 */
export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

/**
 * Component for "HeroSection" Slices.
 */
const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  return (
    <>
      {slice.variation === 'heroVertical' && (
        <VerticalSlice
          slice={slice}
          index={0}
          slices={[]}
          context={undefined}
        />
      )}
    </>
  );
};

export default HeroSection;
