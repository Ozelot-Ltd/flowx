'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useMobile } from '../../../../context/MobileContext';

// Register the plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const { isDesktop } = useMobile();

  useEffect(() => {
    // Only create the smoother if we're on desktop
    if (isDesktop) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.5,
        effects: true,
      });

      return () => {
        // Clean up
        if (smootherRef.current) {
          smootherRef.current.kill();
        }
      };
    }
  }, [isDesktop]);

  // For mobile, just render the children directly
  if (!isDesktop) {
    return <>{children}</>;
  }

  // For desktop, use the smooth scrolling wrapper
  return (
    <div
      id="smooth-wrapper"
      ref={wrapperRef}
      style={{ maxWidth: '2200px', margin: '0 auto' }}
    >
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
