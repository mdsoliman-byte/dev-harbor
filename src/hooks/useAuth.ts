
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '@/utils/authUtils';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication state on mount and when token changes
  useEffect(() => {
    // Placeholder for actual authentication check
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  }, [token]);

  const handleLogout = () => {
    // Placeholder for actual logout logic
    setIsAuthenticated(false);
    setIsAdmin(false);
    setToken(null);
    navigate('/auth/login');
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    error,
    isLoading,
    logout: handleLogout,
  };
};

export default useAuth;
