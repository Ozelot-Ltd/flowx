import React from 'react';
import {
  Simplify,
  TeamSliceSliceDefaultPrimaryTeamMemberItem,
} from '../../../../prismicio-types';

import styles from './TextComponent.module.css';

import NeumorphContainer from '@/app/components/Containers/NeumorphContainer';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';

type Props = { item: Simplify<TeamSliceSliceDefaultPrimaryTeamMemberItem> };

export default function TextComponent({ item }: Props) {
  return (
    <NeumorphContainer>
      <div className={styles.textContainer}>
        <div className={styles.upperContainer}>
          <PrismicRichText field={item.member_name} />
          <PrismicRichText field={item.member_role} />
        </div>

        <div className={styles.subContainer}>
          <PrismicRichText field={item.member_text} />
          <PrismicNextLink field={item.member_email} />
        </div>
      </div>
    </NeumorphContainer>
  );
}
