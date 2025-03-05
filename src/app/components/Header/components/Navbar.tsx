'use client';

import React from 'react';

import styles from './Navbar.module.css';
import { SettingsDocument } from '../../../../../prismicio-types';
import { PrismicNextLink } from '@prismicio/next';

import useNavigation from '../../../../../stores/useNavigation';

export default function Navbar({
  settings,
  isMenuOpen,
}: {
  settings: SettingsDocument;
  isMenuOpen: boolean;
}) {
  const { activeSection, setActiveSection } = useNavigation();

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.open : ''}`}>
      {settings.data.navbar.map((item) => (
        <div
          key={item.link_id}
          className={`${styles.navbarItem} ${activeSection === item.link_id ? styles.active : ''}`}
          onClick={() => setActiveSection(item.link_id as string)}
        >
          <PrismicNextLink field={item.navbar_link} />
        </div>
      ))}
    </nav>
  );
}
