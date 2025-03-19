import { Metadata } from 'next';
import { isFilled, asImageSrc } from '@prismicio/client';

import { createClient } from '@/prismicio';

import Background from './components/Background/Background';
import styles from './page.module.css';
import Header from './components/Header/Header';

import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';

import Footer from './components/Footer/Footer';
// import { SmoothScroll } from './components/SmoothScroller/SmoothScroller';
import StartingScreen from './components/StartingScreen/StartingScreen';

// import Splashscreen from './components/Splashscreen/Splashscreen';

// const isDevelopment = process.env.NODE_ENV === 'development';

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle('home');
  const settings = await client.getSingle('settings');
  const footer = await client.getSingle('footer');

  return (
    <>
      {/* <StartingScreen /> */}
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
