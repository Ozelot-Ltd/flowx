import React from 'react';
import {
  Simplify,
  TeamSliceSliceDefaultPrimaryTeamMemberItem,
} from '../../../../prismicio-types';

import styles from './TextComponent.module.css';

import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

type Props = {
  item?: Simplify<TeamSliceSliceDefaultPrimaryTeamMemberItem>;
  isTeam?: boolean;
  isHovered?: boolean;
  index?: number;
};

export default function TextComponent({
  item,

  isTeam,
  isHovered,
}: Props) {
  return (
    <div
      className={`${styles.textContainer} ${isHovered ? styles.hovered : ''}`}
    >
      <div className={styles.upperContainer}>
        <PrismicRichText field={item?.member_name} />{' '}
        {isTeam && item?.member_cv?.text !== '' && (
          <PrismicNextLink field={item?.member_cv} />
        )}
      </div>

      <div className={styles.subContainer}>
        {isTeam && item?.linkedin_logo && (
          <PrismicNextLink field={item?.linkedin_link}>
            <PrismicNextImage field={item?.linkedin_logo} />
          </PrismicNextLink>
        )}
        {/* {isTeam && (
          <div className={styles.emailContainer}>
            <PrismicNextLink field={item?.member_email} />
          </div>
        )} */}
      </div>
    </div>
  );
}
