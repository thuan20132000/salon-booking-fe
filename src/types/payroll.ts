// employee = models.ForeignKey(
//   Employee,
//   on_delete=models.SET_NULL,
//   null=True,
// )
// date = models.DateField()
// total_price = models.DecimalField(max_digits=10, decimal_places=2)
// created_at = models.DateTimeField(auto_now_add=True)
// updated_at = models.DateTimeField(auto_now=True)

import { EmployeeType } from "./user";

// convert to typescript


export type EmployeePayrollTurn = {
  id: number;
  employee: number | EmployeeType;
  date: Date;
  total_price: string;
  created_at?: Date;
  updated_at?: Date;
  payroll_turns?: PayrollTurn[];
};

export type PayrollTurn = {
  id?: number;
  service_name: string;
  price: number;
  employee_payroll_turn: number | EmployeePayrollTurn;
  created_at?: Date;
  updated_at?: Date;
  key?: number;
};

export type PayrollTurnResponse = {
  total: number;
  total_turn_price: number;
  data: PayrollTurn[];
}

export type EmployeePayrollTurnResponse = {
  total: number;
  data: EmployeePayrollTurn[];
  total_price: number;
}
