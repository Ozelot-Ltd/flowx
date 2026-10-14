import React, { useState, useEffect, useRef } from 'react';

import styles from './InformationContainer.module.css';
import { PrismicRichText } from '@prismicio/react';
import { HeroSectionProps } from '../..';

import { useScrollStore } from '../../../../../stores/useWindowStore';

type Props = {
  windowState: string;
  slice: HeroSectionProps['slice'];
};

export default function InformationContainer({ windowState, slice }: Props) {
  const isScroll = useScrollStore((s) => s.isScroll);
  const [activeState, setActiveState] = useState(windowState);
  const [previousState, setPreviousState] = useState('');
  const [transitioning, setTransitioning] = useState(false);
  // The state the in-flight transition is heading to.
  const targetState = useRef(windowState);

  useEffect(() => {
    if (windowState !== activeState && !transitioning) {
      setTransitioning(true);
      setPreviousState(activeState);
      targetState.current = windowState;
    }
  }, [windowState, activeState, transitioning]);

  // Swap content mid-transition, then end it. Keyed on `transitioning` alone so
  // the cleanup only fires on unmount — or if a transition is ever cut short —
  // never because the state it just set re-ran the effect.
  useEffect(() => {
    if (!transitioning) return;

    let innerTimeout: ReturnType<typeof setTimeout> | undefined;
    const outerTimeout = setTimeout(() => {
      setActiveState(targetState.current);

      innerTimeout = setTimeout(() => {
        setTransitioning(false);
      }, 400);
    }, 400);

    return () => {
      clearTimeout(outerTimeout);
      if (innerTimeout) clearTimeout(innerTimeout);
    };
  }, [transitioning]);

  const shouldShowContent = (state: string) => {
    return state === 'front' || state === 'back' || state === 'between';
  };

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
