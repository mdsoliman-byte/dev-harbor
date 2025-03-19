
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Newsletter = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-20 bg-secondary/50 rounded-xl p-8 md:p-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
          Subscribe to our newsletter
        </h3>
        
        <p className="text-muted-foreground mb-8">
          Get notified when we publish new articles. No spam, just quality content about farming, agriculture, and sustainable practices.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            required
          />
          <Button type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default Newsletter;
