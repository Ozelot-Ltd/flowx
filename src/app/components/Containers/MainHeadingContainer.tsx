import React from 'react';

import styles from './MainHeadingContainer.module.css';

export default function MainHeadingContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
