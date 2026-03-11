import { create } from 'zustand';

const useThreatStore = create((set) => ({
  threats: [],
  selectedCountry: null,
  isConnected: false,
  
  addThreat: (threat) => set((state) => {
    // Keep only the last 500 threats to prevent memory issues
    const newThreats = [threat, ...state.threats].slice(0, 500);
    return { threats: newThreats };
  }),
  
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setConnectionStatus: (status) => set({ isConnected: status }),
}));

export default useThreatStore;
