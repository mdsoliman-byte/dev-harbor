
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useProductRequests } from '@/hooks/useProductRequests';
import ProductRequestTable from './ProductRequestTable';
import RequestDetailsSheet from './RequestDetailsSheet';

const ProductRequestManagement = () => {
  const {
    requests,
    loading,
    selectedRequest,
    detailsOpen,
    setDetailsOpen,
    getProductTitle,
    handleViewDetails,
    handleUpdateStatus
  } = useProductRequests();

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Product Access Requests</CardTitle>
          <CardDescription>Manage incoming requests for product access</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductRequestTable
            requests={requests}
            loading={loading}
            getProductTitle={getProductTitle}
            handleViewDetails={handleViewDetails}
            handleUpdateStatus={handleUpdateStatus}
          />
        </CardContent>
      </Card>

      <RequestDetailsSheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        selectedRequest={selectedRequest}
        getProductTitle={getProductTitle}
        handleUpdateStatus={handleUpdateStatus}
      />
    </>
  );
};

export default ProductRequestManagement;
