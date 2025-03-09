'use client';

import React, { useRef, useEffect } from 'react';
import styles from './SectionContainer.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavigation from '../../../../stores/useNavigation';
import { useMobile } from '../../../../context/MobileContext';

gsap.registerPlugin(ScrollTrigger);

export default function SectionContainer({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string | null | undefined;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useNavigation();
  const { isMobile } = useMobile();

  useEffect(() => {
    if (!sectionRef.current) return;

    // Default navigation trigger for all sections
    const navTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => id && setActiveSection(id),
      onEnterBack: () => id && setActiveSection(id),
      markers: false,
    });

    // Special behavior for mission section on mobile only
    if (id === 'mission' && isMobile) {
      // Find the BackgroundElement within this section for horizontal scrolling
      const section = sectionRef.current;
      const backgroundElement = section.querySelector('[class*="card"]');

      if (backgroundElement) {
        const backgroundWidth = backgroundElement.scrollWidth;
        const windowWidth = window.innerWidth;
        const distanceToScroll = backgroundWidth - windowWidth + 100;

        if (distanceToScroll > 0) {
          const horizontalScroll = gsap.to(backgroundElement, {
            x: -distanceToScroll,
            ease: 'none',
            duration: 3,
          });

          const horizontalTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${distanceToScroll}`,
            animation: horizontalScroll,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: process.env.NODE_ENV === 'development',
          });

          return () => {
            navTrigger.kill();
            horizontalTrigger.kill();
            horizontalScroll.kill();
          };
        }
      }
    }

    return () => {
      navTrigger.kill();
    };
  }, [id, setActiveSection, isMobile]);

  return (
    <section
      className={styles.sectionContainer}
      id={id?.toString()}
      ref={sectionRef}
    >
      {children}
    </section>
  );
}
