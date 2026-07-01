import Link from 'next/link';
import Image from 'next/image';

import Logo from '../../public/images/flow_x_Logo.png';
import styles from './fallback.module.css';

export default function NotFound() {
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
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page drifted off.</h1>
        <p className={styles.text}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have
          moved.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.homeLink}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
