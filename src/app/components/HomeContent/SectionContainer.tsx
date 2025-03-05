'use client';

import React, { useRef } from 'react';
import styles from './SectionContainer.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavigation from '../../../../stores/useNavigation';

gsap.registerPlugin(ScrollTrigger);

export default function SectionContainer({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string | null | undefined;
}) {
  const sectionRef = useRef(null);
  const { setActiveSection, activeSection } = useNavigation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => id && setActiveSection(id),
      onEnterBack: () => id && setActiveSection(id),
      markers: true,
    });

    console.log(activeSection);

    return () => {
      trigger.kill();
    };
  }, [id, setActiveSection]);

  return (
    <section
      className={`${styles.sectionContainer} ${activeSection === id?.toString() ? styles.sectionActive : ''}`}
      id={id?.toString()}
      ref={sectionRef}
    >
      {children}
    </section>
  );
}
