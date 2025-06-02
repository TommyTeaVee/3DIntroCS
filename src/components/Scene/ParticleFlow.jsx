import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleFlow({ path, color, targetId, onHit }) {
  const sphereRef = useRef();
  const pulseTriggerRef = useRef(false);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.5) % path.length;
    const i = Math.floor(t);
    const alpha = t - i;

    const current = path[i % path.length];
    const next = path[(i + 1) % path.length];

    const x = current[0] + (next[0] - current[0]) * alpha;
    const y = current[1] + (next[1] - current[1]) * alpha;
    const z = current[2] + (next[2] - current[2]) * alpha;

    if (sphereRef.current) {
      sphereRef.current.position.set(x, y, z);
    }

    // Trigger pulse on arrival near target (last point)
    const end = path[path.length - 1];
    const dist = new THREE.Vector3(...end).distanceTo(new THREE.Vector3(x, y, z));
    if (dist < 0.2 && !pulseTriggerRef.current) {
      onHit(targetId);
      pulseTriggerRef.current = true;
      setTimeout(() => {
        pulseTriggerRef.current = false;
      }, 1000);
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} />
    </mesh>
  );
}
