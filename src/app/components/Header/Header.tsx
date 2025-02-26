import React from 'react';

import styles from './Header.module.css';

import { SettingsDocument } from '../../../../prismicio-types';

export default function Header({ settings }: { settings: SettingsDocument }) {
  return <header className={styles.header}>Header</header>;
}
