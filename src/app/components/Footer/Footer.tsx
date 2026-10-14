import React from 'react';
import { asText } from '@prismicio/client';
import { FooterDocument } from '../../../../prismicio-types';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

import styles from './Footer.module.css';
import ContactForm from '../ContactForm/ContactForm';

type Props = {
  footer: FooterDocument;
};

export default function Footer({ footer }: Props) {
  const email = asText(footer.data.email).trim();

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
              <a href={`mailto:${email}`}>
                <PrismicRichText field={footer.data.email} />
              </a>
            </div>
          </div>
        </div>
      </div>{' '}
      <div className={styles.rightContainer}>
        <ContactForm />
      </div>
    </footer>
  );
}
