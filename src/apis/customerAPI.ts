import { CustomerType } from '@/types/user';
import axiosInstance from './base';



// Get all customers
const getCustomers = async (): Promise<CustomerType[]> => {
  try {
    const response = await axiosInstance.get('/customers');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Get customer by ID
const getCustomerById = async (id: number): Promise<CustomerType> => {
  try {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer with id ${id}:`, error);
    throw error;
  }
};

// Create a new customer
const createCustomer = async (customer: Omit<CustomerType, 'id'>): Promise<CustomerType> => {
  try {
    const response = await axiosInstance.post('/customers', customer);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Update an existing customer
const updateCustomer = async (id: number, updatedCustomer: Partial<CustomerType>): Promise<CustomerType> => {
  try {
    const response = await axiosInstance.put(`/customers/${id}`, updatedCustomer);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer with id ${id}:`, error);
    throw error;
  }
};

// Delete a customer by ID
const deleteCustomer = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/customers/${id}`);
  } catch (error) {
    console.error(`Error deleting customer with id ${id}:`, error);
    throw error;
  }
};

export const customerAPI = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};