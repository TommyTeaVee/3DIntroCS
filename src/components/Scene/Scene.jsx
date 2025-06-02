import React, { useRef } from 'react';
import { usePulseStore } from '../../stores/usePulseStore'; 
import Mainboard from './Mainboard';
import CPU from './CPU';
import RAM from './RAM';
import HardDrive from './HardDrive';
import Monitor from './Monitor';
import Model from './Model';
import ParticleFlow from './ParticleFlow';
import ScreenLabels from './ScreenLabels';

import { CORE_DEVICES, DEVICE_CONFIG } from '../../data/devices'; 

export default function Scene({ wireframe }) {
  const { handlePulse, registerRef } = usePulseStore();
  const pulseRefs = useRef(new Map());
  const labels = useRef([]);

  const register = (id) => (ref) => {
    if (ref) {
      pulseRefs.current.set(id, ref);
      const exists = labels.current.find((item) => item.id === id);
      if (!exists) {
        labels.current.push({ id, label: id.toUpperCase(), ref });
      }
      registerRef(id, ref); // optional usage
    }
  };

  return (
    <>
      <Mainboard
        position={[0.5, -1.2, 0]}
        scale={[-1.8, 1.8, 1.8]}
        wireframe={wireframe}
        onPulse={register('motherboard')}
      />
      <CPU
        position={CORE_DEVICES.cpu.position}
        scale={[0.6, 0.6, 0.6]}
        wireframe={wireframe}
        onPulse={register('cpu')}
      />
      <RAM
        position={CORE_DEVICES.ram.position}
        scale={[45, 45, 45]}
        rotation={[-1.7, Math.PI, 0]}
        wireframe={wireframe}
        onPulse={register('ram')}
      />
      <HardDrive
        position={CORE_DEVICES.hard_drive.position}
        scale={[50, 50, 50]}
        rotation={[-5.5, Math.PI / 1.3, 0]}
        wireframe={wireframe}
        onPulse={register('hard_drive')}
      />
      <Monitor
        position={CORE_DEVICES.monitor.position}
        scale={[200, 200, 200]}
        wireframe={wireframe}
        onPulse={register('monitor')}
      />

      {DEVICE_CONFIG.map(({ id, path, position, color }) => (
        <React.Fragment key={id}>
          <Model
            id={id}
            path={path}
            position={position}
            scale={[1, 1, 1]}
            wireframe={wireframe}
            onPulse={register(id)}
          />
          <ParticleFlow
            color={color}
            path={[
              position,
              CORE_DEVICES.ram.position,
              CORE_DEVICES.cpu.position,
              CORE_DEVICES.monitor.position,
            ]}
            targetId="monitor"
            onHit={handlePulse}
          />
        </React.Fragment>
      ))}

      <ScreenLabels labels={labels.current} />
    </>
  );
}
 