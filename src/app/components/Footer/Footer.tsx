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

export default function Footer({ footer }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftContainer}>
        <div className={styles.logoContainer}>
          <PrismicNextImage field={footer.data.logo} />
        </div>
        <div className={styles.addressContainer}>
          <PrismicRichText field={footer.data.address_name} />
          <PrismicRichText field={footer.data.address_street} />
          <PrismicRichText field={footer.data.address_city} />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.contactContainer}>
          <Link href={'mailto:info@flowx.one'}>CONTACT</Link>
        </div>
      </div>
      <ContactForm />
    </footer>
  );
}
