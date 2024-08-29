import { employeeAPI } from '@/apis/employeeAPI';
import { EmployeeType } from '@/types/user';
import { create } from 'zustand';


export type EmployeeStore = {
  employees: EmployeeType[];
  addEmployee: (employee: Omit<EmployeeType, 'id'>) => Promise<void>;
  removeEmployee: (id: number) => void;
  updateEmployee: (employee: EmployeeType) => void;
  getEmployees: () => Promise<void>;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  addEmployee: async (employee) => {
    const newEmployee = await employeeAPI.createEmployee(employee);
    set((state) => ({ employees: [...state.employees, newEmployee] }));
  },
  removeEmployee: (id) => set((state) => ({ employees: state.employees.filter(employee => employee.id !== id) })),
  updateEmployee: (updatedEmployee) => set((state) => ({
    employees: state.employees.map(employee => employee.id === updatedEmployee.id ? updatedEmployee : employee)
  })),
  getEmployees: async () => {
    const data = await employeeAPI.getEmployees();
    console.log('getEmployees: ', data);
    set({ employees: data });
  },
}));