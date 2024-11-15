import { EmployeeType } from '@/types/user';
import axiosInstance from './base';
import { PayrollTurnResponse, PayslipType } from '@/types/payroll';

const getPayslips = async (): Promise<PayslipType[]> => {
  try {
    const response = await axiosInstance.get('/employee-payslips/');
    return response.data;
  } catch (error) {
    console.error('Error fetching payslips:', error);
    throw error;
  }
};

export type createPayslipType = {
  pay_period_start?: string;
  pay_period_end?: string;
  employee: number;
  share?: number;
  bonus?: number;
};

export type createPayslipResponse = {
  payslip: PayslipType;
  payroll_turns: PayrollTurnResponse;
};

const createPayslips = async (payslip: createPayslipType): Promise<createPayslipResponse> => {
  try {
    const response = await axiosInstance.post('/employee-payslips/', payslip);
    return response.data;
  } catch (error) {
    console.error('Error creating payslip:', error);
    throw error;
  }
}


export const salaryAPI = {
  getPayslips,
  createPayslips
};