'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Object3D, MeshStandardMaterial } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useFrame } from '@react-three/fiber';
import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';
import useNavigation from '../../../../../stores/useNavigation';

import { useMobile } from '../../../../../context/MobileContext';

gsap.registerPlugin(useGSAP);

const shortTransition = 1.2;
const longTransition = 2.5;

export default function Glass() {
  const containerRef = useRef<Object3D>(null);
  const glassRef = useRef<Object3D>(null);

  const { windowState, setWindowState } = useWindowStore();
  const { isScroll } = useScrollStore();
  const { activeSection } = useNavigation();

  const { isMobile } = useMobile();

  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        transparent: true,
        opacity: 0.8,
        color: '#88ccff',
        metalness: 0.5,
        roughness: 0.1,
      }),
    []
  );

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.4; // Slower animation
    if (containerRef.current) {
      containerRef.current.rotation.y = Math.sin(time) * 0.03;
      containerRef.current.rotation.z = Math.cos(time) * 0.03;
    }
  });

  useEffect(() => {
    if (!glassRef.current) return;
    glassRef.current.scale.set(0.25, 0.5, 0.003);

    if (isScroll && activeSection === 'hero_vertical') {
      setWindowState('hero_vertical');
    }
    if (activeSection === 'vision') {
      setWindowState('vision');
    }
    if (activeSection === 'solution') {
      setWindowState('solution');
    }
    if (activeSection === 'team') {
      setWindowState('team');
    }
    if (activeSection === 'whatsnext') {
      setWindowState('whatsnext');
    }
  }, [isScroll, activeSection, setWindowState, isMobile]);

  useGSAP(() => {
    if (!glassRef.current) return;

    if (windowState === 'front') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI * 2,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.2,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }
    if (windowState === 'back') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.2,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }
    if (windowState === 'between') {
      gsap.to(glassRef.current.rotation, {
        x: Math.PI / 1.5,
        y: 0,
        z: Math.PI / 2.5,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.2,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }
    if (isScroll && windowState === 'hero_vertical') {
      gsap.to(glassRef.current.rotation, {
        x: Math.PI / 1.2,
        y: 0,
        z: 0,
        duration: longTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0,
        y: 0.05,
        z: 0,
        duration: longTransition,
      });
    }
    if (isScroll && windowState === 'vision') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI,
        z: 0,
        duration: longTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 1,
        y: 0,
        z: 0,
        duration: longTransition,
      });
    }
    if (isScroll && windowState === 'left' && activeSection === 'solution') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI * 2,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: -0.2,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }
    if (isScroll && windowState === 'right' && activeSection === 'solution') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.2,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }
    if (isScroll && windowState === 'spaced' && activeSection === 'solution') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
    }
    if (windowState === 'team') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: Math.PI * 2,
        z: 0,
        duration: longTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 1,
        y: 0,
        z: 0,
        duration: longTransition,
      });
    }
  }, [isScroll, windowState]);

  return (
    <group ref={containerRef}>
      <group ref={glassRef}>
        <mesh material={material}>
          <boxGeometry />
        </mesh>
      </group>
    </group>
  );
}
