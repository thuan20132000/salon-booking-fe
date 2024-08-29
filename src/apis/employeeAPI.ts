import { EmployeeType } from '@/types/user';
import axiosInstance from './base';

const getEmployees = async (): Promise<EmployeeType[]> => {
  try {
    const response = await axiosInstance.get('/employees/');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

const getEmployeeById = async (id: number): Promise<EmployeeType> => {
  try {
    const response = await axiosInstance.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

const createEmployee = async (employee: Omit<EmployeeType, 'id'>): Promise<EmployeeType> => {
  try {
    const response = await axiosInstance.post('/employees', employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

const updateEmployee = async (id: number, updatedEmployee: Partial<EmployeeType>): Promise<EmployeeType> => {
  try {
    const response = await axiosInstance.put(`/employees/${id}`, updatedEmployee);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${id}:`, error);
    throw error;
  }
};

const deleteEmployee = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/employees/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with id ${id}:`, error);
    throw error;
  }
};

export const employeeAPI = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};