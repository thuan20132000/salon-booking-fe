import { create } from 'zustand';
import { Salon, Technician, Service } from '../interfaces/salon';
import { SALON, SALON_TECHNICIANS, SALON_SERVICES } from '../dummy/salon';

export interface SalonState {
  selectedSalon: Salon | null;
  isLoading: boolean;
  error: string | null;
  salonTechnicians: Technician[];
  salonServices: Service[];
  
  // Actions
  setSelectedSalon: (salon: Salon | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSalonTechnicians: (technicians: Technician[]) => void;
  setSalonServices: (services: Service[]) => void;
  initSalonData: () => void;
}

export const useSalonStore = create<SalonState>((set) => ({
  // Initial state
  selectedSalon: null,
  isLoading: false,
  error: null,
  salonTechnicians: [],
  salonServices: [],
  // Actions
  setSelectedSalon: (salon) => set({ selectedSalon: salon }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSalonTechnicians: (technicians) => set({ salonTechnicians: technicians }),
  setSalonServices: (services) => set({ salonServices: services }),
  initSalonData: () => {
    set({
      selectedSalon: SALON,
      salonTechnicians: SALON_TECHNICIANS,
      salonServices: SALON_SERVICES,
      isLoading: false,
      error: null,
    });
  },
}));
