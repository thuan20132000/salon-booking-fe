import { Service } from './salon';
import { Technician } from './salon';
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
  employee?: Technician | null;

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
  selected_date: string;
  booking_source?: string;
  
}

export interface CreateBookingType {
  customer: number;
  services: Service[];
  notes: string;
  status: string;
}

export interface UpdateBookingType {
  id: number;
  customer: number;
  services: Service[];
  notes: string;
  status: string;
  booking_services: BookingService[];
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
}
