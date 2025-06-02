import React, { useState } from 'react';


import Scene from './Scene/Scene';
import ScreenLabels from '../components/Scene/ScreenLabels';
import DeviceMenu from '../components/UI/DeviceMenu';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Sphere } from "@react-three/drei";
export default function App() {
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white overflow-hidden">
      {/* Canvas 3D Area */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 3, 12], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          <Scene wireframe={wireframe} />
      

        <ScreenLabels />
         </Canvas>
          <button
          onClick={() => setWireframe(!wireframe)}
          className="absolute top-4 left-4 px-3 py-2 bg-black bg-opacity-60 border border-white rounded text-sm"
        >
          {wireframe ? 'Disable Wireframe' : 'Enable Wireframe'}
        </button>
      </div>

      {/* Side Menu */}
      <DeviceMenu />
    
    </div>
  );
}
