import { Service } from './salon';
import { Employee } from './salon';
import { Customer } from './salon';

export interface BookingService {
  id: any;
  service: Service | null;
  price: number | null;
  duration: number | null;
  is_requested: boolean;
  start_at: string | null;
  end_at: string | null;
  selected_date: string;
  booking?: Booking | null;
  status?: string;
  notes?: string;
  employee?: Employee | null;

}


export interface Booking {
  id?: any;
  booking_services?: BookingService[];
  customer?: Customer | null;
  total_price?: number;
  total_duration?: number;
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'check_in' | 'check_out';
  notes?: string;
  payment_method?: string;
  payment_status?: string;
  selected_date?: string;
  booking_source?: string;
  
}

export interface CreateBookingServiceType {
  service_id?: number;
  employee_id?: number;
  start_at?: string;
  end_at?: string;
  is_requested?: boolean;
  price?: number;
  duration?: number;
  notes?: string;
  status?: string;
}


export interface CreateBookingType {
  customer?: number;
  services?: CreateBookingServiceType[];
  notes?: string;
  status?: string;
  selected_date?: string;
  // salon id
  salon?: number;
}


export interface UpdateBookingServiceType {
  id: number;
  service_id: number;
  employee_id: number;
  start_at: string;
  end_at: string;
}

export interface UpdateBookingType {
  id: number;
  customer: number;
  services: CreateBookingServiceType[];
  notes: string;
  status: string;
}

export interface CalendarBooking {
  id: number;
  start_at: string;
  end_at: string;
}


export interface CalendarBookingParams {
  start_date?: string;
  end_date?: string;
  salon_id?: number;
  selected_date?: string;
}
