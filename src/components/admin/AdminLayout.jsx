import { NavLink, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Inbox, Images, LayoutDashboard, LogOut, Megaphone, ExternalLink, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { schoolConfig } from '../../config/schoolConfig';
import { useAuth } from '../../auth/useAuth';
import { AdminNotice } from './AdminNotice';

const NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/admin/security', label: 'Security', icon: ShieldCheck },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>Admin | {schoolConfig.identity.name}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="border-b border-forest/10 bg-white/80">
        <div className="container-site flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="font-display text-lg text-forest">
            {schoolConfig.identity.shortName} <span className="text-ink/50">· Admin</span>
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-ink/60 sm:inline">{user?.email}</span>
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-forest hover:underline">
              View site <ExternalLink size={14} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-forest/25 px-3.5 py-1.5 font-semibold text-forest hover:border-forest"
            >
              <LogOut size={14} aria-hidden="true" /> Log out
            </button>
          </div>
        </div>
        <nav aria-label="Admin" className="container-site flex gap-1 overflow-x-auto pb-2">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-forest text-cream' : 'text-ink/70 hover:bg-forest/10 hover:text-forest'
                }`
              }
            >
              <Icon size={16} aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="container-site flex flex-col gap-6 py-8">
        {user && user.mfa === false && (
          <AdminNotice tone="info" title="Two-factor authentication is not enabled on this account">
            <span className="inline-flex items-center gap-1.5">
              <ShieldAlert size={14} aria-hidden="true" /> Protect the enquiry data:{' '}
              <Link to="/admin/security" className="font-semibold underline underline-offset-2">
                turn on two-factor authentication
              </Link>
              .
            </span>
          </AdminNotice>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
