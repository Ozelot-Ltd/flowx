import React from 'react';

import styles from './ImageComponent.module.css';
import { PrismicNextImage } from '@prismicio/next';
import {
  Simplify,
  TeamSliceSliceDefaultPrimaryTeamMemberItem,
} from '../../../../prismicio-types';

type Props = {
  item?: Simplify<TeamSliceSliceDefaultPrimaryTeamMemberItem>;
  isTeam?: boolean;
};

export default function ImageComponent({ item }: Props) {
  return (
    <div className={styles.imageContainer}>
      {/* Height-bound: up to ~12rem (≈208px on phones); next/image adds 2x */}
      <PrismicNextImage field={item?.member_image} height={208} />
    </div>
  );
}
