
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductRequestForm from './ProductRequestForm';
import { Product } from '@/services/api/shop';

interface ProductRequestModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductRequestModal = ({
  isOpen,
  setIsOpen,
  selectedProduct,
  onSuccess,
  onCancel
}: ProductRequestModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Product Access</DialogTitle>
          <DialogDescription>
            {selectedProduct && (
              <div className="mt-2">
                <span className="font-medium">{selectedProduct.title}</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedProduct.description}
                </p>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        {selectedProduct && (
          <ProductRequestForm 
            product={selectedProduct} 
            onSuccess={onSuccess} 
            onCancel={onCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductRequestModal;
