
import { Navigate, Outlet } from 'react-router-dom';
import { isAdminAuthenticated } from '@/services/api';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check authentication status
    const authStatus = isAdminAuthenticated();
    setIsAuthenticated(authStatus);
  }, []);
  
  // Show loading while checking auth status
  if (isAuthenticated === null) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
