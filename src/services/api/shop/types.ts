
export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  image: string;
  category: ProductCategory;
  in_stock: boolean;
  featured: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  titleColor: string;
  textColor: string;
  backgroundColor: string;
  isDarkMode: boolean;
}

export interface ProductRequest {
  id?: number;
  productId: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}
