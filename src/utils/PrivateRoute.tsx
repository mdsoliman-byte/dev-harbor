
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const accessToken = localStorage.getItem('access_token');
  const userType = localStorage.getItem('user_type');

  // Redirect to login if not authenticated
  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect to home if not an admin
  if (userType !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
