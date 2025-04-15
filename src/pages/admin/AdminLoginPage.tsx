
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import LoginHeader from '@/components/admin/auth/LoginHeader';
import LoginForm from '@/components/admin/auth/LoginForm';
import LoginFooter from '@/components/admin/auth/LoginFooter';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if already logged in
  useEffect(() => {
    // Placeholder for actual authentication check
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background relative">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-[-1]">
        <img 
          src="/lovable-uploads/dbb9c6f1-19d1-4aee-affb-58277850d8f7.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-background/60 dark:bg-background/80 backdrop-blur-sm"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 sm:p-10">
          <LoginHeader />
          <LoginForm />
          <LoginFooter />
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
