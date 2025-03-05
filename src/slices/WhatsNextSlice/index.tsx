import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';

import styles from './index.module.css';

import TextComponent from '../TeamSlice/components/TextComponent';
import ImageComponent from '../TeamSlice/components/ImageComponent';

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
      >
        <div className={styles.contentContainer}>
          <MainHeadingContainer>
            <PrismicRichText field={slice.primary.whats_next_title} />
          </MainHeadingContainer>

          <div className={styles.groupContainer}>
            {slice.primary.whats_next_elements.map((item, index) => (
              <div key={index} className={styles.container}>
                <ImageComponent itemNext={item} isTeam={false} />
                <div className={styles.textContainer}>
                  <TextComponent itemNext={item} isTeam={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default WhatsNextSlice;
