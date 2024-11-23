
import { serviceAPI } from '@/apis/serviceAPI';
import { AppointmentServiceType } from '@/types/appointment';
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
  selectedServices?: NailServiceType[];
  setSelectedServices?: (services: NailServiceType[]) => void;
  appointmentServices?: NailServiceType[];
  setAppointmentServices: (services: NailServiceType[]) => void;
  addAppointmentService?: (service: NailServiceType) => void;
  resetServices?: () => void;
  salonCategories: NailServiceCategoryType[];
  getSalonCategoryServices: (salon_id: number) => Promise<void>;
  handleVisibleCategory: (category_id: number) => void;
};


export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  salonCategories: [],
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
  },
  selectedServices: [],
  setSelectedServices: (services) => set({ selectedServices: services }),
  appointmentServices: [],
  setAppointmentServices: (services) => set({ appointmentServices: services }),
  getSalonCategoryServices: async (salon_id: number) => {
    let data = await serviceAPI.getSalonCategoryServices(salon_id);
    console.log('getSalonCategoryServices: ', data);
    data = data.map((category) => {
      return {
        ...category,
        is_visible: true
      }
    })
    set({ salonCategories: data });
  },
  handleVisibleCategory: (category_id: number) => {
    set((state) => {
      return {
        salonCategories: state.salonCategories.map((category) => {
          if(category_id == 0){
            category.is_visible = true;
            return category;
          }

          if (category.id != category_id) {
            category.is_visible = false;
          }else{
            category.is_visible = true;
          }
          return category;
        })
      }
    })
  }
}));