import React from 'react';

import styles from './ImageComponent.module.css';
import { PrismicNextImage } from '@prismicio/next';
import {
  Simplify,
  TeamSliceSliceDefaultPrimaryTeamMemberItem,
  WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem,
} from '../../../../prismicio-types';
import NeumorphContainer from '@/app/components/Containers/NeumorphContainer';

type Props = {
  itemNext?: Simplify<WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem>;
  item?: Simplify<TeamSliceSliceDefaultPrimaryTeamMemberItem>;
  isTeam?: boolean;
};

export default function ImageComponent({ item, itemNext, isTeam }: Props) {
  return (
    <NeumorphContainer>
      <div className={styles.imageContainer}>
        <PrismicNextImage
          field={isTeam ? item?.member_image : itemNext?.whats_next_image}
        />
      </div>
    </NeumorphContainer>
  );
}
