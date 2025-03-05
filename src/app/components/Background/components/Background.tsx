'use client';

import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

export default function Background({
  url,
  opacity = 3.5,
}: {
  url: string;
  opacity?: number;
}) {
  const texture = useTexture(url);
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
      <meshBasicMaterial map={texture} transparent={true} opacity={opacity} />
    </mesh>
  );
}
