
import { NailServiceCategoryType, NailServiceType } from '@/types/service';
import axiosInstance from './base';
import { SalonCategoryServiceResponseDataType } from './serviceAPIResource';


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

const getSalonCategoryServices = async (salon_id: number): Promise<SalonCategoryServiceResponseDataType[]> => {
  try {
    const response = await axiosInstance.get(`/salons/${salon_id}/nail-service-categories/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching salon category services:`, error);
    throw error;
  }
}

export type createSalonCategoryInputType = {
  salon_id: number;
  name: string;
  description?: string;
}

const createSalonCategory = async (input: createSalonCategoryInputType): Promise<SalonCategoryServiceResponseDataType> => {
  try {
    const response = await axiosInstance.post(`/salons/${input.salon_id}/nail-service-category/`, input);
    return response.data;
  } catch (error) {
    console.error(`Error creating salon category:`, error);
    throw error;
  }
}

export type deleteSalonCategoryInputType = {
  id: number;
  salon_id: number;
}
const deleteSalonCategory = async (input: deleteSalonCategoryInputType): Promise<void> => {
  try {
    await axiosInstance.delete(`/salons/${input.salon_id}/nail-service-category/${input.id}/delete/`);
  } catch (error) {
    console.error(`Error deleting salon category with id ${input.id}:`, error);
    throw error;
  }
}

export type updateSalonCategoryInputType = {
  id: number;
  name: string;
  description?: string;
  salon_id: number;
}

const updateSalonCategory = async (input: updateSalonCategoryInputType): Promise<SalonCategoryServiceResponseDataType> => {
  try {
    const response = await axiosInstance.put(`/salons/${input.salon_id}/nail-service-category/${input.id}/update/`, input);
    return response.data;
  } catch (error) {
    console.error(`Error updating salon category with id ${input.id}:`, error);
    throw error;
  }
}

const deleteSalonService = async (salon_id: number, service_id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/salons/${salon_id}/nail-service/${service_id}/delete/`);
  } catch (error) {
    console.error(`Error deleting salon service with id ${service_id}:`, error);
    throw error;
  }
}

export type addSalonServiceInputType = {
  salon_id: number;
  category: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}
const addSalonService = async (input: addSalonServiceInputType): Promise<NailServiceType> => {
  try {
    const res = await axiosInstance.post(`/salons/${input.salon_id}/nail-service/`, input);
    return res.data;
  } catch (error) {
    console.error(`Error adding salon service with id ${input.salon_id}:`, error);
    throw error;
  }
}

export type updateSalonServiceInputType = {
  salon_id: number;
  service_id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

const updateSalonService = async (input: updateSalonServiceInputType): Promise<NailServiceType> => {
  try {
    const res = await axiosInstance.put(`/salons/${input.salon_id}/nail-service/${input.service_id}/update/`, input);
    return res.data;
  } catch (error) {
    console.error(`Error updating salon service with id ${input.service_id}:`, error);
    throw error;
  }
}

export const serviceAPI = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceCategories,
  getSalonCategoryServices,
  createSalonCategory,
  deleteSalonCategory,
  updateSalonCategory,
  deleteSalonService,
  addSalonService,
  updateSalonService
};