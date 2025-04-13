
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const PrivateRoute = () => {
  const { isAuthenticated, isAdmin, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  
  // Show loading while checking auth status
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated or not an admin
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
