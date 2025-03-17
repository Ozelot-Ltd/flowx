'use client';

import React from 'react';
import { FooterDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

import styles from './Footer.module.css';
import Link from 'next/link';
import ContactForm from '../ContactForm/ContactForm';

type Props = {
  footer: FooterDocument;
};

const isDevelopment = process.env.NODE_ENV === 'development';

export default function Footer({ footer }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftContainer}>
        <div className={styles.logoContainer}>
          <PrismicNextImage field={footer.data.logo} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.addressContainer}>
            <div className={styles.address}>
              <PrismicRichText field={footer.data.address_name} />
              <PrismicRichText field={footer.data.address_street} />
              <PrismicRichText field={footer.data.address_city} />
            </div>
            <div className={styles.contact}>
              <Link href={`mailto:${footer.data.email}`}>
                <PrismicRichText field={footer.data.email} />
              </Link>
            </div>
          </div>
          {/* <div className={styles.contactContainer}>
            <Link href={'mailto:info@flowx.one'}>CONTACT</Link>
          </div>{' '} */}
        </div>
      </div>{' '}
      <div className={styles.rightContainer}>
        {isDevelopment && <ContactForm />}
      </div>
    </footer>
  );
}
