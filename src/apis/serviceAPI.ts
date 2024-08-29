
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import axiosInstance from './base';

const getServices = async (): Promise<NailServiceType[]> => {
  try {
    const response = await axiosInstance.get('/nailservices/');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

const getServiceById = async (id: number): Promise<NailServiceType> => {
  try {
    const response = await axiosInstance.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with id ${id}:`, error);
    throw error;
  }
};

const createService = async (service: NailServiceType): Promise<NailServiceType> => {
  try {
    const response = await axiosInstance.post('/services', service);
    return response.data;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

const updateService = async (id: number, service: Partial<NailServiceType>): Promise<NailServiceType> => {
  try {
    const response = await axiosInstance.put(`/services/${id}`, service);
    return response.data;
  } catch (error) {
    console.error(`Error updating service with id ${id}:`, error);
    throw error;
  }
};

const deleteService = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/services/${id}`);
  } catch (error) {
    console.error(`Error deleting service with id ${id}:`, error);
    throw error;
  }
};

const getServiceCategories = async (): Promise<NailServiceCategoryType[]> => {
  try {
    const response = await axiosInstance.get('/nailservicecategories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching service categories:', error);
    throw error;
  }
}

export const serviceAPI = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceCategories
};