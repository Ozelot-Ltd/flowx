import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import styles from './index.module.css';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import ImageComponent from './components/ImageComponent';
import TextComponent from './components/TextComponent';

/**
 * Props for `TeamSlice`.
 */
export type TeamSliceProps = SliceComponentProps<Content.TeamSliceSlice>;

/**
 * Component for "TeamSlice" Slices.
 */
const TeamSlice: FC<TeamSliceProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.contentContainer}>
        <MainHeadingContainer>
          <PrismicRichText field={slice.primary.team_title} />
        </MainHeadingContainer>

        <div className={styles.groupContainer}>
          {slice.primary.team_member.map((item, index) => (
            <div key={index} className={styles.container}>
              <ImageComponent item={item} />
              <div className={styles.textContainer}>
                <TextComponent item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSlice;
