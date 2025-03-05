'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import gsap from 'gsap';
import styles from './ScrollContainer.module.css';

gsap.registerPlugin(ScrollSmoother);

export default function ScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapperRef.current && contentRef.current) {
      ScrollSmoother.create({
        ignoreMobileResize: true,
        smooth: 1,
        effects: true,
        normalizeScroll: true,
      });
    }
  }, []);

  return (
    <div className={styles.main} ref={wrapperRef}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
