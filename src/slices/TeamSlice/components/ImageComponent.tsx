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
      <PrismicNextImage field={item?.member_image} />
    </div>
  );
}
