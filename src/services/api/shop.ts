
import api from './config';

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  image: string;
  category: string;
  in_stock: boolean;
  featured: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

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
    const response = await api.post('shop/create/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (slug: string, data: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.put(`shop/${slug}/update/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with slug ${slug}:`, error);
    throw error;
  }
};

export const deleteProduct = async (slug: string): Promise<void> => {
  try {
    await api.delete(`shop/${slug}/delete/`);
  } catch (error) {
    console.error(`Error deleting product with slug ${slug}:`, error);
    throw error;
  }
};

// Default shop data
const defaultProducts: Product[] = [
  {
    id: 1,
    title: "Digital Marketing eBook",
    slug: "digital-marketing-ebook",
    description: "A comprehensive guide to digital marketing strategies.",
    price: 29.99,
    sale_price: 19.99,
    image: "/placeholder.svg",
    category: "eBooks",
    in_stock: true,
    featured: true
  },
  {
    id: 2,
    title: "Premium WordPress Theme",
    slug: "premium-wordpress-theme",
    description: "A responsive and customizable WordPress theme for professionals.",
    price: 59.99,
    sale_price: null,
    image: "/placeholder.svg",
    category: "Themes",
    in_stock: true,
    featured: false
  },
  {
    id: 3,
    title: "UX Design Course",
    slug: "ux-design-course",
    description: "Learn UX design principles from industry experts.",
    price: 199.99,
    sale_price: 149.99,
    image: "/placeholder.svg",
    category: "Courses",
    in_stock: true,
    featured: true
  }
];

const defaultProductCategories: ProductCategory[] = [
  { id: 1, name: "eBooks", slug: "ebooks" },
  { id: 2, name: "Themes", slug: "themes" },
  { id: 3, name: "Courses", slug: "courses" },
  { id: 4, name: "Templates", slug: "templates" }
];
