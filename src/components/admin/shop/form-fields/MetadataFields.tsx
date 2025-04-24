
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from '../form/productFormSchema';
import { fetchProductCategories } from '@/services/api/shop/productsService';

interface MetadataFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

const MetadataFields = ({ form }: MetadataFieldsProps) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchProductCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <div className="flex flex-wrap gap-2">
              {categories.map((category: any) => (
                <Button
                  key={category.id}
                  variant={field.value.name === category.name ? 'default' : 'outline'}
                  onClick={() => {
                    form.setValue('category', category);
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MetadataFields;
