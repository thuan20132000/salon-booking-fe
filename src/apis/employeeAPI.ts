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

const createEmployee = async (employee: EmployeeType): Promise<EmployeeType> => {
  try {

    const response = await axiosInstance.post('/employees/', employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

const updateEmployeeById = async (id: number, updatedEmployee: Partial<EmployeeType>): Promise<EmployeeType> => {
  try {
    const response = await axiosInstance.put(`/employees/${id}/`, updatedEmployee);
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

export type addSalonEmployeeInputType = {
  salon_id: number;
  employee: EmployeeType;
}
const addSalonEmployee = async (input: addSalonEmployeeInputType): Promise<EmployeeType> => {
  try {
    const response = await axiosInstance.post(`/salons/${input.salon_id}/employee/`, input.employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
}

export type updateSalonEmployeeInputType = {
  salon_id: number;
  employee_id: number;
  employee: Partial<EmployeeType>;
}
const updateSalonEmployee = async (input: updateSalonEmployeeInputType): Promise<EmployeeType> => {
  try {
    const response = await axiosInstance.put(`/salons/${input.salon_id}/employee/${input.employee_id}/update/`, input.employee);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
}

export type deleteSalonEmployeeInputType = {
  salon_id: number;
  employee_id: number;
}
const deleteSalonEmployee = async (input: deleteSalonEmployeeInputType): Promise<void> => {
  try {
    await axiosInstance.delete(`/salons/${input.salon_id}/employee/${input.employee_id}/delete/`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
}

export const employeeAPI = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployeeById,
  deleteEmployee,
  addSalonEmployee,
  updateSalonEmployee,
  deleteSalonEmployee
};