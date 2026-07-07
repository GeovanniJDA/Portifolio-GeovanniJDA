import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points in a sphere
  const positions = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Basic spherical distribution
      const r = 5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    // Slow rotation
    ref.current.rotation.x -= 0.0001;
    ref.current.rotation.y -= 0.0002;
    
    // Slight mouse interaction
    const pointer = state.pointer;
    ref.current.rotation.x += (pointer.y * 0.05 - ref.current.rotation.x) * 0.01;
    ref.current.rotation.y += (pointer.x * 0.05 - ref.current.rotation.y) * 0.01;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a3e635" // neon lime color
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function Background3D() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null; // Don't render WebGL if reduced motion is preferred
  }

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
