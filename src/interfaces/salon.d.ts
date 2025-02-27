
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
}

export interface Customer {
  id: any;
  full_name: string;
  phone_number: string;
  email: string;
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
