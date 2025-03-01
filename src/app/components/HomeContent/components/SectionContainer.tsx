'use client';

import React, { useRef } from 'react';
import styles from './SectionContainer.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavigation from '../../../../../stores/useNavigation'; // Adjust path as needed

gsap.registerPlugin(ScrollTrigger);

export default function SectionContainer({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const sectionRef = useRef(null);
  const { setActiveSection, activeSection } = useNavigation();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setActiveSection(id),
      onEnterBack: () => setActiveSection(id),
      markers: false,
    });

    return () => {
      trigger.kill();
    };
  }, [id, setActiveSection]);

  return (
    <section
      className={`${styles.section} ${activeSection === id ? styles.sectionActive : ''}`}
      id={id}
      ref={sectionRef}
    >
      {children}
    </section>
  );
}
