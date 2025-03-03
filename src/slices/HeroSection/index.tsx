import { FC } from 'react';
import { Content } from '@prismicio/client';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

import SectionContainer from '@/app/components/HomeContent/components/SectionContainer';
import DefaultSlice from './components/DefaultSlice';

/**
 * Props for `HeroSection`.
 */
export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

/**
 * Component for "HeroSection" Slices.
 */
const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  return (
    <>
      {slice.variation === 'default' && (
        <DefaultSlice slice={slice} index={0} slices={[]} context={undefined} />
      )}
      {slice.variation === 'heroSectionVertical' && (
        <SectionContainer id={slice.id}>
          <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            id={slice.id}
          >
            <PrismicRichText field={slice.primary.hero_title} />
          </section>
        </SectionContainer>
      )}
    </>
  );
};

export default HeroSection;
