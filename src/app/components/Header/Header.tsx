import React from 'react';

import styles from './Header.module.css';

import { SettingsDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';

export default function Header({ settings }: { settings: SettingsDocument }) {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <PrismicNextImage field={settings.data.logo} />
        </Link>
      </div>
      <div>
        <div className={styles.test}>We do stuff</div>
      </div>
    </header>
  );
}
