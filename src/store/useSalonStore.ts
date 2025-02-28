import { create } from 'zustand';
import { Salon, Employee, Service, Customer } from '../interfaces/salon';
import { SALON, SALON_TECHNICIANS, SALON_SERVICES } from '../dummy/salon';
import { salonAPI } from '@/apis/salonAPI';

export interface SalonState {
  selectedSalon: Salon | null;
  isLoading: boolean;
  error: string | null;
  salonTechnicians: Employee[];
  salonServices: Service[];
  salonCustomers: Customer[];

  // Actions
  setSelectedSalon: (salon: Salon | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSalonTechnicians: (technicians: Employee[]) => void;
  setSalonServices: (services: Service[]) => void;
  initSalonData: () => void;
  getSalonTechnicians: () => Promise<Employee[]>;
  getSalonServices: () => Promise<Service[]>;
  getSalonCustomers: () => Promise<Customer[]>;
  addSalonCustomer: (customer: Customer) => Promise<Customer>;
  updateSalonCustomer: (customer: Customer) => Promise<Customer>;
  deleteSalonCustomer: (customer: Customer) => Promise<Customer>;
}

export const useSalonStore = create<SalonState>((set, get) => ({
  // Initial state
  selectedSalon: {
    id: 1,
    name: 'Salon 1',
    address: '123 Main St',
    phone: '123-456-7890',
    email: 'salon1@example.com',
    website: 'https://www.salon1.com',
    logo: 'https://www.salon1.com/logo.png',
    description: 'Salon 1 description',
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  isLoading: false,
  error: null,
  salonTechnicians: [],
  salonServices: [],
  salonCustomers: [],

  // Actions
  setSelectedSalon: (salon) => set({ selectedSalon: salon }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSalonTechnicians: (technicians) => set({ salonTechnicians: technicians }),
  setSalonServices: (services) => set({ salonServices: services }),
  initSalonData: async () => {
    try {
      const technicians = await get().getSalonTechnicians();
      const selectedSalon = get().selectedSalon;
      const services = await get().getSalonServices();
      const customers = await get().getSalonCustomers();
    
      set({
        selectedSalon: selectedSalon,
        salonTechnicians: technicians,
        salonServices: services,
        salonCustomers: customers,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error initializing salon data:', error);
    }
  },

  getSalonTechnicians: async (): Promise<Employee[]> => {
    // get selected salon id
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.getSalonEmployees({
      salon_id: selectedSalon?.id,
    });
    return response.data.data;
  },

  getSalonServices: async (): Promise<Service[]> => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.getSalonServices({
      salon_id: selectedSalon?.id,
    });
   
    return response.data.data;
  },

  getSalonCustomers: async (): Promise<Customer[]> => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.getSalonCustomers({
      salon_id: selectedSalon?.id,
    });
    set({ salonCustomers: response.data.data });
    return response.data.data;
  },

  addSalonCustomer: async (customer: Customer) => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.createSalonCustomer({
      ...customer,
      salon: selectedSalon?.id,
    });
    set({ salonCustomers: [...get().salonCustomers, response.data.data] });
    return response.data.data;
  },

  updateSalonCustomer: async (customer: Customer): Promise<Customer> => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.updateSalonCustomer({
      ...customer,
      salon: selectedSalon?.id,
    });
    set({ salonCustomers: get().salonCustomers.map(c => c.id === customer.id ? response.data.data : c) });
    return response.data.data;
  },

  deleteSalonCustomer: async (customer: Customer) => {
    const response = await salonAPI.deleteSalonCustomer(customer);
    set({ salonCustomers: get().salonCustomers.filter(c => c.id !== customer.id) });
    return response.data.data;
  },

}));
