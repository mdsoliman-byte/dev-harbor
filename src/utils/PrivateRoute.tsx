
import { Navigate, Outlet } from 'react-router-dom';
import { isAdminAuthenticated } from '@/services/api';

const PrivateRoute = () => {
  return isAdminAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
