import { BookingService, Booking, Customer } from '@/interfaces/salon';
import { create } from 'zustand';
import dayjs from 'dayjs';
import { generateTimestampNumber } from '@/utils/helpers';
import { DayPilot } from 'daypilot-pro-react';


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

  addBookingEvent: (booking: Booking) => void;
  setSelectedUpdateBooking: (selectedUpdateBooking: Booking) => void;
  updateSelectedUpdateBooking: (booking: Booking) => void;

  addSalonBooking: (booking: Booking) => void;
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
    booking_date: '',
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
    booking_date: '',
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
        booking_date: bookingDatetime,
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

  addBookingEvent: (booking: Booking) => {
    
    // 1.transform booking to bookingEvent
    // const bookingServices = [...booking.booking_services]

    // let bookingEvent: DayPilot.EventData[] = []
    
    // bookingEvent = booking.booking_services.map((bookingService) => {
    //   const bookingEventItem: DayPilot.EventData = {
    //     id: bookingService.id,
    //     text: "",
    //     start: new DayPilot.Date(bookingService?.start_at || ''),
    //     end: new DayPilot.Date(bookingService?.end_at || ''),
    //     backColor: "#ffd966", // Yellow background
    //     borderColor: "darker",
    //     cssClass: "event-with-areas",
    //     resource: bookingService.technician?.id || '',
    //     metadata: {
    //       booking_service: bookingService,
    //       booking: booking
    //     },
    //     areas: [
    //       {
    //         left: 0,
    //         text: `${dayjs(bookingService.start_at).format('HH:mm')} ~ ${dayjs(bookingService.end_at).format('HH:mm')}`,
    //         padding: 2,
    //         height: 20,
    //       },
    //       {
    //         right: 0,
    //         image: bookingService.is_requested ? "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png" : "",
    //         width: 20,
    //         height: 20,
    //         symbol: "circle",
    //         padding: 2,
    //         onClick: () => {
    //           console.log('clicked heart request');
    //         }
    //       },
    //       {
    //         left: 0,
    //         top: 20,
    //         html: `<div style='font-size: 12px;font-weight:bold;'>${booking.customer?.name || ''}</div>`,
    //         padding: 2,
    //         height: 20,
    //       },
    //       {
    //         left: 0,
    //         bottom: 0,
    //         top: 40,
    //         text: `${bookingService.service?.name}`,
    //         padding: 2,
    //         height: 20,
    //       }
    //     ]
    //   }
    //   // bookingEvent.push(bookingEventItem)
    //   return bookingEventItem
    // })  

    // console.log('bookingEvent:: ', bookingEvent);


    // set((state) => ({
    //   calendarBookingEvents: [...state.calendarBookingEvents, ...bookingEvent],
    //   booking: {
    //     ...state.booking,
    //     booking_services: booking.booking_services,
    //     booking_date: dayjs(booking.booking_date).format('YYYY-MM-DD')
    //   }
    // }))
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

  

}));
