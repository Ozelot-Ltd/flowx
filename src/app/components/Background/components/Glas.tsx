'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import {
  Object3D,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  DoubleSide,
  Color,
  Mesh,
  Material,
} from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useFrame } from '@react-three/fiber';
import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';
import useNavigation from '../../../../../stores/useNavigation';

import { useMobile } from '../../../../../context/MobileContext';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

gsap.registerPlugin(useGSAP);

const shortTransition = 1.2;
const longTransition = 2.5;

export default function Glass() {
  const containerRef = useRef<Object3D>(null);
  const glassRef = useRef<Object3D>(null);

  const model = useLoader(GLTFLoader, '/asset/glasss.glb');

  const { windowState, setWindowState } = useWindowStore();
  const { isScroll } = useScrollStore();
  const { activeSection } = useNavigation();

  const { isMobile } = useMobile();

  // Create custom materials
  const materials = useMemo(() => {
    return {
      // Glass material
      'Architectural Glass.001': new MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.6,
        color: new Color('#a3d5ff'),
        metalness: 0.4,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.1,
        ior: 1.5, // Glass-like refraction
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),

      // Light material
      'Bulb Emmision Light.001': new MeshPhysicalMaterial({
        color: new Color('#ffffff'),
        emissive: new Color('#ffee88'),
        emissiveIntensity: 2,
        metalness: 0.5,
        roughness: 0.2,
        transparent: true,
      }),

      // Basic white material
      'Default White': new MeshStandardMaterial({
        color: new Color('grey'),
        roughness: 0.2,
        metalness: 0.1,
      }),

      // Glitter material
      'Glitter Gel.002': new MeshPhysicalMaterial({
        color: new Color('#c0e8ff'),
        roughness: 0.3,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        transparent: true,
      }),

      // Gas cloud material
      'Procedural volumetric gas cloud.001': new MeshStandardMaterial({
        color: new Color('yellow'),
        transparent: true,
        opacity: 0.5,
        side: DoubleSide,
        metalness: 0.1,
        roughness: 0.9,
      }),
    };
  }, []);

  // Apply materials to the model
  useEffect(() => {
    if (model && model.scene) {
      model.scene.traverse((node) => {
        if (node instanceof Mesh && node.material) {
          const material = node.material as Material;
          const materialName = material.name as keyof typeof materials;

          // If we have a custom material defined for this mesh
          if (materials[materialName]) {
            node.material = materials[materialName];
            console.log(`Applied custom material to ${materialName}`);
          }
        }
      });
    }
  }, [model, materials]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.4; // Slower animation
    if (containerRef.current) {
      containerRef.current.rotation.y = Math.sin(time) * 0.03;
      containerRef.current.rotation.z = Math.cos(time) * 0.03;
    }
  });

  useEffect(() => {
    if (!glassRef.current) return;
    glassRef.current.scale.set(0.5, 0.5, 0.5);

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

    gsap.killTweensOf(glassRef.current.rotation);
    gsap.killTweensOf(glassRef.current.position);

    if (windowState === 'front') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
        y: -0.5,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.25,
        y: 0.05,
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
        x: 0.25,
        y: 0.05,
        z: 0,
        duration: shortTransition,
      });
    }
    if (windowState === 'between') {
      gsap.to(glassRef.current.rotation, {
        x: Math.PI / 1.5,
        y: 0,
        z: 0,
        duration: shortTransition,
      });
      gsap.to(glassRef.current.position, {
        x: 0.2,
        y: 0.05,
        z: 0,
        duration: shortTransition,
      });
    }
    if (isScroll && windowState === 'hero_vertical') {
      gsap.to(glassRef.current.rotation, {
        x: 0,
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
        y: Math.PI * 2,
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
        <primitive object={model.scene} />
      </group>
    </group>
  );
}
