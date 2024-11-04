import { AppointmentServiceType } from '@/types/appointment';
import axiosInstance from './base';



// Get all appointments
const getAppointmentServices = async (): Promise<AppointmentServiceType[]> => {
  try {
    const response = await axiosInstance.get('/appointment-services/');
    console.log('====================================');
    console.log('response.data:: ', response.data);
    console.log('====================================');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get appointment by ID
const getAppointmentById = async (id: number): Promise<AppointmentServiceType> => {
  try {
    const response = await axiosInstance.get(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointment with id ${id}:`, error);
    throw error;
  }
};

// Create a new appointment
const createAppointment = async (appointment: Omit<AppointmentServiceType, 'id'>): Promise<AppointmentServiceType> => {
  try {
    const response = await axiosInstance.post('/appointments', appointment);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Update an existing appointment
const updateAppointment = async (id: number, updatedAppointment: Partial<AppointmentServiceType>): Promise<AppointmentServiceType> => {
  try {
    const response = await axiosInstance.put(`/appointments/${id}`, updatedAppointment);
    return response.data;
  } catch (error) {
    console.error(`Error updating appointment with id ${id}:`, error);
    throw error;
  }
};

// Delete an appointment by ID
const deleteAppointment = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/appointments/${id}`);
  } catch (error) {
    console.error(`Error deleting appointment with id ${id}:`, error);
    throw error;
  }
};


export const appointmentServiceAPI = {
    getAppointmentServices
};