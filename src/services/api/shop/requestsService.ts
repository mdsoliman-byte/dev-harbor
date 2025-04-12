
import api from '../config';
import { ProductRequest } from './types';

export const submitProductRequest = async (request: ProductRequest): Promise<ProductRequest> => {
  try {
    const response = await api.post('shop/request/', request);
    return response.data;
  } catch (error) {
    console.error('Error submitting product request:', error);
    throw error;
  }
};

export const fetchProductRequests = async (): Promise<ProductRequest[]> => {
  try {
    const response = await api.get('shop/requests/');
    return response.data;
  } catch (error) {
    console.error('Error fetching product requests:', error);
    return [];
  }
};

export const updateProductRequestStatus = async (
  id: number,
  status: 'pending' | 'approved' | 'rejected'
): Promise<ProductRequest> => {
  try {
    const response = await api.put(`shop/requests/${id}/status/`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating request status for ID ${id}:`, error);
    throw error;
  }
};
