
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/services/api/shop';
import { ProductFormValues } from './form/productFormSchema';
import { useProductForm } from './form/useProductForm';
import ProductFormContent from './form/ProductFormContent';

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
  const { form, generateSlug, handleSubmit } = useProductForm({
    editingProduct,
    onSubmit,
    open
  });

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
        </DialogHeader>
        <ProductFormContent
          form={form}
          editingProduct={editingProduct}
          onGenerateSlug={generateSlug}
          loading={loading}
          onCancel={handleClose}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
