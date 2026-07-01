import {
  Color,
  DoubleSide,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
} from 'three';

/**
 * Single source of truth for the glass 3D scene.
 *
 * Everything that used to live in three separate places inside `Glas.tsx`
 * (the `stateColors` map, the `nodePositions` map, and the big if/else group
 * transform switch) is consolidated here so a "state" is fully described in
 * one object and the component just applies it.
 */

export type WindowState =
  | 'hero_vertical'
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

export type Vec3 = { x: number; y: number; z: number };

/** Model nodes we animate the *position* of. */
export const POSITION_KEYS = [
  'fluid1',
  'fluid2',
  'gas',
  'glassFrame',
  'glassMesh1',
  'glassMesh2',
] as const;
export type PositionKey = (typeof POSITION_KEYS)[number];

/** Materials we animate the *color* of. */
export const COLOR_KEYS = [
  'fluid1',
  'fluid2',
  'gas',
  'frame',
  'glassMesh1',
  'glassMesh2',
] as const;
export type ColorKey = (typeof COLOR_KEYS)[number];

/** Names of the nodes inside the GLB, mapped to our logical keys. */
export const NODE_NAMES: Record<PositionKey, string> = {
  fluid1: 'FLUID1002',
  fluid2: 'FLUID2001',
  gas: 'GAS001',
  glassFrame: 'Stablux_Knoten_1a2_GlassCube1001',
  glassMesh1: 'Stablux_Knoten_1a2_GlassCube1001_1',
  glassMesh2: 'Stablux_Knoten_1a2_GlassCube1001_2',
};

/** Transition timings (seconds) and easing shared by every tween. */
export const DURATION = { group: 1.4, node: 1.5, color: 1.5 } as const;
// NOTE: the old code used 'power.out', which is not a valid GSAP ease and
// silently fell back to the default. 'power2.out' is the intended smooth ease.
export const EASE = 'power2.out';

/** Model path — kept here so the preload and the loader stay in sync. */
export const MODEL_PATH = '/asset/glasss.glb';

interface StateVisual {
  /** Per-node position offset from the model's original position. Omitted = origin. */
  positions?: Partial<Record<PositionKey, Vec3>>;
  /** Target color per material for this state. */
  colors: Record<ColorKey, string>;
}

/**
 * The full visual description of every state. Positions default to the origin,
 * so only the handful of states that actually move a node list one.
 */
export const STATES: Record<WindowState, StateVisual> = {
  hero_vertical: {
    colors: {
      fluid1: '#f9f9f9',
      fluid2: '#f9f9f9',
      gas: '#b3ffb3',
      frame: '#f9f9f9',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
  },
  solution: {
    colors: {
      fluid1: '#ffb3b3',
      fluid2: '#ff8080',
      gas: '#b3ffb3',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
  },
  team: {
    colors: {
      fluid1: '#d9b3ff',
      fluid2: '#c299ff',
      gas: '#b3ffb3',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
  },
  front: {
    colors: {
      fluid1: '#b3ffb3',
      fluid2: '#ffffff',
      gas: '#f0f0f0',
      frame: '#ffffff',
      glassMesh1: '#fff',
      glassMesh2: '#fff',
    },
  },
  back: {
    positions: { glassMesh2: { x: 6, y: 0, z: 6 } },
    colors: {
      fluid1: '#ffffff',
      fluid2: '#b3ffb3',
      gas: '#ffffff',
      frame: '#ffffff',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
  },
  between: {
    positions: {
      fluid1: { x: 0.4, y: 0, z: 0 },
      fluid2: { x: 0.2, y: 0, z: 0 },
      glassMesh2: { x: 6, y: -12, z: 0 },
    },
    colors: {
      fluid1: '#ff6f6f',
      fluid2: '#b3ffb3',
      gas: '#ffffff',
      frame: '#ffffff',
      glassMesh1: 'lightblue',
      glassMesh2: '#ffffff',
    },
  },
  spaced: {
    colors: {
      fluid1: '#dfffdf',
      fluid2: '#b3ffb3',
      gas: '#80ff80',
      frame: '#ffffff',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
  },
  leftOutside: {
    colors: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#ffffff',
      glassMesh1: '#414141',
      glassMesh2: '#ffffff',
    },
  },
  leftInsideWarm: {
    positions: { glassMesh2: { x: 6, y: 0, z: 6 } },
    colors: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#ffffff',
      glassMesh1: '#FF6B6B',
      glassMesh2: '#ffffff',
    },
  },
  leftInsideCold: {
    positions: { glassMesh2: { x: 6, y: 0, z: 6 } },
    colors: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#f0f0f0',
      glassMesh1: '#3E78FF',
      glassMesh2: '#ffffff',
    },
  },
  leftInsideReduced: {
    colors: {
      fluid1: '#ffffff',
      fluid2: '#ffffff',
      gas: '#80ff80',
      frame: '#f0f0f0',
      glassMesh1: '#ffffff',
      glassMesh2: '#ffffff',
    },
  },
};

/**
 * Maps a nav section id (from `useNavigation`) to the glass visual state that
 * section should show. This is the single declarative source for the
 * nav-driven glass transitions, replacing the ad-hoc if/else that used to live
 * in `Glas.tsx`.
 *
 * NOTE: 'vision' and 'mission' have no dedicated visual yet, so they
 * intentionally resolve to the hero look. This makes explicit what the old code
 * did implicitly — it set `windowState` to the non-existent states 'vision' /
 * 'mission', which silently fell back to 'hero_vertical'. To give either its
 * own look, add a `STATES` entry and point it here.
 *
 * Sections not listed (e.g. 'solution', 'reference', 'contact') are either
 * driven by their own slice interactions or intentionally leave the glass as-is.
 */
export const SECTION_STATE: Record<string, WindowState> = {
  hero_vertical: 'hero_vertical',
  vision: 'hero_vertical',
  team: 'team',
  mission: 'hero_vertical',
};

/** Cache of parsed colors so we never re-instantiate the same hex each tween. */
const colorCache = new Map<string, Color>();
export function getColor(hex: string): Color {
  let c = colorCache.get(hex);
  if (!c) {
    c = new Color(hex);
    colorCache.set(hex, c);
  }
  return c;
}

export type Device = {
  isMobile: boolean;
  isTablet: boolean;
  isTabletPortrait: boolean;
  isDesktop: boolean;
};

/**
 * Resolves the glass group's target position + rotation.
 *
 * This depends on more than just `windowState` (scroll lock + the currently
 * visible section + device), so it stays a function. It is a faithful
 * transcription of the original if/else chain, just isolated and testable.
 */
export function getGroupTarget(params: {
  windowState: WindowState;
  isScroll: boolean;
  activeSection: string;
  device: Device;
}): { position: Vec3; rotation: Vec3 } {
  const { windowState, isScroll, activeSection, device } = params;
  const { isMobile, isDesktop, isTabletPortrait } = device;

  let position: Vec3 = { x: 1.25, y: 0, z: 0 };
  let rotation: Vec3 = { x: 0, y: 0, z: 0 };

  if (isScroll && windowState === 'hero_vertical') {
    position = { x: 1.25, y: 0, z: 0 };
    rotation = { x: 0, y: 0, z: 0 };
  } else if (!isScroll && windowState === 'front') {
    position = {
      x: isDesktop ? 0.25 : isMobile ? 0 : isTabletPortrait ? 0 : 0.2,
      y: isDesktop ? 0 : isMobile ? 0 : isTabletPortrait ? 0.05 : 0.1,
      z: 0,
    };
    rotation = { x: 0, y: Math.PI * 1.8, z: 0 };
  } else if (windowState === 'back') {
    position = {
      x: isDesktop ? 0.25 : isMobile ? 0 : isTabletPortrait ? 0 : 0.2,
      y: isDesktop ? 0.1 : isMobile ? 0 : 0.1,
      z: 0,
    };
    rotation = { x: 0, y: Math.PI * 1.2, z: 0 };
  } else if (windowState === 'between') {
    position = { x: isDesktop ? 0.25 : 0.1, y: 0, z: 0.2 };
    rotation = { x: 0, y: Math.PI * 1.2, z: 0 };
  } else if (isScroll && activeSection === 'mission') {
    position = { x: 1.25, y: 0, z: 0 };
    rotation = { x: 0, y: 0, z: 0 };
  } else if (
    windowState === 'leftOutside' ||
    windowState === 'leftInsideWarm' ||
    windowState === 'leftInsideCold' ||
    windowState === 'leftInsideReduced'
  ) {
    position = {
      x: isMobile ? 1.25 : isTabletPortrait ? -0.12 : -0.2,
      y: 0,
      z: 0,
    };
    if (windowState === 'leftOutside') {
      rotation = { x: 0, y: Math.PI * 1.9, z: 0 };
    } else if (
      windowState === 'leftInsideWarm' ||
      windowState === 'leftInsideCold'
    ) {
      rotation = { x: 0, y: Math.PI * 1.3, z: 0 };
    } else {
      rotation = { x: 0, y: Math.PI * 2, z: 0 };
    }
  } else if (windowState === 'spaced') {
    position = { x: isMobile ? 1.25 : 0, y: 0, z: 0 };
    rotation = { x: 0, y: Math.PI * 2, z: 0 };
  } else if (windowState === 'team') {
    position = { x: isMobile ? 1.25 : -1, y: 0, z: 0 };
    rotation = { x: 0, y: Math.PI * 2.2, z: 0 };
  }

  return { position, rotation };
}

/** Device-based initial scale for the whole glass group. */
export function getScaleForDevice(device: Device): number {
  if (device.isMobile) return 0.3;
  if (device.isTabletPortrait) return 0.25;
  if (device.isTablet) return 0.35;
  return 0.4; // desktop
}

export type Materials = ReturnType<typeof createMaterials>;
export type MaterialName = keyof Materials;

/**
 * Which custom material each renderable mesh receives, keyed by *node* name.
 *
 * Keying off the stable node name (not the material name) makes assignment
 * idempotent: the GLTF scene is cached/shared and its materials get swapped in
 * place, so re-reading `material.name` after the first pass would find our
 * unnamed custom materials and silently fail to re-capture them.
 */
export const MESH_MATERIAL: {
  node: string;
  colorKey: ColorKey;
  material: MaterialName;
}[] = [
  { node: 'FLUID1002', colorKey: 'fluid1', material: 'Glitter Gel.002' },
  { node: 'FLUID2001', colorKey: 'fluid2', material: 'Bulb Emmision Light.001' },
  { node: 'GAS001', colorKey: 'gas', material: 'Procedural volumetric gas cloud.001' },
  {
    node: 'Stablux_Knoten_1a2_GlassCube1001_1',
    colorKey: 'glassMesh1',
    material: 'Architectural Glass.001',
  },
  {
    node: 'Stablux_Knoten_1a2_GlassCube1001_2',
    colorKey: 'glassMesh2',
    material: 'Default White',
  },
];

/** Builds the custom materials applied to the model, keyed by GLB material name. */
export function createMaterials() {
  return {
    // Glass material -> the transparent shell
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
    // Light material -> inner glass layer
    'Bulb Emmision Light.001': new MeshPhysicalMaterial({
      color: new Color('#f9f9f9'),
      metalness: 0.1,
      roughness: 0.2,
      transparent: true,
      opacity: 0.3,
      side: DoubleSide,
    }),
    // Basic white material -> frame
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
}
