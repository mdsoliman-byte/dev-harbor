
import { motion } from 'framer-motion';

const LoginFooter = () => {
  return (
    <motion.div 
      className="mt-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <p className="text-sm text-muted-foreground">
        Return to <a href="/" className="text-primary hover:underline">website</a>
      </p>
    </motion.div>
  );
};

export default LoginFooter;
