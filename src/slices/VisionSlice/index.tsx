'use client';

import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import styles from './index.module.css';

import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import VisionVideo from './VisionVideo';

export type VisionSliceProps = SliceComponentProps<Content.VisionSliceSlice>;

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
            <VisionVideo className={styles.videoPlayerContainer} />
          </div>
        </div>
      </section>{' '}
    </SectionContainer>
  );
};

export default VisionSlice;
