import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingBag, FileText, Palette } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Product } from '@/services/api/shop';
import ProductTable from '@/components/admin/shop/ProductTable';
import ProductForm from '@/components/admin/shop/ProductForm';
import ProductRequestManagement from '@/components/admin/shop/ProductRequestManagement';
import ThemeSettingsForm from '@/components/admin/theme/ThemeSettingsForm';
import { useProducts } from '@/hooks/useProducts';
import { ProductFormValues } from '@/components/admin/shop/form/productFormSchema';

const AdminShopPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("products");
  
  const { 
    products, 
    loading, 
    handleCreateProduct, 
    handleUpdateProduct, 
    handleDeleteProduct 
  } = useProducts();

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
    }
    setDialogOpen(true);
  };

 const handleFormSubmit = async (data: ProductFormValues) => {
    const productData: Partial<Product> = {
      ...data,
      category: {
        id: 0,
        name: data.category.name,
        slug: data.category.name.toLowerCase().replace(/\s+/g, '-')
      }
    };

    if (editingProduct) {
      await handleUpdateProduct(editingProduct.slug, productData);
    } else {
      await handleCreateProduct(productData);
    }
    setDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shop Management</h1>
        {activeTab === "products" && (
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        )}
      </div>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:flex">
          <TabsTrigger value="products" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Access Requests
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            Theme Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your shop products</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductTable 
                products={products} 
                loading={loading}
                onEdit={handleOpenDialog}
                onDelete={handleDeleteProduct}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <ProductRequestManagement />
        </TabsContent>

        <TabsContent value="theme">
          <ThemeSettingsForm />
        </TabsContent>
      </Tabs>

      <ProductForm 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        loading={loading}
        editingProduct={editingProduct}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default AdminShopPage;
