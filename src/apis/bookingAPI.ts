import axiosInstance from "./base";
import {
  Booking,
  CreateBookingType,
  CalendarBookingParams,
  UpdateBookingType
} from "@/interfaces/booking";
import { ApiResponse } from "@/interfaces/api";

export const bookingAPI = {
  getBookings: () => axiosInstance.get<ApiResponse<Booking[]>>('/bookings/'),
  getCalendarBookings: (params: CalendarBookingParams) =>
    axiosInstance.get<ApiResponse<Booking[]>>('/bookings/calendar/', {
      params: {
        start_date: params.start_date,
        end_date: params.end_date,
        salon_id: params.salon_id,
      }
    }),
  createBooking: (booking: CreateBookingType) => axiosInstance.post<ApiResponse<Booking>>('/bookings/', booking),
  updateBooking: (booking: UpdateBookingType) => axiosInstance.put<ApiResponse<Booking>>('/bookings/', booking),
};