import { Metadata } from 'next';
import { isFilled, asImageSrc } from '@prismicio/client';

import { createClient } from '@/prismicio';

import Splashscreen from './components/Splashscreen';
import Background from './components/Background/Background';
import { components } from '@/slices';
import styles from './page.module.css';
import { SliceZone } from '@prismicio/react';
import Header from './components/Header/Header';

const isDevelopment = process.env.NODE_ENV === 'development';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('home');
  const settings = await client.getSingle('settings');

  return (
    <>
      {isDevelopment ? (
        <section className={styles.container}>
          <Header settings={settings} />
          <Background />
          <SliceZone slices={page.data.slices} components={components} />
        </section>
      ) : (
        <Splashscreen />
      )}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('home');

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title)
        ? page.data.meta_title
        : undefined,
      description: isFilled.keyText(page.data.meta_description)
        ? page.data.meta_description
        : undefined,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}
