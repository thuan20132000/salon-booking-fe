import { NailServiceType } from "@/types/service";

export type SalonCategoryServiceResponseDataType = {
  id: number;
  name: string;
  nail_services: NailServiceType[];
  description: string;
  is_online_booking: boolean;
  is_check_in: boolean;
  created_at: string;
  updated_at: string;
  salon: number;
};