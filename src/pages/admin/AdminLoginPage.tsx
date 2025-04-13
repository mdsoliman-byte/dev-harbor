
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '@/store/slices/authSlice';
import { RootState, AppDispatch } from '@/store';
import { useToast } from '@/hooks/use-toast';
import LoginHeader from '@/components/admin/auth/LoginHeader';
import LoginForm from '@/components/admin/auth/LoginForm';
import LoginFooter from '@/components/admin/auth/LoginFooter';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  
  const { isLoading, isAuthenticated, isAdmin, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Check if already logged in
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Show error toast when auth error occurs
  useEffect(() => {
    if (error) {
      toast({
        title: 'Login failed',
        description: error,
        variant: 'destructive',
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

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
