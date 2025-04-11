
import { motion } from 'framer-motion';
import { Library, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShopHero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden mb-16 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Unleash Your Creativity <span className="text-primary">With Digital Resources</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Browse our collection of high-quality digital resources designed to enhance your knowledge and skills.
            Request access to any product that interests you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="font-medium">
              <Library className="mr-2 h-4 w-4" />
              Browse Library
            </Button>
            <Button size="lg" variant="outline" className="font-medium">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-64 w-full md:h-72 lg:h-80">
            <img 
              src="/lovable-uploads/03071016-242b-4c82-a634-de51f3580f2e.png" 
              alt="PDF Library" 
              className="absolute top-0 right-0 h-full object-contain"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopHero;
