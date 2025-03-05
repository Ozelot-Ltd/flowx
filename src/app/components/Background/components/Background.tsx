'use client';

import { useTexture } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Vector2, Mesh } from 'three';

export default function Background({
  url,
  opacity = 2.5,
  parallaxStrength = 0.03,
}: {
  url: string;
  opacity?: number;
  parallaxStrength?: number;
}) {
  const texture = useTexture(url);
  const { viewport } = useThree();
  const meshRef = useRef<Mesh>(null);
  const [mousePosition] = useState(new Vector2(0, 0));

  // Track mouse movement
  useFrame(({ mouse }) => {
    if (!meshRef.current) return;

    // Convert mouse position to -1 to 1 range
    mousePosition.x = mouse.x * 2 - 1;
    mousePosition.y = mouse.y * 2 - 1;

    // Smooth movement with lerp
    meshRef.current.position.x =
      -mousePosition.x * parallaxStrength * viewport.width;
    meshRef.current.position.y =
      mousePosition.y * parallaxStrength * viewport.height;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
      <meshBasicMaterial map={texture} transparent={true} opacity={opacity} />
    </mesh>
  );
}
