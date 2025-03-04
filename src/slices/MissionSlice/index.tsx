import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';
import SectionContainer from '@/app/components/HomeContent/SectionContainer';
import styles from './index.module.css';
import { PrismicNextImage } from '@prismicio/next';
import NeumorphContainer from '@/app/components/Containers/NeumorphContainer';

/**
 * Props for `MissionSlice`.
 */
export type MissionSliceProps = SliceComponentProps<Content.MissionSliceSlice>;

/**
 * Component for "MissionSlice" Slices.
 */
const MissionSlice: FC<MissionSliceProps> = ({ slice }) => {
  return (
    <SectionContainer id={'mission'}>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.container}
      >
        <div className={styles.contentContainer}>
          <div className={styles.titleContainer}>
            <PrismicRichText field={slice.primary.title} />
          </div>

          <div className={styles.groupContainer}>
            {slice.primary.mission_group_fields.map((item, index) => (
              <NeumorphContainer key={index}>
                <div className={styles.group}>
                  <div className={styles.textContainer}>
                    <PrismicRichText field={item.group_title} />
                    <PrismicRichText field={item.group_text} />
                  </div>
                  <div className={styles.iconContainer}>
                    <PrismicNextImage field={item.icon} />
                  </div>
                </div>
              </NeumorphContainer>
            ))}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default MissionSlice;
