import { Metadata } from 'next';
import { isFilled, asImageSrc } from '@prismicio/client';

import { createClient } from '@/prismicio';

import Background from './components/Background/Background';
import styles from './page.module.css';
import Header from './components/Header/Header';

import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';

import Footer from './components/Footer/Footer';
import StartingScreen from './components/StartingScreen/StartingScreen';

export default async function Page() {
  const client = createClient();
  const [page, settings, footer] = await Promise.all([
    client.getSingle('home'),
    client.getSingle('settings'),
    client.getSingle('footer'),
  ]);

  return (
    <>
      <StartingScreen />
      <Background />
      <Header settings={settings} />
      <section className={styles.container}>
        <SliceZone slices={page.data.slices} components={components} />
        <Footer footer={footer} />
      </section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('home');

  // Empty fields fall back to undefined so the layout's defaults apply.
  const title = isFilled.keyText(page.data.meta_title)
    ? page.data.meta_title
    : undefined;
  const description = isFilled.keyText(page.data.meta_description)
    ? page.data.meta_description
    : undefined;

  return {
    // The home page title is used as-is, not run through the "%s | flowX"
    // template meant for other pages.
    title: title ? { absolute: title } : undefined,
    description,
    openGraph: {
      title,
      description,
      images: isFilled.image(page.data.meta_image)
        ? [asImageSrc(page.data.meta_image)]
        : undefined,
    },
  };
}
