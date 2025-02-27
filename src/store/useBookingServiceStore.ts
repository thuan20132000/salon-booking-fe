import { BookingService, Booking } from '@/interfaces/booking';
import { Customer } from '@/interfaces/salon';
import { create } from 'zustand';
import dayjs from 'dayjs';
import { generateTimestampNumber } from '@/utils/helpers';
import { DayPilot } from 'daypilot-pro-react';
import { bookingAPI } from '@/apis/bookingAPI';
import { CalendarBookingParams } from '@/interfaces/booking';

export interface BookingServiceStore {
  booking: Booking;
  salonBookings: Booking[];
  salonBookingServices: BookingService[];
  selectedUpdateBooking: Booking;
  calendarBookingEvents: DayPilot.EventData[];
  createBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBooking: (updatedBooking: Partial<Booking>) => void;
  removeBooking: (id: string) => void;
  initBookingServices: (initialEvent?: DayPilot.CalendarTimeRangeSelectedArgs | null) => void;
  addBookingService: (bookingService: BookingService) => void;
  addBookingCustomer: (customer: Customer) => void;
  removeBookingCustomer: () => void;
  removeBookingService: (id: number) => void;
  resetBooking: () => void;
  resetSelectedUpdateBooking: () => void;
  updateBookingService: (bookingService: BookingService) => void;

  setSelectedUpdateBooking: (selectedUpdateBooking: Booking) => void;
  updateSelectedUpdateBooking: (booking: Booking) => void;

  addSalonBooking: (booking: Booking) => void;
  setBooking: (booking: Booking) => void;
  getCalendarBookings: (params: CalendarBookingParams) => void;
}

export const useBookingServiceStore = create<BookingServiceStore>((set) => ({
  // state
  booking: {
    booking_services: [],
    customer: null,
    total_price: 0,
    total_duration: 0,
    status: 'pending',
    notes: '',
    payment_method: '',
    payment_status: '',
    selected_date: '',
  },
  salonBookings: [],
  salonBookingServices: [],
  selectedUpdateBooking: {
    booking_services: [],
    customer: null,
    total_price: 0,
    total_duration: 0,
    status: 'pending',
    notes: '',
    payment_method: '',
    payment_status: '',
    selected_date: '',
  },
  calendarBookingEvents: [],

  // actions
  createBooking: (booking) => set((state) => ({
    booking: { ...state.booking, ...booking, id: crypto.randomUUID() }
  })),

  updateBooking: (updatedBooking) => set((state) => ({
    booking: { ...state.booking, ...updatedBooking }
  })),

  removeBooking: (id) => set((state) => ({
    booking: { ...state.booking, booking_services: state.booking.booking_services.filter((bookingService) => bookingService.service?.id !== id) }
  })),

  initBookingServices: (initialEvent?: DayPilot.CalendarTimeRangeSelectedArgs | null) => {
    console.log('initialEvent:: ', initialEvent?.start.toString());

    const bookingDatetime = dayjs(initialEvent?.start.toString()).format('YYYY-MM-DD HH:mm:ss');
    console.log('bookingDatetime:: ', bookingDatetime);

    set((state) => ({
      booking: {
        ...state.booking,
          selected_date: bookingDatetime,
        booking_services: [ ]
      }
    }))
  },

  addBookingService: (bookingService) => set((state) => ({
    booking: { ...state.booking, booking_services: [...state.booking.booking_services, bookingService] }
  })),

  addBookingCustomer: (customer) => set((state) => ({
    booking: { ...state.booking, customer: customer }
  })),

  removeBookingCustomer: () => set((state) => ({
    booking: { ...state.booking, customer: null }
  })),

  removeBookingService: (id: number) => set((state) => ({
    booking: { ...state.booking, booking_services: state.booking.booking_services.filter((bookingService) => bookingService.id !== id) }
  })),

  resetBooking: () => set((state) => {
    return {
      booking: {
        ...state.booking,
        booking_services: [],
        customer: null,
      }
    }
  }),

  resetSelectedUpdateBooking: () => set((state) => {
    return {
      selectedUpdateBooking: {
        ...state.selectedUpdateBooking,
      }
    }
  }),

  updateBookingService: (bookingService) => {
    set((state) => {
      const updatedBookingServices = state.booking.booking_services.map((service) => service.id === bookingService.id ? bookingService : service);
      return {
        booking: { ...state.booking, booking_services: updatedBookingServices }
      }
    })
  },

  addSalonBooking: (booking: Booking) => set((state) => ({
    salonBookings: [...state.salonBookings, booking],
    salonBookingServices: [...state.salonBookingServices, ...booking.booking_services]
  })),

  setSelectedUpdateBooking: (selectedUpdateBooking: Booking) => set((state) => ({
    selectedUpdateBooking: selectedUpdateBooking
  })),

  updateSelectedUpdateBooking: (booking: Booking) => {
    set((state) => ({
      salonBookings: state.salonBookings.map((salonBooking) => {
        if (salonBooking.id === booking.id) {
          return booking;
        }
        return salonBooking;
      })
    }))
  },

  setBooking: (booking: Booking) => set((state) => ({
    booking: booking
  })),

  getCalendarBookings: async (params: CalendarBookingParams) => {
    try {
      const response = await bookingAPI.getCalendarBookings(params);
      console.log('calendarBookings:: ', response.data.data);
      set((state) => ({
        salonBookings: response.data.data
      }))
    } catch (error) {
      console.error('Error fetching calendar bookings:', error);
    }
  }


}));
