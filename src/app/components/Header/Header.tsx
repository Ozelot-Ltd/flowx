'use client';

import React from 'react';

import styles from './Header.module.css';

import { SettingsDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import Link from 'next/link';
// import Navbar from './components/Navbar';

import useNavigation from '../../../../stores/useNavigation';
// import Hamburger from './components/Hamburger';

export default function Header({ settings }: { settings: SettingsDocument }) {
  const { setActiveSection } = useNavigation();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
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
      {/* <div className={styles.hamburgerContainer}>
        <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className={styles.navbarContainer}>
          <Navbar settings={settings} isMenuOpen={isMenuOpen} />
        </div>
      </div> */}

      <div className={styles.contactContainer}>
        <Link href={'mailto:info@flowx.one'}>CONTACT</Link>
      </div>
    </header>
  );
}
