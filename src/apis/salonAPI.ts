import axiosInstance from "./base";
import {
  Salon,
  Employee,
  Service,
  SalonParams,
  Customer
} from "@/interfaces/salon";
import { ApiResponse } from "@/interfaces/api";

export const salonAPI = {
  getSalons: () => axiosInstance.get<ApiResponse<Salon[]>>('/salons/'),
  getSalonEmployees: (params: SalonParams) => axiosInstance.get<ApiResponse<Employee[]>>(`/employees/`,{
    params: {
      salon_id: params.salon_id,
    }
  }),
  getSalonServices: (params: SalonParams) => axiosInstance.get<ApiResponse<Service[]>>(`/services/`, {
    params: {
      salon_id: params.salon_id,
    }
  }),
  getSalonCustomers: (params: SalonParams) => axiosInstance.get<ApiResponse<Customer[]>>(`/salon-customers/`, {
    params: {
      salon_id: params.salon_id,
    }
  }),
  createSalonCustomer: (customer: Customer) => axiosInstance.post<ApiResponse<Customer>>(`/salon-customers/`,customer),
};