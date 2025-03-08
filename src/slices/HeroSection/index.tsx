'use client';

import { FC, useEffect, useRef } from 'react';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import DefaultSlice from './components/DefaultSlice';
import VerticalSlice from './components/VerticalSlice';

import styles from './index.module.css';

/**
 * Props for `HeroSection`.
 */
export type HeroSectionProps = SliceComponentProps<Content.HeroSectionSlice>;

/**
 * Component for "HeroSection" Slices.
 */
const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stickyRef.current) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (stickyRef.current && scrollPosition > viewportHeight) {
        stickyRef.current.style.setProperty('--is-sticky', 'static');
      } else if (stickyRef.current) {
        stickyRef.current.style.setProperty('--is-sticky', 'sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {slice.variation === 'default' && (
        <DefaultSlice slice={slice} index={0} slices={[]} context={undefined} />
      )}
      {slice.variation === 'heroVertical' && (
        <div className={styles.sticky} ref={stickyRef}>
          <VerticalSlice
            slice={slice}
            index={0}
            slices={[]}
            context={undefined}
          />
        </div>
      )}
    </>
  );
};

export default HeroSection;
