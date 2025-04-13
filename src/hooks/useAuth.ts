
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { logout, updateAuthState } from '@/store/slices/authSlice';
import { isTokenExpired } from '@/utils/authUtils';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, token, error, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // Check authentication state on mount and when token changes
  useEffect(() => {
    dispatch(updateAuthState());
    
    // Check if token is expired
    if (token && isTokenExpired(token)) {
      handleLogout();
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(isAdmin ? '/auth/login' : '/login');
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
