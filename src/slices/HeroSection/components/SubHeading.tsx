import React from 'react';
import { HeroSectionProps } from '..';
import { PrismicRichText } from '@prismicio/react';

export const SubHeading = ({ slice }: HeroSectionProps) => {
  return (
    <div>
      <PrismicRichText field={slice.primary.hero_subtitle_first} />
      <PrismicRichText field={slice.primary.hero_subtitle_second} />
    </div>
  );
};
