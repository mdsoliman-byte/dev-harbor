
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '../ProductForm';

interface BasicInfoFieldsProps {
  form: UseFormReturn<ProductFormValues>;
  editingProduct: boolean;
  onGenerateSlug: () => void;
}

const BasicInfoFields = ({ form, editingProduct, onGenerateSlug }: BasicInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                onBlur={() => !editingProduct && onGenerateSlug()}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl>
              <div className="flex space-x-2">
                <Input {...field} />
                {!editingProduct && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onGenerateSlug}
                  >
                    Generate
                  </Button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
