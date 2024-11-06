import { employeeAPI } from '@/apis/employeeAPI';
import { EmployeePayrollTurnRequestParams, payrollTurnAPI } from '@/apis/payrollTurnAPI';
import { EmployeePayrollTurn } from '@/types/payroll';
import { EmployeeType } from '@/types/user';
import { create } from 'zustand';



export type PayrollStore = {
  employees: EmployeeType[];
  employee: EmployeeType | undefined;
  employeePayrollTurns: EmployeePayrollTurn[];
  getEmployeePayrollTurns: (params: EmployeePayrollTurnRequestParams) => Promise<EmployeePayrollTurn[]>;

};

export const usePayrollStore = create<PayrollStore>((set) => ({
  employees: [],
  employee: undefined,
  employeePayrollTurns: [],
  getEmployeePayrollTurns: async (params) => {
    const data = await payrollTurnAPI.getEmployeePayrollTurn(params);
    console.log('getEmployeePayrollTurns: ', data);
    set({ employeePayrollTurns: data });
    return data;
  },

}));