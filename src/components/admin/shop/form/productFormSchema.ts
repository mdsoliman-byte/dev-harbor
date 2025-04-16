
import * as z from 'zod';

export const productFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  sale_price: z.coerce.number().min(0, 'Sale price must be a positive number').nullable(),
  image: z.string().min(1, 'Image URL is required'),
  category: z.string().min(1, 'Category is required'),
  in_stock: z.boolean().default(true),
  featured: z.boolean().default(false),
});

// This type represents the shape of the form values
export type ProductFormValues = z.infer<typeof productFormSchema>;
