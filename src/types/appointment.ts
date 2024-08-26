import { NailServiceType } from "./service";

export type AppointmentType = {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  datetime?: Date;
  duration?: string;
  status?: string;
  services?: NailServiceType[];
  type?: string;
  staff?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
};