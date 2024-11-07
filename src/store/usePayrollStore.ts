import { employeeAPI } from '@/apis/employeeAPI';
import { EmployeePayrollTurnRequestParams, EmployeeTurnRquestParams, payrollTurnAPI } from '@/apis/payrollTurnAPI';
import { EmployeePayrollTurn, PayrollTurnResponse, PayrollTurn, EmployeePayrollTurnResponse } from '@/types/payroll';
import { EmployeeType } from '@/types/user';
import { create } from 'zustand';



export type PayrollStore = {
  employees: EmployeeType[];
  employee: EmployeeType | undefined;
  employeePayrollTurns: EmployeePayrollTurn[];
  getEmployeePayrollTurns: (params: EmployeePayrollTurnRequestParams) => Promise<EmployeePayrollTurnResponse>;
  getEmployeeTurns: (params: EmployeeTurnRquestParams) => Promise<PayrollTurnResponse>;
  deletePayrollTurn: (id: number) => Promise<any>;
  bulkUpdatePayrollTurn: (payrollTurn: PayrollTurn[]) => Promise<any>;
};

export const usePayrollStore = create<PayrollStore>((set) => ({
  employees: [],
  employee: undefined,
  employeePayrollTurns: [],
  getEmployeePayrollTurns: async (params) => {
    const data = await payrollTurnAPI.getEmployeePayrollTurn(params);
    console.log('getEmployeePayrollTurns: ', data);
    set({ employeePayrollTurns: data.data });
    return data;
  },
  getEmployeeTurns: async (params) => {
    const data = await payrollTurnAPI.getEmployeeTurns(params);
    console.log('getEmployeeTurns: ', data);
    return data;
  },
  deletePayrollTurn: async (id) => {
    const data = await payrollTurnAPI.deletePayrollTurn(id);
    return data;
  },
  bulkUpdatePayrollTurn: async (payrollTurn) => {
    const data = await payrollTurnAPI.bulkUpdatePayrollTurn(payrollTurn);
    return data;
  }

}));