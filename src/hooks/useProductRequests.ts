
import { useState, useEffect } from 'react';
import { ProductRequest, fetchProductRequests, updateProductRequestStatus, fetchProducts, Product } from '@/services/api/shop';
import { useToast } from '@/hooks/use-toast';

export const useProductRequests = () => {
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ProductRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [requestsData, productsData] = await Promise.all([
        fetchProductRequests(),
        fetchProducts()
      ]);
      setRequests(requestsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading request data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load request data'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getProductTitle = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.title : 'Unknown Product';
  };

  const handleViewDetails = (request: ProductRequest) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  const handleUpdateStatus = async (id: number, status: 'pending' | 'approved' | 'rejected') => {
    try {
      const updatedRequest = await updateProductRequestStatus(id, status);
      setRequests(requests.map(req => req.id === id ? updatedRequest : req));
      
      if (selectedRequest?.id === id) {
        setSelectedRequest(updatedRequest);
      }
      
      toast({
        title: 'Status Updated',
        description: `Request successfully marked as ${status}`
      });
    } catch (error) {
      console.error('Error updating request status:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update request status'
      });
    }
  };

  return {
    requests,
    products,
    loading,
    selectedRequest,
    detailsOpen,
    setDetailsOpen,
    getProductTitle,
    handleViewDetails,
    handleUpdateStatus
  };
};
