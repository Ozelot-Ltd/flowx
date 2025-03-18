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

  const scrollToBottom = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    setActiveSection('contact');
  };

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
        {/* Replace the mailto link with a normal link that triggers the scroll function */}
        <a href="#contact" onClick={scrollToBottom}>
          CONTACT
        </a>
      </div>
    </header>
  );
}
