import React from 'react';
import { HomeDocument } from '../../../../../prismicio-types';

import styles from './ButtonBar.module.css';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';

export default function ButtonBar({
  page,

  setActiveButton,
}: {
  page: HomeDocument;
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
      {page.data.landing_buttons.map((item, index: number) => (
        <div
          key={index}
          className={`${styles.button} ${windowState === item.button_text?.toLowerCase() ? styles.active : ''}`}
          onClick={() => {
            if (item.button_text) clickFunction(item.button_text);
          }}
        >
          <p>{item.button_text}</p>
        </div>
      ))}
    </div>
  );
}
