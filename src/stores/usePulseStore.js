import { create } from 'zustand';
import * as THREE from 'three';

export const usePulseStore = create((set, get) => ({
  refs: new Map(),

  registerRef: (id, ref) => {
    const refs = get().refs;
    refs.set(id, ref);
    set({ refs }); // Trigger reactivity if needed
  },

  handlePulse: (id) => {
    const target = get().refs.get(id);
    if (!target) return;

    // Traverse meshes to emit pulse effect
    target.traverse((child) => {
      if (child.isMesh && child.material) {
        const original = child.material.emissive.clone();
        child.material.emissive.setRGB(1, 1, 1);
        setTimeout(() => {
          child.material.emissive.copy(original);
        }, 300);
      }
    });
  },

  getAllRefs: () => {
    return get().refs;
  },
}));

export default usePulseStore;
