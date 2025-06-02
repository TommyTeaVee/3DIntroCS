import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Mainboard({ position = [0, 0, 0], scale = [1, 1, 1], wireframe = false, onPulse }) {
  const { scene } = useGLTF('/proxy-models/assets/models/motherboard.glb');
  const meshRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.wireframe = wireframe;
        child.material.emissiveIntensity = 1;
      }
    });
  }, [scene, wireframe]);

  useEffect(() => {
    if (meshRef.current && onPulse) {
      onPulse(meshRef.current);
    }
  }, [onPulse]);

  return <primitive object={scene} position={position} scale={scale} ref={meshRef} />;
}
