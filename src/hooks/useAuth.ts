
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/store/authSlice';
import { isTokenExpired } from '@/utils/authUtils';
import { AppDispatch, RootState } from '@/store/store';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const { token, isAuthenticated } = auth;
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication state on mount and when token changes
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  }, [token]);

  const handleLogin = (token: string) => {
    dispatch(login(token));
    localStorage.setItem('token', token);
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    setIsAdmin(false);
    navigate('/auth/login');
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    error,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    token,
  };
};

export default useAuth;
