
export interface Technician {
  id: string;
  name: string;
  avatar?: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export interface BookingService {
  service: Service;
  technician: Technician;
  datetime: string;
  price: number;
  duration: number;
}
