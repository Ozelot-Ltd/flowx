import { FC } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
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
          <div className={styles.groupContainer}>
            {slice.primary.reference_group.map((item, index) => (
              <div key={index}>
                <PrismicNextLink field={item.reference_link}>
                  <div className={styles.group}>
                    <div className={styles.iconContainer}>
                      <PrismicNextImage field={item.reference_image} />
                    </div>
                  </div>
                </PrismicNextLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default ReferenceSlice;
