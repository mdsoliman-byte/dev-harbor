
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import StarRating from './StarRating';
import { getCategoryIcon } from './CategorySection';
import { Product } from '@/services/api/shop';

interface ProductCardProps {
  product: Product;
  index: number;
  onRequestAccess: (product: Product) => void;
  
}

const ProductCard = ({ product, index, onRequestAccess }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover-lift h-full flex flex-col">
        <div className="aspect-[3/4] relative overflow-hidden bg-muted">
          <img 
            src={product.image || "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
              {/* {product.category} */}

             {product.category?.name || "Unknown Category"}
            </span>
          </div>
        </div>
        
        <CardHeader className="p-4 pb-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">
              ID: {product.id}
            </span>
            {product.featured && (
              <span className="text-xs font-medium px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                Featured
              </span>
            )}
          </div>
          <StarRating rating={4.5} />
          <h3 className="font-semibold text-lg mt-2 line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-3">
            <div className="text-xs flex items-center text-muted-foreground">
              {getCategoryIcon(product.category?.slug || "")}
              <span className="ml-1">{product.category?.name}</span>
            </div>
            <div className="font-semibold">
              {product.sale_price !== null ? (
                <div className="flex flex-col items-end">
                  <span className="line-through text-xs text-muted-foreground">${product.price}</span>
                  <span className="text-green-500">${product.sale_price}</span>
                </div>
              ) : (
                <span>${product.price}</span>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full"
            onClick={() => onRequestAccess(product)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Request Access
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
