import React from 'react';

import styles from './HeroBackground.module.css';

import { createClient } from '@/prismicio';

import Content from './Content';

export default async function HeroBackground() {
  const client = createClient();

  const backgroundFetch = await client.getByType('background_image');
  const background = backgroundFetch.results[0].data.backgorund_logo;

  return (
    <div className={styles.background}>
      <Content background={background} styles={styles} />
    </div>
  );
}
