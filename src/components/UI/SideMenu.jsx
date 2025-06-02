import React, { useState } from 'react';
import SideMenu from './SideMenu';

function App() {
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <SideMenu selectedId={selectedDevice} onSelect={setSelectedDevice} />
      <main className="p-8">
        <h1>Selected Device: {selectedDevice || 'None'}</h1>
        {/* Your 3D scene or other components here */}
      </main>
    </div>
  );
}
