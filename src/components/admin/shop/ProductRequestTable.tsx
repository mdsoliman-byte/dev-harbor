
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { ProductRequest, Product } from '@/services/api/shop';
import { format } from 'date-fns';

interface ProductRequestTableProps {
  requests: ProductRequest[];
  loading: boolean;
  getProductTitle: (productId: number) => string;
  handleViewDetails: (request: ProductRequest) => void;
  handleUpdateStatus: (id: number, status: 'pending' | 'approved' | 'rejected') => void;
}

const ProductRequestTable = ({ 
  requests, 
  loading, 
  getProductTitle, 
  handleViewDetails, 
  handleUpdateStatus 
}: ProductRequestTableProps) => {
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

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No requests found</p>
      </div>
    );
  }

  return (
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
  );
};

export default ProductRequestTable;
