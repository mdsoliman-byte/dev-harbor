
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductCategory, fetchProducts, fetchProductCategories } from '@/services/api/shop';
import { useToast } from '@/components/ui/use-toast';

interface ShopContextType {
  products: Product[];
  categories: ProductCategory[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

interface ShopProviderProps {
  children: ReactNode;
}

export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchProductCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      console.error('Error loading shop data:', err);
      setError('Failed to load shop data. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load shop data'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshProducts = async () => {
    await loadData();
  };

  const value = {
    products,
    categories,
    loading,
    error,
    refreshProducts
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
