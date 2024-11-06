import { EmployeeType } from '@/types/user';
import axiosInstance from './base';
import { EmployeePayrollTurn, PayrollTurn } from '@/types/payroll';

export type EmployeePayrollTurnRequestParams = {
  employee?: number;
  date?: string;
  year?: number;
  month?: number;
};


const getEmployeePayrollTurn = async (params: EmployeePayrollTurnRequestParams): Promise<EmployeePayrollTurn[]> => {
  try {

    const response = await axiosInstance.get('/employee-payroll-turn/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const payrollTurnAPI = {
  getEmployeePayrollTurn,
};