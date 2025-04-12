
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Product } from '@/services/api/shop';

// Import field components
import BasicInfoFields from './form-fields/BasicInfoFields';
import DescriptionField from './form-fields/DescriptionField';
import PriceFields from './form-fields/PriceFields';
import MetadataFields from './form-fields/MetadataFields';
import StatusFields from './form-fields/StatusFields';

const formSchema = z.object({
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
export type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading: boolean;
  editingProduct: Product | null;
  onSubmit: (data: ProductFormValues) => Promise<void>;
}

const ProductForm = ({ 
  open, 
  onOpenChange, 
  loading, 
  editingProduct, 
  onSubmit 
}: ProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
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
  React.useEffect(() => {
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

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <BasicInfoFields 
              form={form} 
              editingProduct={!!editingProduct} 
              onGenerateSlug={generateSlug} 
            />
            
            <DescriptionField form={form} />
            
            <PriceFields form={form} />
            
            <MetadataFields form={form} />
            
            <StatusFields form={form} />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full" />}
                {editingProduct ? 'Update' : 'Create'} Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
