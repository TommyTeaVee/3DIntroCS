export const DEVICE_CONFIG = [
  { id: 'keyboard', label: 'Keyboard', path: '/proxy-models/assets/models/keyboard.glb', position: [0, -1.1, 20], color: 'cyan', description: 'Input device for typing.' },
  { id: 'mouse', label: 'Mouse', path: '/proxy-models/assets/models/mouse.glb', position: [21, -1.0, 18], color: 'magenta', description: 'Pointing device for interaction.' },
];

export const CORE_DEVICES = {
  ram: { id: 'ram', label: 'RAM', position: [-2.8, 1, 4.5], description: 'Random Access Memory.' },
  cpu: { id: 'cpu', label: 'CPU', position: [-2.5, 1, 0.7], description: 'Central Processing Unit.' },
  hard_drive: { id: 'hard_drive', label: 'Hard Drive', position: [21, -1.0, 3], description: 'Storage device.' },
  monitor: { id: 'monitor', label: 'Monitor', position: [300, 200, 20], description: 'Output display.' },
  motherboard: { id: 'motherboard', label: 'Motherboard', position: [0.5, -1.2, 0], description: 'Mainboard connecting all components.' },
};
