import React from 'react';

import { HeroSectionProps } from '..';
import { PrismicRichText } from '@prismicio/react';

export default function Heading({ slice }: HeroSectionProps) {
  return (
    <div>
      <PrismicRichText field={slice.primary.hero_title} />
    </div>
  );
}
