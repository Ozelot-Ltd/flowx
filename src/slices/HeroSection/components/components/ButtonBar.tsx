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
  const windowState = useWindowStore((s) => s.windowState);
  const setWindowState = useWindowStore((s) => s.setWindowState);
  const isScroll = useScrollStore((s) => s.isScroll);

  const clickFunction = (buttonText: string) => {
    if (buttonText) {
      setActiveButton(useWindowStore.getState().windowState);
      setWindowState(buttonText.toLowerCase());
    }
  };

  return (
    <div
      className={`${styles.buttonBar} ${!isScroll ? styles.btnVisible : ''}`}
    >
      {slice.primary.hero_buttons.map((item, index: number) => {
        const active = windowState === asText(item.button_text)?.toLowerCase();
        return (
          <button
            type="button"
            key={index}
            className={`${styles.button} ${active ? styles.active : ''}`}
            aria-pressed={active}
            onClick={() => {
              if (item.button_text) clickFunction(asText(item.button_text));
            }}
          >
            <PrismicRichText field={item.button_text} />
          </button>
        );
      })}
    </div>
  );
}
