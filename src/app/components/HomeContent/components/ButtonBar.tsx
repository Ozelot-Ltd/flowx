import React from 'react';
import { HomeDocument } from '../../../../../prismicio-types';
import { asText, RichTextField } from '@prismicio/client';
import { PrismicRichText } from '@prismicio/react';

import styles from './ButtonBar.module.css';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';

export default function ButtonBar({ page }: { page: HomeDocument }) {
  const { setWindowState } = useWindowStore();
  const { isScroll } = useScrollStore();

  const clickFunction = (buttonText: RichTextField) => {
    if (buttonText) {
      setWindowState(asText(buttonText).toLowerCase());
    }
  };
  return (
    <div
      className={`${styles.buttonBar} ${!isScroll ? styles.btnVisible : ''}`}
    >
      {page.data.landing_buttons.map((item, index: number) => (
        <div
          key={index}
          className={styles.button}
          onClick={() => {
            if (item.button_text) clickFunction(item.button_text);
          }}
        >
          <PrismicRichText field={item.button_text} />
        </div>
      ))}
    </div>
  );
}
