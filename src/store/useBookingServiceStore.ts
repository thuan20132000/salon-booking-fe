import { BookingService, Booking, UpdateBookingType, CreateBookingType } from '@/interfaces/booking';
import { Customer } from '@/interfaces/salon';
import { create } from 'zustand';
import dayjs from 'dayjs';
import { generateTimestampNumber } from '@/utils/helpers';
import { DayPilot } from 'daypilot-pro-react';
import { bookingAPI } from '@/apis/bookingAPI';
import { CalendarBookingParams } from '@/interfaces/booking';
import { useSalonStore } from './useSalonStore';
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

  // booking api actions
  createSalonBooking: (booking: CreateBookingType) => void;
  // updateSalonBooking: (booking: UpdateBookingType) => void;
  // deleteSalonBooking: (id: number) => void;
  // getSalonBooking: (id: number) => void;
}

export const useBookingServiceStore = create<BookingServiceStore>((set) => ({
  // state
  booking: {
    booking_services: [],
    customer: null,
    total_price: 0,
    total_duration: 0,
    status: 'scheduled',
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
    status: 'scheduled',
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
    booking: { ...state.booking, booking_services: state.booking?.booking_services?.filter((bookingService) => bookingService.service?.id !== id) || [] }
  })),

  initBookingServices: (initialEvent?: DayPilot.CalendarTimeRangeSelectedArgs | null) => {

    const bookingDatetime = dayjs(initialEvent?.start.toString()).format('YYYY-MM-DD HH:mm:ss');

    set((state) => ({
      booking: {
        ...state.booking,
        selected_date: bookingDatetime,
        booking_services: []
      }
    }))
  },

  addBookingService: (bookingService) => set((state) => ({
    booking: { ...state.booking, booking_services: [...(state.booking?.booking_services || []), bookingService] }
  })),

  addBookingCustomer: (customer) => set((state) => ({
    booking: { ...state.booking, customer: customer }
  })),

  removeBookingCustomer: () => set((state) => ({
    booking: { ...state.booking, customer: null }
  })),

  removeBookingService: (id: number) => set((state) => ({
    booking: { ...state.booking, booking_services: state.booking?.booking_services?.filter((bookingService) => bookingService.id !== id) || [] }
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
      const updatedBookingServices = state.booking?.booking_services?.map((service) => service.id === bookingService.id ? bookingService : service);
      return {
        booking: { ...state.booking, booking_services: updatedBookingServices }
      }
    })
  },

  // add salon booing to store and create booking in db
  addSalonBooking: async (booking: Booking) => {

    try {
      
      const selectedSalon = useSalonStore.getState().selectedSalon;
      if (!selectedSalon) {
        throw new Error('Salon not selected');
      }

      // create booking in db
      let createBooking: CreateBookingType = {
        customer: booking.customer?.id,
        services: booking?.booking_services?.map((bookingService) => ({
          service_id: bookingService.service?.id,
          employee_id: bookingService.employee?.id,
          start_at: bookingService.start_at || '',
          end_at: bookingService.end_at || '',
          is_requested: bookingService.is_requested || false,
          price: bookingService.price || 0,
          duration: bookingService.duration || 0,
          notes: bookingService.notes || '',
          status: bookingService.status || 'pending',
          
        })),
        notes: booking?.notes || '',
        status: booking?.status || 'pending',
        salon: selectedSalon.id,
        selected_date: dayjs(booking?.selected_date).format('YYYY-MM-DD'),
      }
      const response = await bookingAPI.createBooking(createBooking);
      console.log('createBooking:: ', response.data.data);
      const createdBooking = response.data.data;
      
      // add booking to store
      set((state) => ({
        salonBookings: [...state.salonBookings, createdBooking],
      }))

    } catch (error) {
      console.error('Error creating booking:', error);
    }

  },

  setSelectedUpdateBooking: (selectedUpdateBooking: Booking) => set((state) => ({
    selectedUpdateBooking: selectedUpdateBooking
  })),

  updateSelectedUpdateBooking: async (booking: Booking) => {

    try {
       // update booking in db
       const updateBooking = {
        id: booking.id,
        customer: booking.customer?.id,
        services: booking?.booking_services?.map((bookingService) => ({
          service_id: bookingService.service?.id,
          employee_id: bookingService.employee?.id,
          start_at: bookingService.start_at || '',
          end_at: bookingService.end_at || '',
          is_requested: bookingService.is_requested || false,
          price: bookingService.price || 0,
          duration: bookingService.duration || 0,
          notes: bookingService.notes || '',
          status: bookingService.status || '',
        })),
        notes: booking?.notes || '',
        status: booking?.status || '',
      } as UpdateBookingType;

      const response = await bookingAPI.updateBooking(updateBooking);

      console.log('updatedBooking:: ', response.data.data);

      // update booking in store
      set((state) => ({
        salonBookings: state.salonBookings.map((salonBooking) => {
        if (salonBooking.id === booking.id) {
          return booking;
          }
          return salonBooking;
        })
      }))
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  },

  setBooking: (booking: Booking) => set((state) => ({
    booking: booking
  })),

  getCalendarBookings: async (params: CalendarBookingParams) => {
    try {
      const response = await bookingAPI.getCalendarBookings(params);
      set((state) => ({
        salonBookings: response.data.data
      }))
    } catch (error) {
      console.error('Error fetching calendar bookings:', error);
    }
  },

  createSalonBooking: async (booking: CreateBookingType) => {
    try {
      const response = await bookingAPI.createBooking(booking);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  }

}));
