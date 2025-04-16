
import { motion } from 'framer-motion';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <motion.h1 
        className="text-2xl sm:text-3xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Admin Login
      </motion.h1>
      <motion.p 
        className="text-sm sm:text-base text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Sign in to access the admin dashboard
      </motion.p>
    </div>
  );
};

export default LoginHeader;
