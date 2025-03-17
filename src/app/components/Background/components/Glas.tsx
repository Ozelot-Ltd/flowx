'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import {
  Object3D,
  MeshStandardMaterial,
  MeshPhysicalMaterial,
  DoubleSide,
  Color,
  Mesh,
  Material,
  Group,
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
const colorTransition = 1.5; // Duration for color transitions

// Helper to track the previous state to prevent redundant animations
const usePrevious = <T,>(value: T) => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

type WindowState =
  | 'hero_vertical'
  | 'vision'
  | 'solution'
  | 'team'
  | 'front'
  | 'back'
  | 'between'
  | 'spaced'
  | 'leftOutside'
  | 'leftInsideWarm'
  | 'leftInsideCold'
  | 'leftInsideReduced';

export default function Glass() {
  const containerRef = useRef<Object3D>(null);
  const glassRef = useRef<Object3D>(null);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (glassRef.current && !initialized) {
      // Set initial position far outside the window
      gsap.set(glassRef.current.position, {
        x: 1.5, // Far right (off-screen)
        y: 0,
        z: 0,
      });
      setInitialized(true);
    }
  }, [initialized]);

  // Refs for specific model nodes
  const fluid1Ref = useRef<Mesh | null>(null);
  const fluid2Ref = useRef<Mesh | null>(null);
  const gasRef = useRef<Mesh | null>(null);
  const glassFrameRef = useRef<Group | null>(null);
  const glassMesh1Ref = useRef<Mesh | null>(null);
  const glassMesh2Ref = useRef<Mesh | null>(null);

  // Material references for color changes
  const fluid1MaterialRef = useRef<
    MeshStandardMaterial | MeshPhysicalMaterial | null
  >(null);
  const fluid2MaterialRef = useRef<
    MeshStandardMaterial | MeshPhysicalMaterial | null
  >(null);
  const gasMaterialRef = useRef<
    MeshStandardMaterial | MeshPhysicalMaterial | null
  >(null);
  const glassMesh1MaterialRef = useRef<
    MeshStandardMaterial | MeshPhysicalMaterial | null
  >(null);
  const glassMesh2MaterialRef = useRef<
    MeshStandardMaterial | MeshPhysicalMaterial | null
  >(null);
  const frameMaterialRef = useRef<
    MeshStandardMaterial | MeshPhysicalMaterial | null
  >(null);

  // Track if nodes are loaded
  const [nodesLoaded, setNodesLoaded] = useState(false);

  // Track animation in progress to prevent overlapping animations
  const animating = useRef(false);

  const model = useLoader(GLTFLoader, '/asset/glasss.glb');

  const { windowState, setWindowState } = useWindowStore();
  const { isScroll } = useScrollStore();
  const { activeSection } = useNavigation();
  const { isMobile, isDesktop, isTablet } = useMobile();

  // Track previous states to prevent redundant animations
  const prevWindowState = usePrevious(windowState);
  const prevActiveSection = usePrevious(activeSection);
  const prevIsScroll = usePrevious(isScroll);

  // Color mapping for each material in each state
  const stateColors: Record<
    WindowState,
    {
      fluid1: string;
      fluid2: string;
      gas: string;
      frame: string;
      glassMesh1: string;
      glassMesh2: string;
    }
  > = {
    hero_vertical: {
      fluid1: '#f9f9f9',
      fluid2: '#f9f9f9',
      gas: '#b3ffb3',
      frame: '#f9f9f9',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
    vision: {
      fluid1: '#b3e0ff',
      fluid2: '#80d4ff',
      gas: '#b3ffb3',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
    solution: {
      fluid1: '#ffb3b3',
      fluid2: '#ff8080',
      gas: '#b3ffb3',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
    team: {
      fluid1: '#d9b3ff',
      fluid2: '#c299ff',
      gas: '#b3ffb3',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
    front: {
      fluid1: '#b3ffb3',
      fluid2: '#ffffff',
      gas: '#f0f0f0',
      frame: '#fff',
      glassMesh1: '#fff',
      glassMesh2: '#f0f0f0',
    },
    back: {
      fluid1: '#ffffff',
      fluid2: '#b3ffb3',
      gas: '#ffffff',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
    between: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#b3ffb3',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
    spaced: {
      fluid1: '#dfffdf',
      fluid2: '#b3ffb3',
      gas: '#80ff80',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
    leftOutside: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#f0f0f0',
      glassMesh1: '#414141',
      glassMesh2: '#ffffff',
    },
    leftInsideWarm: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#f0f0f0',
      glassMesh1: '#FF6B6B',
      glassMesh2: '#ffffff',
    },
    leftInsideCold: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#f0f0f0',
      glassMesh1: '#57C2FB',
      glassMesh2: '#ffffff',
    },
    leftInsideReduced: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
  };

  // Create custom materials
  const materials = useMemo(() => {
    return {
      // Glass material
      'Architectural Glass.001': new MeshPhysicalMaterial({
        transparent: true,
        opacity: 0.1,
        color: new Color('#ffffff'),
        metalness: 0.1,
        roughness: 0.1,
        transmission: 1,
        thickness: 0.1,
        ior: 1.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),

      // Light material --> inner glass layer
      'Bulb Emmision Light.001': new MeshPhysicalMaterial({
        color: new Color('#f9f9f9'),
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.3,
        side: DoubleSide,
      }),

      // Basic white material --> frame
      'Default White': new MeshStandardMaterial({
        color: new Color('#f9f9f9'),
        roughness: 0.5,
        metalness: 0.1,
      }),

      // Glitter material -> outer glass layer
      'Glitter Gel.002': new MeshPhysicalMaterial({
        color: new Color('#f9f9f9'),
        metalness: 0.1,
        roughness: 0.3,
        transparent: true,
        opacity: 0.3,
      }),

      // Gas cloud material -> gas layer
      'Procedural volumetric gas cloud.001': new MeshStandardMaterial({
        color: new Color('lightgreen'),
        transparent: true,
        opacity: 0.2,
        side: DoubleSide,
        metalness: 0.1,
        roughness: 0.1,
      }),
    };
  }, []);

  // Function to get nodes by name from the model
  const getNodeByName = (name: string) => {
    let foundNode = null;
    if (model && model.scene) {
      model.scene.traverse((node) => {
        if (node.name === name) {
          foundNode = node;
        }
      });
    }
    return foundNode;
  };

  // Apply materials to the model and get references to specific nodes
  useEffect(() => {
    if (model && model.scene) {
      // Store references to specific nodes
      fluid1Ref.current = getNodeByName('FLUID1002');
      fluid2Ref.current = getNodeByName('FLUID2001');
      gasRef.current = getNodeByName('GAS001');
      glassFrameRef.current = getNodeByName('Stablux_Knoten_1a2_GlassCube1001');
      glassMesh1Ref.current = getNodeByName(
        'Stablux_Knoten_1a2_GlassCube1001_1'
      );
      glassMesh2Ref.current = getNodeByName(
        'Stablux_Knoten_1a2_GlassCube1001_2'
      );

      // Apply materials to nodes and store material references
      model.scene.traverse((node) => {
        if (node instanceof Mesh && node.material) {
          const material = node.material as Material;
          const materialName = material.name as keyof typeof materials;

          if (materials[materialName]) {
            node.material = materials[materialName];

            // Store material references for color changes
            if (node.name === 'FLUID1002') {
              fluid1MaterialRef.current = node.material as
                | MeshStandardMaterial
                | MeshPhysicalMaterial;
            } else if (node.name === 'FLUID2001') {
              fluid2MaterialRef.current = node.material as
                | MeshStandardMaterial
                | MeshPhysicalMaterial;
            } else if (node.name === 'GAS001') {
              gasMaterialRef.current = node.material as
                | MeshStandardMaterial
                | MeshPhysicalMaterial;
            } else if (node.name === 'Stablux_Knoten_1a2_GlassCube1001_1') {
              glassMesh1MaterialRef.current = node.material as
                | MeshStandardMaterial
                | MeshPhysicalMaterial;
            } else if (node.name === 'Stablux_Knoten_1a2_GlassCube1001_2') {
              glassMesh2MaterialRef.current = node.material as
                | MeshStandardMaterial
                | MeshPhysicalMaterial;
            } else if (
              node.parent &&
              node.parent.name === 'Stablux_Knoten_1a2_GlassCube1001'
            ) {
              frameMaterialRef.current = node.material as
                | MeshStandardMaterial
                | MeshPhysicalMaterial;
            }
          }
        }
      });

      setNodesLoaded(true);
    }
  }, [model, materials]);

  // Function to adjust node positions based on state
  const adjustNodePositions = (
    state: WindowState = windowState as WindowState
  ) => {
    // Define position adjustments for each node based on state
    const nodePositions: Record<
      WindowState,
      {
        fluid1: { x: number; y: number; z: number };
        fluid2: { x: number; y: number; z: number };
        gas: { x: number; y: number; z: number };
        glassFrame: { x: number; y: number; z: number };
        glassMesh1: { x: number; y: number; z: number };
        glassMesh2: { x: number; y: number; z: number };
      }
    > = {
      hero_vertical: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
      vision: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
      solution: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
      team: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
      front: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
      back: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 6, y: 0, z: 6 },
      },
      between: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 6, y: -8, z: 0 },
      },
      spaced: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
      leftOutside: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: -0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
      leftInsideWarm: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: 0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 12, y: 0, z: 0 },
      },
      leftInsideCold: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: -0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 12, y: 0, z: 0 },
      },
      leftInsideReduced: {
        fluid1: { x: 0, y: 0, z: 0 },
        fluid2: { x: -0, y: 0, z: 0 },
        gas: { x: 0, y: 0, z: 0 },
        glassFrame: { x: 0, y: 0, z: 0 },
        glassMesh1: { x: 0, y: 0, z: 0 },
        glassMesh2: { x: 0, y: 0, z: 0 },
      },
    };

    // Get positions for current state or default to hero_vertical
    const positions = nodePositions[state] || nodePositions['hero_vertical'];

    // Apply positions to each node
    if (fluid1Ref.current && positions.fluid1) {
      const originalPos = fluid1Ref.current.userData.originalPosition || {
        x: fluid1Ref.current.position.x,
        y: fluid1Ref.current.position.y,
        z: fluid1Ref.current.position.z,
      };

      if (!fluid1Ref.current.userData.originalPosition) {
        fluid1Ref.current.userData.originalPosition = { ...originalPos };
      }

      gsap.to(fluid1Ref.current.position, {
        x: originalPos.x + positions.fluid1.x,
        y: originalPos.y + positions.fluid1.y,
        z: originalPos.z + positions.fluid1.z,
        duration: 1.5,
      });
    }

    if (fluid2Ref.current && positions.fluid2) {
      const originalPos = fluid2Ref.current.userData.originalPosition || {
        x: fluid2Ref.current.position.x,
        y: fluid2Ref.current.position.y,
        z: fluid2Ref.current.position.z,
      };

      if (!fluid2Ref.current.userData.originalPosition) {
        fluid2Ref.current.userData.originalPosition = { ...originalPos };
      }

      gsap.to(fluid2Ref.current.position, {
        x: originalPos.x + positions.fluid2.x,
        y: originalPos.y + positions.fluid2.y,
        z: originalPos.z + positions.fluid2.z,
        duration: 1.5,
      });
    }

    if (gasRef.current && positions.gas) {
      const originalPos = gasRef.current.userData.originalPosition || {
        x: gasRef.current.position.x,
        y: gasRef.current.position.y,
        z: gasRef.current.position.z,
      };

      if (!gasRef.current.userData.originalPosition) {
        gasRef.current.userData.originalPosition = { ...originalPos };
      }

      gsap.to(gasRef.current.position, {
        x: originalPos.x + positions.gas.x,
        y: originalPos.y + positions.gas.y,
        z: originalPos.z + positions.gas.z,
        duration: 1.5,
      });
    }

    if (glassFrameRef.current && positions.glassFrame) {
      const originalPos = glassFrameRef.current.userData.originalPosition || {
        x: glassFrameRef.current.position.x,
        y: glassFrameRef.current.position.y,
        z: glassFrameRef.current.position.z,
      };

      if (!glassFrameRef.current.userData.originalPosition) {
        glassFrameRef.current.userData.originalPosition = { ...originalPos };
      }

      gsap.to(glassFrameRef.current.position, {
        x: originalPos.x + positions.glassFrame.x,
        y: originalPos.y + positions.glassFrame.y,
        z: originalPos.z + positions.glassFrame.z,
        duration: 1.5,
      });
    }

    if (glassMesh1Ref.current && positions.glassMesh1) {
      const originalPos = glassMesh1Ref.current.userData.originalPosition || {
        x: glassMesh1Ref.current.position.x,
        y: glassMesh1Ref.current.position.y,
        z: glassMesh1Ref.current.position.z,
      };

      if (!glassMesh1Ref.current.userData.originalPosition) {
        glassMesh1Ref.current.userData.originalPosition = { ...originalPos };
      }

      gsap.to(glassMesh1Ref.current.position, {
        x: originalPos.x + positions.glassMesh1.x,
        y: originalPos.y + positions.glassMesh1.y,
        z: originalPos.z + positions.glassMesh1.z,
        duration: 1.5,
      });
    }

    if (glassMesh2Ref.current && positions.glassMesh2) {
      const originalPos = glassMesh2Ref.current.userData.originalPosition || {
        x: glassMesh2Ref.current.position.x,
        y: glassMesh2Ref.current.position.y,
        z: glassMesh2Ref.current.position.z,
      };

      if (!glassMesh2Ref.current.userData.originalPosition) {
        glassMesh2Ref.current.userData.originalPosition = { ...originalPos };
      }

      gsap.to(glassMesh2Ref.current.position, {
        x: originalPos.x + positions.glassMesh2.x,
        y: originalPos.y + positions.glassMesh2.y,
        z: originalPos.z + positions.glassMesh2.z,
        duration: 1.5,
      });
    }
  };

  // Function to adjust material colors based on state
  const adjustMaterialColors = (
    state: WindowState = windowState as WindowState
  ) => {
    // Get colors for current state
    const colors = stateColors[state] || stateColors['hero_vertical'];

    // Apply color to FLUID1002
    if (fluid1MaterialRef.current) {
      gsap.to(fluid1MaterialRef.current.color, {
        r: new Color(colors.fluid1).r,
        g: new Color(colors.fluid1).g,
        b: new Color(colors.fluid1).b,
        duration: colorTransition,
        onUpdate: () => {
          if (fluid1MaterialRef.current) {
            fluid1MaterialRef.current.needsUpdate = true;
          }
        },
      });
    }

    // Apply color to FLUID2001
    if (fluid2MaterialRef.current) {
      gsap.to(fluid2MaterialRef.current.color, {
        r: new Color(colors.fluid2).r,
        g: new Color(colors.fluid2).g,
        b: new Color(colors.fluid2).b,
        duration: colorTransition,
        onUpdate: () => {
          if (fluid2MaterialRef.current) {
            fluid2MaterialRef.current.needsUpdate = true;
          }
        },
      });
    }

    // Apply color to GAS001
    if (gasMaterialRef.current) {
      gsap.to(gasMaterialRef.current.color, {
        r: new Color(colors.gas).r,
        g: new Color(colors.gas).g,
        b: new Color(colors.gas).b,
        duration: colorTransition,
        onUpdate: () => {
          if (gasMaterialRef.current) {
            gasMaterialRef.current.needsUpdate = true;
          }
        },
      });
    }

    // Apply color to glass mesh 1
    if (glassMesh1MaterialRef.current) {
      gsap.to(glassMesh1MaterialRef.current.color, {
        r: new Color(colors.glassMesh1).r,
        g: new Color(colors.glassMesh1).g,
        b: new Color(colors.glassMesh1).b,
        duration: colorTransition,
        onUpdate: () => {
          if (glassMesh1MaterialRef.current) {
            glassMesh1MaterialRef.current.needsUpdate = true;
          }
        },
      });
    }

    // Apply color to glass mesh 2
    if (glassMesh2MaterialRef.current) {
      gsap.to(glassMesh2MaterialRef.current.color, {
        r: new Color(colors.glassMesh2).r,
        g: new Color(colors.glassMesh2).g,
        b: new Color(colors.glassMesh2).b,
        duration: colorTransition,
        onUpdate: () => {
          if (glassMesh2MaterialRef.current) {
            glassMesh2MaterialRef.current.needsUpdate = true;
          }
        },
      });
    }

    // Apply color to frame
    if (frameMaterialRef.current) {
      gsap.to(frameMaterialRef.current.color, {
        r: new Color(colors.frame).r,
        g: new Color(colors.frame).g,
        b: new Color(colors.frame).b,
        duration: colorTransition,
        onUpdate: () => {
          if (frameMaterialRef.current) {
            frameMaterialRef.current.needsUpdate = true;
          }
        },
      });
    }
  };

  // Apply node position and color adjustments when loaded
  useEffect(() => {
    if (nodesLoaded) {
      // Store original positions
      if (fluid1Ref.current && !fluid1Ref.current.userData.originalPosition) {
        fluid1Ref.current.userData.originalPosition = {
          x: fluid1Ref.current.position.x,
          y: fluid1Ref.current.position.y,
          z: fluid1Ref.current.position.z,
        };
      }

      if (fluid2Ref.current && !fluid2Ref.current.userData.originalPosition) {
        fluid2Ref.current.userData.originalPosition = {
          x: fluid2Ref.current.position.x,
          y: fluid2Ref.current.position.y,
          z: fluid2Ref.current.position.z,
        };
      }

      if (gasRef.current && !gasRef.current.userData.originalPosition) {
        gasRef.current.userData.originalPosition = {
          x: gasRef.current.position.x,
          y: gasRef.current.position.y,
          z: gasRef.current.position.z,
        };
      }

      // Apply initial positions and colors based on current state
      adjustNodePositions(windowState as WindowState);
      adjustMaterialColors(windowState as WindowState);
    }
  }, [nodesLoaded, windowState]);

  // Update node positions and colors when windowState changes
  useEffect(() => {
    if (nodesLoaded && windowState !== prevWindowState) {
      adjustNodePositions(windowState as WindowState);
      adjustMaterialColors(windowState as WindowState);
    }
  }, [windowState, nodesLoaded, prevWindowState]);

  // Subtle floating movement
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * 0.4; // Slower animation
    if (containerRef.current) {
      containerRef.current.rotation.y = Math.sin(time) * 0.03;
      containerRef.current.rotation.z = Math.cos(time) * 0.03;
    }
  });

  // Handle section-based state changes but prevent excessive re-renders
  useEffect(() => {
    if (!glassRef.current) return;

    // Set initial scale only once
    if (isDesktop && !glassRef.current.userData.initialized) {
      glassRef.current.scale.set(0.4, 0.4, 0.4);
      glassRef.current.userData.initialized = true;
    } else if (isMobile && !glassRef.current.userData.initialized) {
      glassRef.current.scale.set(0.3, 0.3, 0.3);
      glassRef.current.userData.initialized = true;
    } else if (isTablet && !glassRef.current.userData.initialized) {
      glassRef.current.scale.set(0.35, 0.35, 0.35);
      glassRef.current.userData.initialized = true;
    }

    // Only update state if there's an actual change to avoid triggering animations
    const needsUpdate =
      isScroll !== prevIsScroll || activeSection !== prevActiveSection;

    if (!needsUpdate) return;

    if (isScroll === true && activeSection === 'hero_vertical') {
      setWindowState('hero_vertical');
    }
    if (activeSection === 'vision') {
      setWindowState('vision');
    }
    if (activeSection === 'team') {
      setWindowState('team');
    }
    if (activeSection === 'mission') {
      setWindowState('mission');
    }
  }, [
    isScroll,
    activeSection,
    setWindowState,
    isMobile,
    prevIsScroll,
    prevActiveSection,
    isDesktop,
    isTablet,
  ]);

  useEffect(() => {
    console.log(windowState);
  }, [windowState]);

  // Initial position setup
  // Handle animations based on state changes
  useGSAP(() => {
    if (!glassRef.current || !initialized) return;

    // Skip if no state change or if animation is in progress
    if (windowState === prevWindowState && !animating.current) return;

    // Prevent animation stacking
    if (animating.current) {
      gsap.killTweensOf(glassRef.current.rotation);
      gsap.killTweensOf(glassRef.current.position);

      // Kill any node-specific animations
      if (fluid1Ref.current) gsap.killTweensOf(fluid1Ref.current.position);
      if (fluid2Ref.current) gsap.killTweensOf(fluid2Ref.current.position);
      if (gasRef.current) gsap.killTweensOf(gasRef.current.position);
      if (glassFrameRef.current)
        gsap.killTweensOf(glassFrameRef.current.position);
      if (glassMesh1Ref.current)
        gsap.killTweensOf(glassMesh1Ref.current.position);
      if (glassMesh2Ref.current)
        gsap.killTweensOf(glassMesh2Ref.current.position);

      // Kill color transitions
      if (fluid1MaterialRef.current)
        gsap.killTweensOf(fluid1MaterialRef.current.color);
      if (fluid2MaterialRef.current)
        gsap.killTweensOf(fluid2MaterialRef.current.color);
      if (gasMaterialRef.current)
        gsap.killTweensOf(gasMaterialRef.current.color);
      if (glassMesh1MaterialRef.current)
        gsap.killTweensOf(glassMesh1MaterialRef.current.color);
      if (glassMesh2MaterialRef.current)
        gsap.killTweensOf(glassMesh2MaterialRef.current.color);
      if (frameMaterialRef.current)
        gsap.killTweensOf(frameMaterialRef.current.color);
    }

    animating.current = true;

    // Create onComplete callback to mark when animation is done
    const onComplete = () => {
      animating.current = false;
    };

    // Get transition duration based on state
    const duration = windowState === 'team' ? longTransition : shortTransition;

    // Create a timeline for the animations
    const tl = gsap.timeline({
      onComplete,
      defaults: { duration, ease: 'power.out' },
    });

    // Define position and rotation based on state
    let targetPosition = { x: 1.2, y: 0, z: 0 };
    let targetRotation = { x: 0, y: 0, z: 0 };

    // Set target position and rotation based on windowState
    if (isScroll && windowState === 'hero_vertical') {
      targetPosition = { x: 1.25, y: 0, z: 0 };
      targetRotation = { x: 0, y: 0, z: 0 };
    } else if (!isScroll && windowState === 'front') {
      targetPosition = {
        x: isDesktop ? 0.25 : isMobile ? 0 : 0.2,
        y: isDesktop ? 0 : isMobile ? 0 : 0.1,
        z: 0,
      };
      targetRotation = { x: 0, y: -1.3, z: 0 };
    } else if (windowState === 'back') {
      targetPosition = {
        x: isDesktop ? 0.25 : isMobile ? 0 : 0.2,
        y: isDesktop ? 0 : isMobile ? 0 : 0.1,
        z: 0,
      };
      targetRotation = { x: 0, y: -2.6, z: 0 };
    } else if (windowState === 'between') {
      targetPosition = {
        x: isDesktop ? 0.2 : isMobile ? 0.1 : 0.2,
        y: 0,
        z: 0.2,
      };
      targetRotation = { x: Math.PI / 1.8, y: 0, z: 0.3 };
    } else if (isScroll && activeSection === 'mission') {
      targetPosition = { x: 1.1, y: 0, z: 0 };
      targetRotation = { x: 0, y: 0, z: 0 };
    } else if (
      [
        'leftOutside',
        'leftInsideWarm',
        'leftInsideCold',
        'leftInsideReduced',
      ].includes(windowState)
    ) {
      targetPosition = { x: -0.2, y: 0, z: 0 };

      // Each of these states has a different rotation
      if (windowState === 'leftOutside') {
        targetRotation = { x: 0, y: Math.PI * 1.9, z: 0 };
      } else if (
        windowState === 'leftInsideWarm' ||
        windowState === 'leftInsideCold'
      ) {
        targetRotation = { x: 0, y: Math.PI * 1.3, z: 0 };
      } else if (windowState === 'leftInsideReduced') {
        targetRotation = { x: 0, y: Math.PI * 2, z: 0 };
      }
    } else if (windowState === 'spaced') {
      targetPosition = { x: 0, y: 0, z: 0 };
      targetRotation = { x: 0, y: Math.PI * 2, z: 0 };
    } else if (windowState === 'team') {
      targetPosition = { x: -1, y: 0, z: 0 };
      targetRotation = { x: 0, y: Math.PI * 2.2, z: 0 };
    }

    // Add animations to the timeline
    tl.to(
      glassRef.current.position,
      {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
      },
      0
    ); // Start at 0

    tl.to(
      glassRef.current.rotation,
      {
        x: targetRotation.x,
        y: targetRotation.y,
        z: targetRotation.z,
      },
      0
    ); // Start at 0

    // Apply material color changes in parallel
    adjustMaterialColors(windowState as WindowState);

    // Apply node position changes in parallel
    adjustNodePositions(windowState as WindowState);
  }, [isScroll, windowState, activeSection, prevWindowState, initialized]);

  return (
    <group ref={containerRef}>
      <group ref={glassRef}>
        <primitive object={model.scene} />
      </group>
    </group>
  );
}
