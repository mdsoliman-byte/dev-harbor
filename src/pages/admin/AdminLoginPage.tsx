
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { RootState, AppDispatch } from '@/store';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await dispatch(loginUser({ email, password }));
    
    if (loginUser.fulfilled.match(result)) {
      const user = result.payload.user;
      
      if (user && user.user_type === 'admin') {
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin dashboard',
        });
        navigate('/admin/dashboard', { replace: true });
      } else {
        toast({
          title: 'Access denied',
          description: 'You do not have admin privileges',
          variant: 'destructive',
        });
      }
    }
  };

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
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock className="h-5 w-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <Button 
                type="submit" 
                className="w-full relative overflow-hidden group"
                disabled={isLoading}
              >
                <span className="relative z-10">
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </span>
                <span className="absolute inset-0 bg-primary-foreground/10 rounded-md translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </motion.div>
          </motion.form>
          
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
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
