
import { useState, useEffect } from 'react';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Eye, MailOpen, Mail, AlertCircle } from 'lucide-react';
import { ProductRequest, fetchProductRequests, updateProductRequestStatus, fetchProducts, Product } from '@/services/api/shop';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const ProductRequestManagement = () => {
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

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
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

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Product Access Requests</CardTitle>
          <CardDescription>Manage incoming requests for product access</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No requests found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        {request.createdAt 
                          ? format(new Date(request.createdAt), 'MMM d, yyyy') 
                          : 'Unknown date'}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.name}</div>
                          <div className="text-sm text-muted-foreground">{request.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getProductTitle(request.productId)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewDetails(request)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status !== 'approved' && (
                            <Button
                              variant="outline" 
                              size="icon"
                              className="text-green-500 hover:text-green-700"
                              onClick={() => handleUpdateStatus(request.id!, 'approved')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {request.status !== 'rejected' && (
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleUpdateStatus(request.id!, 'rejected')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              {selectedRequest?.status === 'pending' ? (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              ) : selectedRequest?.status === 'approved' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              Request Details
            </SheetTitle>
            <SheetDescription>
              {selectedRequest && (
                <Badge className={
                  selectedRequest.status === 'approved' ? 'bg-green-500' :
                  selectedRequest.status === 'rejected' ? 'bg-red-500' :
                  'bg-yellow-500'
                }>
                  {selectedRequest.status || 'Pending'}
                </Badge>
              )}
            </SheetDescription>
          </SheetHeader>
          
          {selectedRequest && (
            <div className="py-6 space-y-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
                <p className="text-base font-medium">{getProductTitle(selectedRequest.productId)}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {selectedRequest.name}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {selectedRequest.email}
                  </p>
                  {selectedRequest.phone && (
                    <p className="text-sm flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {selectedRequest.phone}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Message</h3>
                <p className="text-sm p-3 bg-muted rounded-md whitespace-pre-wrap">
                  {selectedRequest.message}
                </p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">Request Date</h3>
                <p className="text-sm">
                  {selectedRequest.createdAt 
                    ? format(new Date(selectedRequest.createdAt), 'MMMM d, yyyy, h:mm a') 
                    : 'Unknown date'}
                </p>
              </div>
            </div>
          )}
          
          <SheetFooter className="flex space-x-2">
            {selectedRequest && selectedRequest.status !== 'approved' && (
              <Button onClick={() => handleUpdateStatus(selectedRequest.id!, 'approved')}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
            )}
            {selectedRequest && selectedRequest.status !== 'rejected' && (
              <Button variant="outline" onClick={() => handleUpdateStatus(selectedRequest.id!, 'rejected')}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            )}
            <Button variant="secondary" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductRequestManagement;
