'use client';

import React from 'react';

import styles from './Header.module.css';

import { SettingsDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';
import Navbar from './components/Navbar';

export default function Header({ settings }: { settings: SettingsDocument }) {
  return (
    <header className={styles.header}>
      <div className={styles.rightContainer}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <PrismicNextImage field={settings.data.logo} />
          </Link>
        </div>
        <div className={styles.navbarContainer}>
          <Navbar settings={settings} />
        </div>
      </div>
      <div className={styles.contactContainer}>
        <Link href={'mailto:carlo_ettisberger@hotmail.com'}>CONTACT</Link>
      </div>
    </header>
  );
}
