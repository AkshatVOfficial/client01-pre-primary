import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { useAuth } from './useAuth';
import { AdminNotice } from '../components/admin/AdminNotice';

/** Route guard: renders the nested admin routes only for a signed-in admin. */
export function RequireAdmin() {
  const { state, user, signOut } = useAuth();
  const location = useLocation();

  if (state === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status">
        <LoaderCircle className="animate-spin text-forest" aria-hidden="true" />
        <span className="sr-only">Checking your session…</span>
      </div>
    );
  }

  if (state === 'unconfigured' || state === 'anonymous' || state === 'mfa') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (state === 'forbidden') {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <AdminNotice
          tone="error"
          title="This account is not an administrator"
          action={
            <button type="button" onClick={signOut} className="font-semibold underline underline-offset-2">
              Sign out
            </button>
          }
        >
          {user?.email} is signed in but does not have the <code>admin</code> label in Appwrite, so it cannot
          open the dashboard.
        </AdminNotice>
      </div>
    );
  }

  return <Outlet />;
}

export default RequireAdmin;
