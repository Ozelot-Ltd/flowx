'use client';

import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import styles from './index.module.css';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import MainHeadingContainer from '@/app/components/Containers/MainHeadingContainer';
import BackgroundElement from './BackgroundElement';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Arrow from '@/app/components/Icons/Arrow';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Props for `MissionSlice`.
 */
export type MissionSliceProps = SliceComponentProps<Content.MissionSliceSlice>;

/**
 * Component for "MissionSlice" Slices.
 */
const MissionSlice: FC<MissionSliceProps> = ({ slice }) => {
  return (
    <SectionContainer id={`${slice.primary.is_next ? 'next' : 'mission'}`}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.container}
      >
        <div className={styles.contentContainer}>
          <MainHeadingContainer>
            <PrismicRichText field={slice.primary.title} />
          </MainHeadingContainer>
          <BackgroundElement item={slice.primary.mission_group_fields[0]}>
            {slice.primary.mission_group_fields.map((item, index) => (
              <div
                className={`${styles.group} ${!slice.primary.is_next && styles.small}`}
                key={index}
              >
                <div className={styles.iconContainer}>
                  <PrismicNextImage field={item.icon} />
                </div>

                <div className={styles.textContainer}>
                  {item.has_title && (
                    <PrismicRichText field={item.group_title} />
                  )}
                  {item.has_text && <PrismicRichText field={item.group_text} />}{' '}
                  {item.has_link && (
                    <div className={styles.linkContainer}>
                      <PrismicNextLink field={item.link} />
                      <Arrow height={14} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </BackgroundElement>
        </div>
      </section>
    </SectionContainer>
  );
};

export default MissionSlice;
