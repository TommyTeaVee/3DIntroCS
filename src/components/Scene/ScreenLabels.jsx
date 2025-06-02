import React, { useState, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScreenLabels({ labels = [] }) {
  const { camera, gl } = useThree();
  const [positions, setPositions] = useState({});

  useFrame(() => {
  if (!labels?.length) return;

  const updated = {};
  let changed = false;

  labels.forEach(({ id, ref }) => {
    if (!ref?.current) return;
    const vector = new THREE.Vector3();
    ref.current.getWorldPosition(vector);
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * gl.domElement.clientWidth;
    const y = (-vector.y * 0.5 + 0.5) * gl.domElement.clientHeight;

    const current = positions[id];
    if (!current || current.x !== x || current.y !== y) {
      changed = true;
    }

    updated[id] = { x, y };
  });

  if (changed) {
    setPositions(updated);
  }
});


  return (
    <>
      {labels.map(({ id, label }) => {
        const pos = positions[id];
        if (!pos) return null;
        return (
          <div
            key={id}
            style={{ position: 'absolute', top: pos.y, left: pos.x, transform: 'translate(-50%, -50%)' }}
            className="pointer-events-none select-none bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs"
          >
            {label}
          </div>
        );
      })}
    </>
  );
}


