'use client';

import React from 'react';

import styles from './Header.module.css';

import { SettingsDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';

import useNavigation from '../../../../stores/useNavigation';

import {
  useScrollStore,
  useWindowStore,
} from '../../../../stores/useWindowStore';

export default function Header({ settings }: { settings: SettingsDocument }) {
  const isScroll = useScrollStore((s) => s.isScroll);
  const setActiveSection = useNavigation((s) => s.setActiveSection);
  const heroSectionId = useNavigation((s) => s.heroSectionId);

  const scrollToBottom = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    // Leave the hero's interactive mode first (mirrors VerticalSlice's exit):
    // otherwise the body is still overflow:hidden and the glass stays in its
    // button-driven state. Overflow is restored synchronously so the scroll
    // below isn't swallowed before VerticalSlice's effect catches up.
    if (!useScrollStore.getState().isScroll) {
      useWindowStore.getState().setWindowState('hero_vertical');
      useScrollStore.getState().setIsScroll(true);
      document.body.style.overflow = 'auto';
    }

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
          onClick={() => {
            if (heroSectionId) setActiveSection(heroSectionId);
          }}
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
