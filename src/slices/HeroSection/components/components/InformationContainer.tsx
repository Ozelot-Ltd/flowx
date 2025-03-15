import React, { useState, useEffect } from 'react';

import styles from './InformationContainer.module.css';
import { PrismicRichText } from '@prismicio/react';
import { HeroSectionProps } from '../..';

import { useScrollStore } from '../../../../../stores/useWindowStore';

type Props = {
  windowState: string;
  slice: HeroSectionProps['slice'];
};

export default function InformationContainer({ windowState, slice }: Props) {
  const { isScroll } = useScrollStore();
  const [activeState, setActiveState] = useState(windowState);
  const [previousState, setPreviousState] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // If the windowState changes, start transition
    if (windowState !== activeState && !transitioning) {
      setTransitioning(true);
      setPreviousState(activeState);

      // Wait for exit animation
      setTimeout(() => {
        setActiveState(windowState);
        // Wait for entry animation
        setTimeout(() => {
          setTransitioning(false);
        }, 500); // Match this to your CSS transition duration
      }, 500); // Match this to your CSS transition duration
    }
  }, [windowState, activeState, transitioning]);

  // Check if the content should be shown based on the state and variation
  const shouldShowContent = (state: string) => {
    return state === 'front' || state === 'back' || state === 'between';
  };

  // Generate content based on state
  const getContent = (state: string) => {
    if (state === 'front' && slice.variation === 'heroVertical') {
      return (
        <>
          <PrismicRichText field={slice.primary.front_title} />
          <PrismicRichText field={slice.primary.front_text} />
        </>
      );
    } else if (state === 'back' && slice.variation === 'heroVertical') {
      return (
        <>
          <PrismicRichText field={slice.primary.back_title} />
          <PrismicRichText field={slice.primary.back_text} />
        </>
      );
    } else if (state === 'between' && slice.variation === 'heroVertical') {
      return (
        <>
          <PrismicRichText field={slice.primary.between_title} />
          <PrismicRichText field={slice.primary.between_text} />
        </>
      );
    }
    return null;
  };

  return (
    <div
      className={`${styles.informationContainer} ${!isScroll ? styles.visible : ''}`}
    >
      {/* Previous content (exiting) */}
      {transitioning && shouldShowContent(previousState) && (
        <div className={`${styles.content} ${styles.exiting}`}>
          {getContent(previousState)}
        </div>
      )}

      {/* Current content (entering or active) */}
      {shouldShowContent(activeState) && (
        <div
          className={`${styles.content} ${transitioning ? '' : styles.active}`}
        >
          {getContent(activeState)}
        </div>
      )}
    </div>
  );
}
