import React from 'react';

import styles from './TextComponent.module.css';
import {
  Simplify,
  WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem,
} from '../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

interface Props {
  itemNext: Simplify<WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem>;
}

export default function TextComponent({ itemNext }: Props) {
  return (
    <div className={styles.text}>
      <PrismicRichText field={itemNext.whats_next_title} />
      <PrismicRichText field={itemNext.whats_next_description} />
    </div>
  );
}
