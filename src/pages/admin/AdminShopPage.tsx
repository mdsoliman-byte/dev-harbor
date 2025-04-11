
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Pencil, Trash, ShoppingBag, FileText } from 'lucide-react';
import { 
  Product, 
  fetchProducts, 
  fetchProductCategories, 
  createProduct,
  updateProduct,
  deleteProduct
} from '@/services/api/shop';
import { useToast } from '@/components/ui/use-toast';
import ProductRequestManagement from '@/components/admin/shop/ProductRequestManagement';

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

type FormValues = z.infer<typeof formSchema>;

const AdminShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
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

  useEffect(() => {
    fetchProductData();
    fetchCategoryData();
  }, []);

  useEffect(() => {
    if (dialogOpen && editingProduct) {
      form.reset({
        title: editingProduct.title,
        slug: editingProduct.slug,
        description: editingProduct.description,
        price: editingProduct.price,
        sale_price: editingProduct.sale_price,
        image: editingProduct.image,
        category: editingProduct.category,
        in_stock: editingProduct.in_stock,
        featured: editingProduct.featured,
      });
    } else if (dialogOpen && !editingProduct) {
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
  }, [dialogOpen, editingProduct, form]);

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

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
    } else {
      setEditingProduct(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    form.reset();
  };

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

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const formData: Partial<Product> = {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: data.price,
        sale_price: data.sale_price,
        image: data.image,
        category: data.category,
        in_stock: data.in_stock,
        featured: data.featured,
      };

      if (editingProduct) {
        await updateProduct(editingProduct.slug, formData);
        toast({
          title: 'Success',
          description: 'Product updated successfully',
        });
      } else {
        await createProduct(formData);
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
      }
      fetchProductData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: 'Failed to save product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
      setLoading(true);
      try {
        await deleteProduct(product.slug);
        toast({
          title: 'Success',
          description: 'Product deleted successfully',
        });
        fetchProductData();
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shop Management</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid w-full md:w-auto grid-cols-2 md:flex">
          <TabsTrigger value="products" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Access Requests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage your shop products</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && products.length === 0 ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>In Stock</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>
                              {product.sale_price !== null ? (
                                <div>
                                  <span className="line-through text-muted-foreground">${product.price}</span>
                                  <span className="ml-2 text-green-500">${product.sale_price}</span>
                                </div>
                              ) : (
                                <span>${product.price}</span>
                              )}
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.in_stock ? 'Yes' : 'No'}</TableCell>
                            <TableCell>{product.featured ? 'Yes' : 'No'}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(product)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">No products found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <ProductRequestManagement />
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Create Product'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          onBlur={() => !editingProduct && generateSlug()}
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
                              onClick={generateSlug}
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sale_price"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Sale Price ($) - Optional</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            {...field} 
                            value={field.value === null ? '' : field.value}
                            onChange={(e) => {
                              const value = e.target.value === '' ? null : parseFloat(e.target.value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

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
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <DialogFooter>
                <Button variant="outline" type="button" onClick={handleCloseDialog}>
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
    </div>
  );
};

export default AdminShopPage;
