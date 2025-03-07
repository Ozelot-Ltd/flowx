import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import NeumorphContainer from '@/app/components/Containers/NeumorphContainer';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './index.module.css';

/**
 * Props for `ReferenceSlice`.
 */
export type ReferenceSliceProps =
  SliceComponentProps<Content.ReferenceSliceSlice>;

/**
 * Component for "ReferenceSlice" Slices.
 */
const ReferenceSlice: FC<ReferenceSliceProps> = ({ slice }) => {
  return (
    <SectionContainer id={'reference'}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.container}
      >
        <div className={styles.contentContainer}>
          <MainHeadingContainer>
            <PrismicRichText field={slice.primary.title} />
          </MainHeadingContainer>

          <div className={styles.groupContainer}>
            {slice.primary.reference_group.map((item, index) => (
              <NeumorphContainer key={index}>
                <PrismicNextLink field={item.reference_link}>
                  <div className={styles.group}>
                    {' '}
                    <div className={styles.iconContainer}>
                      <PrismicNextImage field={item.reference_image} />
                    </div>
                    <div className={styles.textContainer}>
                      <PrismicRichText field={item.reference_name} />
                    </div>
                  </div>{' '}
                </PrismicNextLink>
              </NeumorphContainer>
            ))}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default ReferenceSlice;
