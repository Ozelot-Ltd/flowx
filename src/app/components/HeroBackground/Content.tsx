'use client';

import { ImageField } from '@prismicio/client';
import React from 'react';

import { PrismicNextImage } from '@prismicio/next';

type Props = {
  background: ImageField<never>;
  styles: { readonly [key: string]: string };
};

export default function Content({ background, styles }: Props) {
  return (
    <div className={styles.backgroundContainer}>
      <PrismicNextImage field={background} />
    </div>
  );
}
