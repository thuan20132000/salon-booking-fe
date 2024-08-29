
import { serviceAPI } from '@/apis/serviceAPI';
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import { create } from 'zustand';

export type ServiceStore = {
  services: NailServiceType[];
  serviceCategories: NailServiceCategoryType[];
  addService: (service: NailServiceType) => void;
  removeService: (id: number) => void;
  updateService: (service: NailServiceType) => void;
  getServices: () => Promise<void>;
  getServiceCategories: () => Promise<void>;
};


export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  serviceCategories: [],
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  removeService: (id) => set((state) => ({ services: state.services.filter(service => service.id !== id) })),
  updateService: (updatedService) => set((state) => ({
    services: state.services.map(service => service.id === updatedService.id ? updatedService : service)
  })),
  getServices: async () => {
    const data = await serviceAPI.getServices();
    console.log('getServices: ', data);
    set({ services: data });
  },
  getServiceCategories: async () => {
    const data = await serviceAPI.getServiceCategories();
    console.log('getServiceCategories: ', data);
    set({ serviceCategories: data });
  }

}));