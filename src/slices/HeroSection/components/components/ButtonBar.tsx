'use client';

import React from 'react';
import { HeroSectionSlice } from '../../../../../prismicio-types';

import styles from './ButtonBar.module.css';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';
import { PrismicRichText } from '@prismicio/react';
import { asText } from '@prismicio/client';

export default function ButtonBar({
  slice,
  setActiveButton,
}: {
  slice: HeroSectionSlice;
  setActiveButton: (button: string) => void;
}) {
  const { setWindowState, windowState } = useWindowStore();
  const { isScroll } = useScrollStore();

  const clickFunction = (buttonText: string) => {
    if (buttonText) {
      setActiveButton(windowState);
      setWindowState(buttonText.toLowerCase());
    }
  };

  return (
    <div
      className={`${styles.buttonBar} ${!isScroll ? styles.btnVisible : ''}`}
    >
      {slice.primary.hero_buttons.map((item, index: number) => (
        <div
          key={index}
          className={`${styles.button} ${windowState === asText(item.button_text)?.toLowerCase() ? styles.active : ''}`}
          onClick={() => {
            if (item.button_text) clickFunction(asText(item.button_text));
          }}
        >
          <PrismicRichText field={item.button_text} />
        </div>
      ))}
    </div>
  );
}
