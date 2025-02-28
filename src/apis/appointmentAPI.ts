import { AppointmentType } from '@/types/appointment';
import axiosInstance from './base';



// Get all appointments
const getAppointments = async (): Promise<AppointmentType[]> => {
  try {
    const response = await axiosInstance.get('/appointments/');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get appointment by ID
const getAppointmentById = async (id: number): Promise<AppointmentType> => {
  try {
    const response = await axiosInstance.get(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointment with id ${id}:`, error);
    throw error;
  }
};

// Create a new appointment
const createAppointment = async (appointment: Omit<AppointmentType, 'id'>): Promise<AppointmentType> => {
  try {
    const response = await axiosInstance.post('/appointments', appointment);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Update an existing appointment
const updateAppointment = async (id: number, updatedAppointment: Partial<AppointmentType>): Promise<AppointmentType> => {
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

export const appointmentAPI = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};