'use client';

import { FC, useRef } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import styles from './index.module.css';
import ContentLeft from './components/ContentLeft';
import ContentRight from './components/ContentRight';
import ContentSpaced from './components/ContentSpaced';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `SolutionSlice`.
 */
export type SolutionSliceProps =
  SliceComponentProps<Content.SolutionSliceSlice>;

/**
 * Component for "SolutionSlice" Slices.
 */
const SolutionSlice: FC<SolutionSliceProps> = ({ slice }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <SectionContainer id={'solution'}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        <div className={styles.contentContainer}>
          <MainHeadingContainer>
            <PrismicRichText field={slice.primary.solution_title} />
          </MainHeadingContainer>

          <div ref={contentRef} className={styles.groupContainer}>
            {slice.primary.solution_sections.map((item, index) =>
              item.solution_side === 'left' ? (
                <ContentLeft item={item} index={index} key={index} />
              ) : item.solution_side === 'right' ? (
                <ContentRight item={item} index={index} key={index} />
              ) : item.solution_side === 'spaced' ? (
                <ContentSpaced item={item} index={index} key={index} />
              ) : null
            )}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default SolutionSlice;
