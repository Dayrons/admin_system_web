import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};