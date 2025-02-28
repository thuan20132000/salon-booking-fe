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
  salonEmployees: Employee[];

  // Actions
  setSelectedSalon: (salon: Salon | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSalonTechnicians: (technicians: Employee[]) => void;
  setSalonServices: (services: Service[]) => void;
  initSalonData: () => void;
  getSalonServices: () => Promise<Service[]>;
  getSalonCustomers: () => Promise<Customer[]>;
  addSalonCustomer: (customer: Customer) => Promise<Customer>;
  updateSalonCustomer: (customer: Customer) => Promise<Customer>;
  deleteSalonCustomer: (customer: Customer) => Promise<Customer>;
  getSalonEmployees: () => Promise<Employee[]>;
  addSalonEmployee: (employee: Employee) => Promise<Employee>;
  updateSalonEmployee: (employee: Employee) => Promise<Employee>;
  deleteSalonEmployee: (employee: Employee) => Promise<Employee>;
  addSalonService: (service: Service) => Promise<Service>;
  updateSalonService: (service: Service) => Promise<Service>;
  deleteSalonService: (service: Service) => Promise<Service>;
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
  salonEmployees: [],
  // Actions
  setSelectedSalon: (salon) => set({ selectedSalon: salon }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSalonTechnicians: (technicians) => set({ salonTechnicians: technicians }),
  setSalonServices: (services) => set({ salonServices: services }),
  initSalonData: async () => {
    try {
      const selectedSalon = get().selectedSalon;
      const services = await get().getSalonServices();
      const customers = await get().getSalonCustomers();

      set({
        selectedSalon: selectedSalon,
        salonServices: services,
        salonCustomers: customers,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error initializing salon data:', error);
    }
  },

  // Customers
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

  // Employees
  getSalonEmployees: async (): Promise<Employee[]> => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.getSalonEmployees({
      salon_id: selectedSalon?.id,
    });
    set({ salonEmployees: response.data.data });
    return response.data.data;
  },

  addSalonEmployee: async (employee: Employee) => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.createSalonEmployee({
      ...employee,
      salon: selectedSalon?.id,
    });
    set({ salonEmployees: [...get().salonEmployees, response.data.data] });
    return response.data.data;
  },

  updateSalonEmployee: async (employee: Employee): Promise<Employee> => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.updateSalonEmployee({
      ...employee,
      salon: selectedSalon?.id,
    });
    set({ salonEmployees: get().salonEmployees.map(e => e.id === employee.id ? response.data.data : e) });
    return response.data.data;
  },

  deleteSalonEmployee: async (employee: Employee) => {
    const response = await salonAPI.deleteSalonEmployee(employee);
    set({ salonEmployees: get().salonEmployees.filter(e => e.id !== employee.id) });
    return response.data.data;
  },

  // Services
  getSalonServices: async (): Promise<Service[]> => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.getSalonServices({
      salon_id: selectedSalon?.id,
    });
    set({ salonServices: response.data.data });
    return response.data.data;
  },

  addSalonService: async (service: Service) => {
    const selectedSalon = get().selectedSalon;
    const response = await salonAPI.createSalonService({
      ...service,
      salon: selectedSalon?.id,
    });
    set({ salonServices: [...get().salonServices, response.data.data] });
    return response.data.data;
  },

  updateSalonService: async (service: Service): Promise<Service> => {
    const response = await salonAPI.updateSalonService({
      ...service,
    });
    set({ salonServices: get().salonServices.map(s => s.id === service.id ? response.data.data : s) });
    return response.data.data;
  },

  deleteSalonService: async (service: Service) => {
    const response = await salonAPI.deleteSalonService(service);
    set({ salonServices: get().salonServices.filter(s => s.id !== service.id) });
    return response.data.data;
  },
}));