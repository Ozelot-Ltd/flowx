'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Logo from '../../public/images/flow_x_Logo.png';
import styles from './fallback.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to the console / any monitoring hooked into it.
    console.error(error);
  }, [error]);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <Image
          src={Logo}
          alt="flowX logo"
          className={styles.logo}
          style={{ height: '72px', width: 'auto' }}
          priority
        />
        <p className={styles.code}>Oops</p>
        <h1 className={styles.title}>Something went wrong.</h1>
        <p className={styles.text}>
          An unexpected error occurred. You can try again, or head back to the
          homepage.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.retryButton}
            onClick={() => reset()}
          >
            Try again
          </button>
          <Link href="/" className={styles.homeLink}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
