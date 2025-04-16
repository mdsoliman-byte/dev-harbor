
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@/services/api/shop';
import { productFormSchema, ProductFormValues } from './productFormSchema';

interface UseProductFormProps {
  editingProduct: Product | null;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  open: boolean;
}

export const useProductForm = ({ editingProduct, onSubmit, open }: UseProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      price: 0,
      sale_price: null,
      image: '',
      category: '',
      in_stock: true,
      featured: false,
    },
  });

  // Reset form when dialog opens/closes or editing product changes
  useEffect(() => {
    if (open && editingProduct) {
      form.reset({
        title: editingProduct.title,
        slug: editingProduct.slug,
        description: editingProduct.description,
        price: editingProduct.price,
        sale_price: editingProduct.sale_price,
        image: editingProduct.image,
        category: editingProduct.category?.name || '',
        in_stock: editingProduct.in_stock,
        featured: editingProduct.featured,
      });
    } else if (open && !editingProduct) {
      form.reset({
        title: '',
        slug: '',
        description: '',
        price: 0,
        sale_price: null,
        image: '',
        category: '',
        in_stock: true,
        featured: false,
      });
    }
  }, [open, editingProduct, form]);

  const generateSlug = () => {
    const title = form.getValues('title');
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      form.setValue('slug', slug);
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return {
    form,
    generateSlug,
    handleSubmit,
  };
};
