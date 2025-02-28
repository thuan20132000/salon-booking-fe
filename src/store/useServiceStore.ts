
import { addSalonServiceInputType, createSalonCategoryInputType, deleteSalonCategoryInputType, serviceAPI, updateSalonCategoryInputType, updateSalonServiceInputType } from '@/apis/serviceAPI';
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
  createSalonCategory?: (input: createSalonCategoryInputType) => Promise<void>;
  deleteSalonCategory?: (input: deleteSalonCategoryInputType) => Promise<void>;
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => void;
  updateSalonCategory?: (input: updateSalonCategoryInputType) => Promise<void>;
  deleteSalonService?: (salon_id: number, service_id: number) => Promise<void>;
  addSalonService?: (input: addSalonServiceInputType) => Promise<void>;
  updateSalonService?: (input: updateSalonServiceInputType) => Promise<void>;
};


export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  salonCategories: [],
  serviceCategories: [],
  isLoading: false,
  addService: (service) => set((state) => ({ services: [...state.services, service] })),
  removeService: (id) => set((state) => ({ services: state.services.filter(service => service.id !== id) })),
  updateService: (updatedService) => set((state) => ({
    services: state.services.map(service => service.id === updatedService.id ? updatedService : service)
  })),
  getServices: async () => {
    const data = await serviceAPI.getServices();
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
          if (category_id == 0) {
            category.is_visible = true;
            return category;
          }

          if (category.id != category_id) {
            category.is_visible = false;
          } else {
            category.is_visible = true;
          }
          return category;
        })
      }
    })
  },
  createSalonCategory: async (input) => {
    const data = await serviceAPI.createSalonCategory(input);
    set((state) => {
      return {
        salonCategories: [...state.salonCategories, data]
      }
    })
  },
  deleteSalonCategory: async (input: deleteSalonCategoryInputType) => {
    try {
      set({ isLoading: true });
      await serviceAPI.deleteSalonCategory(input);
      set((state) => {
        return {
          salonCategories: state.salonCategories.filter((category) => category.id !== input.id)
        }
      })

    } catch (error) {

    } finally {
      set({ isLoading: false });
    }
  },
  updateSalonCategory: async (input: updateSalonCategoryInputType) => {
    try {
      set({ isLoading: true });
      const data = await serviceAPI.updateSalonCategory(input);
      set((state) => {
        return {
          salonCategories: state.salonCategories.map((category) => {
            if (category.id === data.id) {
              return data;
            }
            return category;
          })
        }
      })
    } catch (error) {

    } finally {
      set({ isLoading: false });
    }
  },
  deleteSalonService: async (salon_id: number, service_id: number) => {
    try {
      set({ isLoading: true });
      await serviceAPI.deleteSalonService(salon_id, service_id);
      set((state) => {
        return {
          salonCategories: state.salonCategories.map((category) => {
            return {
              ...category,
              nail_services: category.nail_services?.filter((service) => service.id !== service_id)
            }
          })
        }
      })
    } catch (error) {

    } finally {
      set({ isLoading: false });
    }
  },
  addSalonService: async (input) => {
    try {
      set({ isLoading: true });
      const res = await serviceAPI.addSalonService(input);
      console.log('addSalonService: ', res);

      set((state) => {
        return {
          salonCategories: state.salonCategories.map((category) => {
            if (category.id === input.category) {
              return {
                ...category,
                nail_services: [...category?.nail_services || [], {
                  id: res.id,
                  name: input.name,
                  description: input.description,
                  price: input.price,
                  duration: input.duration
                }]
              }
            }
            return category;
          })
        }
      })
    } catch (error) {

    } finally {
      set({ isLoading: false });
    }
  },
  updateSalonService: async (input) => {
    try {
      set({ isLoading: true });
      const res = await serviceAPI.updateSalonService(input);
      set((state) => {
        return {
          salonCategories: state.salonCategories.map((category) => {
            return {
              ...category,
              nail_services: category.nail_services?.map((service) => {
                if (service.id === res.id) {
                  return res;
                }
                return service;
              })
            }
          })
        }
      })
    } catch (error) {

    } finally {
      set({ isLoading: false });
    }
  },

}));