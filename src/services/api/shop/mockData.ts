
import { Product, ProductCategory, ThemeSettings } from './types';

export const defaultProducts: Product[] = [
  {
    id: 1,
    title: "Digital Marketing eBook",
    slug: "digital-marketing-ebook",
    description: "A comprehensive guide to digital marketing strategies.",
    price: 29.99,
    sale_price: 19.99,
    image: "/placeholder.svg",
    category: { id: 1, name: "eBooks", slug: "ebooks" },
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
    category: { id: 2, name: "Themes", slug: "themes" },
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
    category: { id: 3, name: "Courses", slug: "courses" },
    in_stock: true,
    featured: true
  }
];

export const defaultProductCategories: ProductCategory[] = [
  { id: 1, name: "eBooks", slug: "ebooks" },
  { id: 2, name: "Themes", slug: "themes" },
  { id: 3, name: "Courses", slug: "courses" },
  { id: 4, name: "Templates", slug: "templates" }
];

export const defaultThemeSettings: ThemeSettings = {
  primaryColor: '#4A4AE9',
  secondaryColor: '#22223B',
  accentColor: '#9A8C98',
  fontFamily: 'Inter',
  titleColor: '#22223B',
  textColor: '#333333',
  backgroundColor: '#F2E9E4',
  isDarkMode: false
};
