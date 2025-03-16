'use client';

import React from 'react';

import styles from './Header.module.css';

import { SettingsDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';

import useNavigation from '../../../../stores/useNavigation';

import { useScrollStore } from '../../../../stores/useWindowStore';

export default function Header({ settings }: { settings: SettingsDocument }) {
  const { isScroll } = useScrollStore();
  const { setActiveSection } = useNavigation();

  return (
    <header
      className={`${styles.header} ${!isScroll ? styles.transparent : ''}`}
    >
      <div className={styles.rightContainer}>
        <div
          className={styles.logoContainer}
          onClick={() => setActiveSection('hero')}
        >
          <Link href="/">
            <PrismicNextImage field={settings.data.logo} />
          </Link>
        </div>
      </div>
      <div className={styles.contactContainer}>
        <Link href={'mailto:info@flowx.one'}>CONTACT</Link>
      </div>
    </header>
  );
}
