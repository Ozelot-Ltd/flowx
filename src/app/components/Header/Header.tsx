import React from 'react';

import styles from './Header.module.css';

import { SettingsDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';
import Navbar from './components/Navbar';

export default function Header({ settings }: { settings: SettingsDocument }) {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <PrismicNextImage field={settings.data.logo} />
        </Link>
      </div>
      <Navbar settings={settings} />
    </header>
  );
}
