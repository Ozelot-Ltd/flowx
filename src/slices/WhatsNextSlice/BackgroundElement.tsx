import React from 'react';
import styles from './BackgroundElement.module.css';
import {
  Simplify,
  WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem,
} from '../../../prismicio-types';

export default function BackgroundElement({
  children,
}: {
  item?: Simplify<WhatsNextSliceSliceDefaultPrimaryWhatsNextElementsItem>;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.children}>{children}</div>
      <div className={styles.bg}></div>
      <div className={styles.blob}></div>
    </div>
  );
}
