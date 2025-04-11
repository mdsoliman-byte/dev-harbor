
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { Product } from '@/services/api/shop';

interface ProductGridProps {
  filteredProducts: Product[];
  currentItems: Product[];
  onRequestAccess: (product: Product) => void;
  onResetFilters: () => void;
}

const ProductGrid = ({
  filteredProducts,
  currentItems,
  onRequestAccess,
  onResetFilters
}: ProductGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-12"
    >
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Popular Resources</h2>
        <div className="flex items-center mt-4 sm:mt-0">
          <span className="text-sm text-muted-foreground mr-2">
            {filteredProducts.length} products found
          </span>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-muted/30 rounded-lg">
          <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-2xl font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any products matching your search or filter criteria.
            Try adjusting your search or browse a different category.
          </p>
          <Button onClick={onResetFilters} className="mt-6">
            View All Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentItems.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product}
              index={index}
              onRequestAccess={onRequestAccess}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductGrid;
