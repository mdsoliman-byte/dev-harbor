
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Newsletter = () => {
  const isMobile = useIsMobile();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-12 md:mt-20 bg-secondary/50 rounded-xl p-6 md:p-8 lg:p-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold mb-2 md:mb-4">
          Subscribe to our newsletter
        </h3>
        
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-8 max-w-lg mx-auto">
          Get notified when we publish new articles. No spam, just quality content about farming, agriculture, and sustainable practices.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
            aria-label="Email address"
          />
          <Button type="submit" className="whitespace-nowrap">
            {isMobile ? "Subscribe" : "Get Updates"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default Newsletter;
