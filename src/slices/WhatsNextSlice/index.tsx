import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';

import styles from './index.module.css';

import TextComponent from './components/TextComponent';
import ImageComponent from '../TeamSlice/components/ImageComponent';

import BackgroundElement from './BackgroundElement';

/**
 * Props for `WhatsNextSlice`.
 */
export type WhatsNextSliceProps =
  SliceComponentProps<Content.WhatsNextSliceSlice>;

/**
 * Component for "WhatsNextSlice" Slices.
 */
const WhatsNextSlice: FC<WhatsNextSliceProps> = ({ slice }) => {
  return (
    <SectionContainer id={'whatsnext'}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.container}
      >
        <div className={styles.contentContainer}>
          <MainHeadingContainer>
            <PrismicRichText field={slice.primary.whats_next_title} />
          </MainHeadingContainer>
          <BackgroundElement item={slice.primary.whats_next_elements[0]}>
            {slice.primary.whats_next_elements.map((item, index) => (
              <div key={index} className={styles.innerContainer}>
                <div className={styles.imageContainer}>
                  <ImageComponent itemNext={item} isTeam={false} />
                </div>
                <div className={styles.textContainer}>
                  <TextComponent itemNext={item} />
                </div>
              </div>
            ))}
          </BackgroundElement>
        </div>
      </section>
    </SectionContainer>
  );
};

export default WhatsNextSlice;
