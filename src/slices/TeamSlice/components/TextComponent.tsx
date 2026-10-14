import React from 'react';
import { asText, isFilled } from '@prismicio/client';
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
};

export default function TextComponent({ item, isTeam }: Props) {
  // The CV field is styled as a non-interactive label (role/title), so only
  // its text is shown.
  const cvLabel = item?.member_cv?.text?.trim();
  const hasLinkedIn =
    isFilled.link(item?.linkedin_link) && isFilled.image(item?.linkedin_logo);

  return (
    <div className={styles.textContainer}>
      <div className={styles.upperContainer}>
        <PrismicRichText field={item?.member_name} />{' '}
        {isTeam && cvLabel && <span className={styles.label}>{cvLabel}</span>}
      </div>

      <div className={styles.subContainer}>
        {isTeam && hasLinkedIn && (
          <PrismicNextLink
            field={item?.linkedin_link}
            aria-label={`${asText(item?.member_name)} on LinkedIn`}
          >
            {/* ~1.3rem wide; next/image adds the 2x candidate */}
            <PrismicNextImage field={item?.linkedin_logo} alt="" width={24} />
          </PrismicNextLink>
        )}
      </div>
    </div>
  );
}
