import { NailServiceType } from "./service";
import { CustomerType, EmployeeType } from "./user";

export type AppointmentType = {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  datetime?: Date;
  duration?: string;
  status?: string;
  services?: AppointmentServiceType[];
  type?: string;
  staff?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
  customer?: CustomerType;
  start_at?: Date;
  end_at?: Date;
};

export type AppointmentServiceType = {
  id?: string;
  created_at?: string;
  updated_at?: string;
  service?: NailServiceType;
  appointment?: AppointmentType;
  employee?: EmployeeType;
  start_at?: Date | string;
  duration?: string;
};