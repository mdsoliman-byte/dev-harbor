
import React from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './productFormSchema';
import { Product } from '@/services/api/shop';
import BasicInfoFields from '../form-fields/BasicInfoFields';
import DescriptionField from '../form-fields/DescriptionField';
import PriceFields from '../form-fields/PriceFields';
import MetadataFields from '../form-fields/MetadataFields';
import StatusFields from '../form-fields/StatusFields';
import { DialogFooter } from '@/components/ui/dialog';

interface ProductFormContentProps {
  form: UseFormReturn<ProductFormValues>;
  editingProduct: Product | null;
  onGenerateSlug: () => void;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProductFormContent = ({
  form,
  editingProduct,
  onGenerateSlug,
  loading,
  onCancel,
  onSubmit
}: ProductFormContentProps) => {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <BasicInfoFields 
          form={form} 
          editingProduct={!!editingProduct} 
          onGenerateSlug={onGenerateSlug} 
        />
        
        <DescriptionField form={form} />
        
        <PriceFields form={form} />
        
        <MetadataFields form={form} />
        
        <StatusFields form={form} />

        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full" />}
            {editingProduct ? 'Update' : 'Create'} Product
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ProductFormContent;
