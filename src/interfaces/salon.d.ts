
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

export interface Technician {
  id: any;
  name: string;
  avatar?: string;
}

export interface Customer {
  id: any;
  name: string;
  phone: string;
  email: string;
}

export interface Service {
  id: any;
  name: string;
  price: number;
  duration: number;
}

export interface BookingService {
  id: any;
  service: Service | null;
  technician: Technician | null;
  price: number | null;
  duration: number | null;
  is_requested: boolean;
  start_at: string | null;
  end_at: string | null;
  booking_date: string;
}


export interface Booking {
  id?: any;
  booking_services: BookingService[];
  customer: Customer | null;
  total_price: number;
  total_duration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
  payment_method: string;
  payment_status: string;
  booking_date: string;
  
}