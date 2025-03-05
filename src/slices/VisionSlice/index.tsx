import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import { PrismicNextImage } from '@prismicio/next';

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
          </div>
        </div>

        <div className={styles.imageContainer}>
          <PrismicNextImage field={slice.primary.vision_image} />
        </div>
      </section>{' '}
    </SectionContainer>
  );
};

export default VisionSlice;
