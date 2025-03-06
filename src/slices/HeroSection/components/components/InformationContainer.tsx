import React from 'react';

import styles from './InformationContainer.module.css';
import { PrismicRichText } from '@prismicio/react';
import { HeroSectionProps } from '../..';

type Props = {
  windowState: string;
  slice: HeroSectionProps['slice'];
};

export default function InformationContainer({ windowState, slice }: Props) {
  return (
    <div className={styles.informationContainer}>
      {windowState === 'front' && slice.variation === 'heroVertical' && (
        <div className={styles.content}>
          <PrismicRichText field={slice.primary.front_title} />
          <PrismicRichText field={slice.primary.front_text} />
        </div>
      )}
      {windowState === 'back' && slice.variation === 'heroVertical' && (
        <div className={styles.content}>
          <PrismicRichText field={slice.primary.back_title} />
          <PrismicRichText field={slice.primary.back_text} />
        </div>
      )}
      {windowState === 'between' && slice.variation === 'heroVertical' && (
        <div className={styles.content}>
          <PrismicRichText field={slice.primary.between_title} />
          <PrismicRichText field={slice.primary.between_text} />
        </div>
      )}
    </div>
  );
}
