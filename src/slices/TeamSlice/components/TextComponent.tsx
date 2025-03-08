import React from 'react';
import {
  Simplify,
  TeamSliceSliceDefaultPrimaryTeamMemberItem,
  WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem,
} from '../../../../prismicio-types';

import styles from './TextComponent.module.css';

import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';

type Props = {
  itemNext?: Simplify<WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem>;
  item?: Simplify<TeamSliceSliceDefaultPrimaryTeamMemberItem>;
  isTeam?: boolean;
};

export default function TextComponent({ item, itemNext, isTeam }: Props) {
  return (
    <div className={styles.textContainer}>
      <div className={styles.upperContainer}>
        <PrismicRichText
          field={isTeam ? item?.member_name : itemNext?.whats_next_title}
        />
      </div>

      <div className={styles.subContainer}>
        <PrismicRichText field={itemNext?.whats_next_description} />
        {isTeam && <PrismicNextLink field={item?.member_email} />}
        {isTeam && item?.member_cv?.text !== '' && (
          <PrismicNextLink field={item?.member_cv} />
        )}
      </div>
    </div>
  );
}
