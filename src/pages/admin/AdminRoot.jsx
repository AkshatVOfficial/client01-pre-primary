import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../auth/AuthProvider';

/** Wraps every /admin route so the public site never touches the auth API. */
export function AdminRoot() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default AdminRoot;
