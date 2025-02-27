'use client';

import React from 'react';

import styles from './Navbar.module.css';
import { SettingsDocument } from '../../../../../prismicio-types';
import { PrismicNextLink } from '@prismicio/next';

export default function Navbar({ settings }: { settings: SettingsDocument }) {
  return (
    <nav className={styles.navbar}>
      {settings.data.navbar.map((item, index: number) => (
        <div key={index} className={styles.navbarItem}>
          <PrismicNextLink field={item.navbar_link} />
        </div>
      ))}
    </nav>
  );
}
