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

  updateSalonCustomer: (customer: Customer) => axiosInstance.put<ApiResponse<Customer>>(`/salon-customers/${customer.id}/`,customer),

  deleteSalonCustomer: (customer: Customer) => axiosInstance.delete<ApiResponse<Customer>>(`/salon-customers/${customer.id}/`),

  // salon employees
  getSalonEmployees: (params: SalonParams) => axiosInstance.get<ApiResponse<Employee[]>>(`/salon-employees/`,{
    params: {
      salon_id: params.salon_id,
    }
  }),

  createSalonEmployee: (employee: Employee) => axiosInstance.post<ApiResponse<Employee>>(`/salon-employees/`,employee),

  updateSalonEmployee: (employee: Employee) => axiosInstance.put<ApiResponse<Employee>>(`/salon-employees/${employee.id}/`,employee),

  deleteSalonEmployee: (employee: Employee) => axiosInstance.delete<ApiResponse<Employee>>(`/salon-employees/${employee.id}/`),
  
};