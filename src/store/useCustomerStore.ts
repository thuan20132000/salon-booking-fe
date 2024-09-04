import { customerAPI } from '@/apis/customerAPI';
import { employeeAPI } from '@/apis/employeeAPI';
import { CustomerType, EmployeeType } from '@/types/user';
import { create } from 'zustand';


export type CustomerStore = {
  customers: CustomerType[];
  getCustomers: () => Promise<void>;
};

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  getCustomers: async () => {
    const data = await customerAPI.getCustomers();
    console.log('getEmployees: ', data);
    set({ customers: data });
  },
}));