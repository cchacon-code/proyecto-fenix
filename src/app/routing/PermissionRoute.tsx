import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { canAccess } from '../../auth/permissions';

export function PermissionRoute({ permission }: { permission: string }) {
  const { user } = useAuth();

  if (!user || !canAccess(user.permissions, permission)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return <Outlet />;
}
