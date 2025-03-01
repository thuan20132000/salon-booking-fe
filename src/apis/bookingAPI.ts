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
        selected_date: params.selected_date,
      }
    }),
  createBooking: (booking: CreateBookingType) => axiosInstance.post<ApiResponse<Booking>>('/bookings/', booking),
  updateBooking: (booking: UpdateBookingType) =>
    axiosInstance.put<ApiResponse<Booking>>(`/bookings/${booking.id}/`, booking),
  deleteBooking: (id: number) => axiosInstance.delete<ApiResponse<Booking>>(`/bookings/${id}/`),
  getBooking: (id: number) => axiosInstance.get<ApiResponse<Booking>>(`/bookings/${id}/`),
  updateBookingMetadata: (booking: Partial<Booking>) => axiosInstance.patch<ApiResponse<Booking>>(`/bookings/${booking.id}/update-booking-metadata/`, booking),
};