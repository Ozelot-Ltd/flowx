'use client';

import React, { useRef } from 'react';
import styles from './SectionContainer.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavigation from '../../../../stores/useNavigation';
import { useMobile } from '../../../../context/MobileContext';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Default navigation trigger for all sections
    const navTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => id && setActiveSection(id),
      onEnterBack: () => id && setActiveSection(id),
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
          gsap.set(backgroundElement, {
            willChange: 'transform',
          });

          const horizontalScroll = gsap.to(backgroundElement, {
            x: -distanceToScroll,
            ease: 'power1.out', // Change from 'none' to a slightly eased animation
            duration: 1, // Duration affects how the scrubbing feels
            force3D: true,
          });

          const horizontalTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top 5%', // Adjusted trigger point for smoother entry
            end: `+=${distanceToScroll * 1.05}`, // Add some extra scrolling distance
            animation: horizontalScroll,
            pin: true,
            pinSpacing: true,
            scrub: 0.8, // Lower value for more responsive scrubbing
            anticipatePin: 1,
            fastScrollEnd: true, // Better handling of fast scrolling
            preventOverlaps: true,
            invalidateOnRefresh: true,
            markers: false,
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
