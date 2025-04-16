
import { useState, useEffect } from 'react';
import { 
  Product, 
  fetchProducts, 
  fetchProductCategories,
  createProduct,
  updateProduct,
  deleteProduct
} from '@/services/api/shop';
import { useToast } from '@/hooks/use-toast';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const data = await fetchProductCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, []);

  const handleCreateProduct = async (formData: Partial<Product>) => {
    setLoading(true);
    try {
      await createProduct(formData);
      toast({
        title: 'Success',
        description: 'Product created successfully',
      });
      await fetchProductData();
      return true;
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to create product',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (slug: string, formData: Partial<Product>) => {
    setLoading(true);
    try {
      await updateProduct(slug, formData);
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      });
      await fetchProductData();
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      setLoading(true);
      try {
        await deleteProduct(product.slug);
        toast({
          title: 'Success',
          description: 'Product deleted successfully',
        });
        await fetchProductData();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete product',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    products,
    categories,
    loading,
    fetchProductData,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct
  };
};
