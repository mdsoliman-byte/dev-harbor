
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PromotionalBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16 bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 md:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Premium Resources <span className="text-amber-500">50% off</span> now!
          </h2>
          <p className="text-muted-foreground mb-4 md:mb-6">
            Limited time offer on our most popular resources. Don't miss this opportunity!
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-amber-500 hover:bg-amber-600">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Get Discount
            </Button>
            <Button variant="outline">
              View Offers
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            alt="Special Offer Books"
            className="h-40 md:h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PromotionalBanner;
