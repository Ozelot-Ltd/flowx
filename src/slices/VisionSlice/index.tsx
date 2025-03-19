'use client';

import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import styles from './index.module.css';

import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';

/**
 * Props for `VisionSlice`.
 */
export type VisionSliceProps = SliceComponentProps<Content.VisionSliceSlice>;

/**
 * Component for "VisionSlice" Slices.
 */
const VisionSlice: FC<VisionSliceProps> = ({ slice }) => {
  return (
    <SectionContainer id={'vision'}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.container}
      >
        <div className={styles.contentContainer}>
          <MainHeadingContainer>
            <div className={styles.titleContainer}>
              <PrismicRichText field={slice.primary.vision_title} />
            </div>
          </MainHeadingContainer>
          <div className={styles.textContainer}>
            <PrismicRichText field={slice.primary.vision_text} />
            <PrismicRichText field={slice.primary.vision_text_second} />
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.videoBackground}>
              <div className={styles.videoOverlay}></div>
            </div>
            <div className={styles.videoPlayerContainer}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/uSQra_r0RqA?si=GJmwzAMa2f2hrEJ4&autoplay=1&mute=1&modestbranding=1&color=white&loop=1&playlist=uSQra_r0RqA"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>{' '}
    </SectionContainer>
  );
};

export default VisionSlice;
