
import api from '../config';
import { Product as ProductType, ProductCategory } from './types';
import { defaultProducts, defaultProductCategories } from './mockData';

export type Product = ProductType;

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('shop/data/');
    console.log('Products:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return defaultProducts;
  }
};

export const fetchProduct = async (slug: string): Promise<Product> => {
  try {
    const response = await api.get(`shop/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    const product = defaultProducts.find(product => product.slug === slug);
    if (product) return product;
    throw error;
  }
};

export const fetchProductCategories = async (): Promise<ProductCategory[]> => {
  try {
    const response = await api.get('shop/categories/');
    return response.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return defaultProductCategories;
  }
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.post('shop/data/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (slug: string, data: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.put(`shop/${slug}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with slug ${slug}:`, error);
    throw error;
  }
};

export const deleteProduct = async (slug: string): Promise<void> => {
  try {
    await api.delete(`shop/${slug}/`);
  } catch (error) {
    console.error(`Error deleting product with slug ${slug}:`, error);
    throw error;
  }
};
