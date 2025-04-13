
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '../form/productFormSchema';

interface StatusFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

const StatusFields = ({ form }: StatusFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="in_stock"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>In Stock</FormLabel>
              <p className="text-sm text-muted-foreground">
                Is this product available for purchase?
              </p>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Featured Product</FormLabel>
              <p className="text-sm text-muted-foreground">
                This product will be displayed in the featured section
              </p>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default StatusFields;
