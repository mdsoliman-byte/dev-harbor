
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16 p-8 border border-border rounded-lg bg-muted/30 text-center"
    >
      <h2 className="text-2xl font-semibold mb-4">Can't find what you're looking for?</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Our library is constantly updated with new resources. If you're looking for something specific,
        let us know and we'll help you find it or create it.
      </p>
      <Button size="lg">
        <Mail className="mr-2 h-4 w-4" />
        Contact Us
      </Button>
    </motion.div>
  );
};

export default CallToActionSection;
