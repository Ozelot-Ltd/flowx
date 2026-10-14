import { FC } from 'react';
import { Content, asText, isFilled } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';

import styles from './index.module.css';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';

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
          {' '}
          <MainHeadingContainer>
            <PrismicRichText field={slice.primary.title} />
          </MainHeadingContainer>
          <div className={styles.groupContainer}>
            {slice.primary.reference_group.map((item, index) => {
              const name = asText(item.reference_name).trim();

              return (
                <div key={index}>
                  <div className={styles.group}>
                    {/* <PrismicRichText field={item.reference_name} /> */}
                    {isFilled.link(item.reference_link) ? (
                      // The logo is the link's only content, so the reference
                      // name labels the link (falling back to the image's alt).
                      <PrismicNextLink
                        field={item.reference_link}
                        aria-label={name || undefined}
                      >
                        <div className={styles.iconContainer}>
                          <PrismicNextImage
                            field={item.reference_image}
                            alt={name ? '' : undefined}
                            width={192}
                          />
                        </div>{' '}
                      </PrismicNextLink>
                    ) : (
                      <div className={styles.iconContainer}>
                        <PrismicNextImage
                          field={item.reference_image}
                          width={192}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default ReferenceSlice;
