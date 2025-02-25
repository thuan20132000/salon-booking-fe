import { useState } from 'react';

interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface BookingState {
  customer: Customer | null;
  selectedServices: Service[];
  bookingTime: Date | null;
}

export const useBookingService = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    customer: null,
    selectedServices: [],
    bookingTime: null,
  });

  const addService = (service: Service) => {
    setBookingState((prev) => ({
      ...prev,
      selectedServices: [...prev.selectedServices, service],
    }));
  };

  const removeService = (serviceId: string) => {
    setBookingState((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.filter((s) => s.id !== serviceId),
    }));
  };

  const addCustomer = (customer: Customer) => {
    setBookingState((prev) => ({
      ...prev,
      customer,
    }));
  };

  const updateBookingTime = (date: Date) => {
    setBookingState((prev) => ({
      ...prev,
      bookingTime: date,
    }));
  };

  const getTotalDuration = () => {
    return bookingState.selectedServices.reduce((total, service) => total + service.duration, 0);
  };

  const getTotalPrice = () => {
    return bookingState.selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const resetBooking = () => {
    setBookingState({
      customer: null,
      selectedServices: [],
      bookingTime: null,
    });
  };

  return {
    bookingState,
    addService,
    removeService,
    addCustomer,
    updateBookingTime,
    getTotalDuration,
    getTotalPrice,
    resetBooking,
  };
};
