'use client';

import { FC, useState } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import styles from './index.module.css';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import ImageComponent from './components/ImageComponent';
import TextComponent from './components/TextComponent';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';

/**
 * Props for `TeamSlice`.
 */
export type TeamSliceProps = SliceComponentProps<Content.TeamSliceSlice>;

/**
 * Component for "TeamSlice" Slices.
 */
const TeamSlice: FC<TeamSliceProps> = ({ slice }) => {
  // Track hoveredIndex instead of a generic isHovered boolean
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <SectionContainer id={'team'}>
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
              <div
                key={index}
                className={styles.container}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <ImageComponent item={item} isTeam={true} />

                <TextComponent
                  item={item}
                  isTeam={true}
                  isHovered={hoveredIndex === index}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default TeamSlice;
