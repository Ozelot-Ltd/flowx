import React from 'react';

import styles from './ImageComponent.module.css';
import { PrismicNextImage } from '@prismicio/next';
import {
  Simplify,
  TeamSliceSliceDefaultPrimaryTeamMemberItem,
} from '../../../../prismicio-types';
import NeumorphContainer from '@/app/components/Containers/NeumorphContainer';

type Props = {
  item: Simplify<TeamSliceSliceDefaultPrimaryTeamMemberItem>;
};

export default function ImageComponent({ item }: Props) {
  return (
    <NeumorphContainer>
      <div className={styles.imageContainer}>
        <PrismicNextImage field={item.member_image} />
      </div>
    </NeumorphContainer>
  );
}
