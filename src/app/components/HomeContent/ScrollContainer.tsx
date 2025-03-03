'use client';

import React, { useEffect, useRef } from 'react';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import gsap from 'gsap';
import styles from './ScrollContainer.module.css';

// Register the plugin
gsap.registerPlugin(ScrollSmoother);

export default function ScrollContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create refs for our wrapper and content
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize ScrollSmoother after component mounts and DOM is ready
  useEffect(() => {
    // Make sure elements exist before creating ScrollSmoother
    if (wrapperRef.current && contentRef.current) {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

      // Clean up on unmount
      return () => {
        smoother.kill();
      };
    }
  }, []); // Empty dependency array means this runs once after mount

  return (
    <div className={styles.main} ref={wrapperRef}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
