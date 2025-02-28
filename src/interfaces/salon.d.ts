
export interface Salon {
  id: any;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: any;
  name: string;
  avatar?: string;
  nick_name?: string;
}

export interface Customer {
  id: any;
  full_name: string;
  phone_number: string;
  email?: string;
  address?: string;
  birth_date?: string;
  gender?: string;
  salon?: number;
  last_visit?: string;
  total_visits?: number;
}

export interface Service {
  id: any;
  name: string;
  price: number;
  description?: string;
  duration: number;
  original_price?: number;
  is_active?: boolean;
  deduction_cost?: number;
  category?: string;
  video_url?: string;

}

export interface SalonEmployeeParams {
  salon_id?: number;
  employee_id?: number;
}

export interface SalonParams {
  salon_id?: number;
  employee_id?: number;
  service_id?: number;
}