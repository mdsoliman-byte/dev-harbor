import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as reduxLogin } from '@/store/authSlice';
import * as authService from '@/services/api/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const user = await authService.login(email, password);

      if (user.user_type === 'admin') {
        dispatch(reduxLogin(user.token));
        navigate('/admin/dashboard');
      } else if (user.user_type === 'manager') {
        navigate('/manager');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid user type",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
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
        >
          <span className="relative z-10">
            Sign in
          </span>
          <span className="absolute inset-0 bg-primary-foreground/10 rounded-md translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
