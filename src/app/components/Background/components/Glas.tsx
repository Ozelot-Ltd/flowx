'use client';

import React, { useRef, useEffect } from 'react';
import { Object3D } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  useScrollStore,
  useWindowStore,
} from '../../../../../stores/useWindowStore';

import useNavigation from '../../../../../stores/useNavigation';

gsap.registerPlugin(useGSAP);

const materialProps = {
  thickness: 0.05,
  roughness: 0.1,
  transmission: 0.8,
  ior: 1.0,
  chromaticAberration: 0.1,
  backside: true,
};

export const GLASS_HEIGHT = 1;
export const NB_SECTIONS = 3;

const shortTransition = 1.2;
const longTransition = 1.5;

export default function Glass() {
  const containerRef = useRef<Object3D>(null);
  const glassRef = useRef<Object3D>(null);
  const scrollTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const interactiveTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const { viewport } = useThree();
  const { isScroll } = useScrollStore();
  const { windowState, setWindowState } = useWindowStore();
  const { activeSection } = useNavigation();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() / 2.5;
    if (containerRef.current) {
      containerRef.current.rotation.y = Math.cos(time * Math.sin(1.5)) / 45;
      containerRef.current.rotation.z = Math.cos(time * Math.sin(1)) / 50;
    }
  });

  useEffect(() => {
    if (activeSection === 'hero') {
      setWindowState('hero');
    } else if (activeSection === 'hero_horizontal') {
      setWindowState('hero_horizontal');
    } else if (activeSection === 'vision') {
      setWindowState('vision');
    } else if (activeSection === 'mission') {
      setWindowState('mission');
    } else if (activeSection === 'product') {
      setWindowState('product');
    }
  }, [activeSection, setWindowState]);

  useEffect(() => {
    if (!glassRef.current) return;
    if (windowState === 'scroll' && activeSection === 'hero_horizontal') {
      glassRef.current.position.set(0, -0.1, -1.4);
      glassRef.current.rotation.set(0, 0, 0);
    } else if (windowState === 'scroll' && activeSection === 'hero') {
      glassRef.current.position.set(0, -0.1, -1.4);
      glassRef.current.rotation.set(0, 0, 0);
    }

    console.log(activeSection, 'jölasdöjkldf', windowState);
  }, []);

  useFrame(() => {});

  useEffect(() => {
    if (interactiveTimelineRef.current) {
      interactiveTimelineRef.current.kill();
      interactiveTimelineRef.current = null;
    }

    if (scrollTimelineRef.current) {
      scrollTimelineRef.current.kill();
      scrollTimelineRef.current = null;
    }
  }, [isScroll]);

  useGSAP(() => {
    if (!glassRef.current) return;

    gsap.killTweensOf(glassRef.current.rotation);

    if (windowState === 'front') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI * 2,
        z: 0,
        x: 0,
        duration: shortTransition,
        ease: 'back.out(1.7)',
      });
    } else if (windowState === 'back') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI,
        z: 0,
        x: 0,
        duration: shortTransition,
        ease: 'back.out(1.7)',
      });
    } else if (windowState === 'between') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI,
        x: Math.PI / 2,
        z: -1.2,
        duration: shortTransition,
        ease: 'back.out(1.7)',
      });
    } else if (windowState === 'hero') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI * 2,
        x: 0,
        z: 0,
        duration: longTransition,
        ease: 'sine',
      });
      gsap.to(glassRef.current.position, {
        y: 0,
        x: 1,
        z: -1.4,
        duration: longTransition,
        ease: 'sine',
      });
    } else if (windowState === 'hero_horizontal') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI * 2,
        x: 0,
        z: 0,
        duration: longTransition,
        ease: 'sine',
      });
      gsap.to(glassRef.current.position, {
        y: 0,
        x: 0,
        z: -1.4,
        duration: longTransition,
        ease: 'sine',
      });
    } else if (windowState === 'vision') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI * 3,
        x: 0,
        z: 0,
        duration: longTransition,
        ease: 'sine',
      });
      gsap.to(glassRef.current.position, {
        y: 0,
        x: -1,
        z: -1.4,
        duration: longTransition,
        ease: 'sine',
      });
      gsap.to(glassRef.current.scale, {
        y: 0.5,
        x: 0.5,
        z: 0.5,
        duration: longTransition,
        ease: 'sine',
      });
    } else if (windowState === 'mission') {
      gsap.to(glassRef.current.rotation, {
        y: Math.PI,
        x: 0,
        z: 0,
        duration: longTransition,
        ease: 'sine',
      });
      gsap.to(glassRef.current.position, {
        y: 0,
        x: 2,
        z: -1.4,
        duration: longTransition,
        ease: 'sine',
      });
      gsap.to(glassRef.current.scale, {
        y: 1.1,
        x: 1.1,
        z: 1.1,
        duration: longTransition,
        ease: 'power2.inOut',
      });
    }
  }, [windowState]);

  return (
    <group ref={containerRef}>
      <mesh ref={glassRef} scale={viewport.width / 2}>
        <boxGeometry args={[1.5, 3, 0.05]} />
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
