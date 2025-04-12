
import React from 'react';
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
import { CheckCircle, XCircle, User, Mail, Phone, AlertCircle } from 'lucide-react';
import { ProductRequest } from '@/services/api/shop';
import { format } from 'date-fns';

interface RequestDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: ProductRequest | null;
  getProductTitle: (productId: number) => string;
  handleUpdateStatus: (id: number, status: 'pending' | 'approved' | 'rejected') => void;
}

const RequestDetailsSheet = ({
  open,
  onOpenChange,
  selectedRequest,
  getProductTitle,
  handleUpdateStatus
}: RequestDetailsSheetProps) => {
  if (!selectedRequest) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {selectedRequest.status === 'pending' ? (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            ) : selectedRequest.status === 'approved' ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            Request Details
          </SheetTitle>
          <SheetDescription>
            <Badge className={
              selectedRequest.status === 'approved' ? 'bg-green-500' :
              selectedRequest.status === 'rejected' ? 'bg-red-500' :
              'bg-yellow-500'
            }>
              {selectedRequest.status || 'Pending'}
            </Badge>
          </SheetDescription>
        </SheetHeader>
        
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
        
        <SheetFooter className="flex space-x-2">
          {selectedRequest.status !== 'approved' && (
            <Button onClick={() => handleUpdateStatus(selectedRequest.id!, 'approved')}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          )}
          {selectedRequest.status !== 'rejected' && (
            <Button variant="outline" onClick={() => handleUpdateStatus(selectedRequest.id!, 'rejected')}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          )}
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RequestDetailsSheet;
