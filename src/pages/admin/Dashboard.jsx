import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { features } from '../../lib/appwriteConfig';
import { listEnquiries, ENQUIRY_STATUSES, STATUS_LABELS } from '../../lib/enquiries';
import { listAllGalleryRows } from '../../lib/gallery';
import { listAnnouncements } from '../../lib/announcements';
import { describeError } from '../../lib/errors';
import { AdminNotice } from '../../components/admin/AdminNotice';
import { ConfigGate } from '../../components/admin/ConfigGate';
import { StatusBadge } from '../../components/admin/StatusBadge';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-forest/10 bg-white/70 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">{label}</p>
      <p className="mt-2 font-display text-3xl text-forest">{value}</p>
    </div>
  );
}

export function Dashboard() {
  const [data, setData] = useState({ status: 'loading', loadedAt: 0, enquiries: null, gallery: null, announcements: null, errors: [] });

  useEffect(() => {
    let cancelled = false;
    const errors = [];
    const guard = (enabled, label, fn) =>
      enabled
        ? fn().catch((error) => {
            errors.push(`${label}: ${describeError(error, 'could not be loaded')}`);
            return null;
          })
        : Promise.resolve(null);

    Promise.all([
      guard(features.enquiries, 'Enquiries', listEnquiries),
      guard(features.gallery, 'Gallery', listAllGalleryRows),
      guard(features.announcements, 'Announcements', listAnnouncements),
    ]).then(([enquiries, gallery, announcements]) => {
      if (!cancelled) setData({ status: 'ready', loadedAt: Date.now(), enquiries, gallery, announcements, errors });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (data.status === 'loading') {
    return (
      <div className="flex justify-center py-16" role="status">
        <LoaderCircle className="animate-spin text-forest" aria-hidden="true" />
        <span className="sr-only">Loading overview…</span>
      </div>
    );
  }

  const rows = data.enquiries?.rows ?? [];
  const counts = Object.fromEntries(ENQUIRY_STATUSES.map((s) => [s, rows.filter((r) => r.status === s).length]));
  const lastWeek = rows.filter((r) => data.loadedAt - new Date(r.$createdAt).getTime() < WEEK_MS).length;
  const activeAnnouncement = data.announcements?.find((a) => a.isActive);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl text-forest">Overview</h1>

      {data.errors.map((message) => (
        <AdminNotice key={message} tone="error">
          {message}
        </AdminNotice>
      ))}

      <section aria-labelledby="enq-heading" className="flex flex-col gap-4">
        <h2 id="enq-heading" className="text-xl text-forest">
          Admission enquiries
        </h2>
        <ConfigGate feature="enquiries">
          {data.enquiries && (
            <>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard label="Total" value={data.enquiries.total} />
                <StatCard label="Last 7 days" value={lastWeek} />
                <StatCard label={STATUS_LABELS.pending} value={counts.pending} />
                <StatCard label={STATUS_LABELS.enrolled} value={counts.enrolled} />
              </div>
              <div className="rounded-2xl border border-forest/10 bg-white/70">
                <div className="flex items-center justify-between px-5 py-4">
                  <h3 className="font-body text-sm font-semibold text-forest">Latest enquiries</h3>
                  <Link to="/admin/enquiries" className="text-sm font-medium text-forest underline underline-offset-2">
                    View all
                  </Link>
                </div>
                {rows.length === 0 ? (
                  <p className="px-5 pb-5 text-sm text-ink/60">No enquiries yet.</p>
                ) : (
                  <ul className="divide-y divide-forest/10">
                    {rows.slice(0, 5).map((row) => (
                      <li key={row.$id}>
                        <Link to={`/admin/enquiries/${row.$id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-forest/5">
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-forest">{row.parentName}</span>
                            <span className="block truncate text-xs text-ink/55">
                              {row.program} · {new Date(row.$createdAt).toLocaleDateString()}
                            </span>
                          </span>
                          <StatusBadge status={row.status} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </ConfigGate>
      </section>

      <section aria-labelledby="content-heading" className="flex flex-col gap-4">
        <h2 id="content-heading" className="text-xl text-forest">
          Website content
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-forest/10 bg-white/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">Gallery</p>
            {features.gallery ? (
              <p className="mt-2 text-sm text-ink/75">
                {data.gallery ? `${data.gallery.length} photos (${data.gallery.filter((g) => g.isPublished).length} published)` : 'Unavailable'}{' '}
                · <Link to="/admin/gallery" className="font-medium text-forest underline underline-offset-2">Manage</Link>
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink/60">Awaiting Appwrite configuration.</p>
            )}
          </div>
          <div className="rounded-2xl border border-forest/10 bg-white/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">Announcement</p>
            {features.announcements ? (
              <p className="mt-2 text-sm text-ink/75">
                {data.announcements ? (activeAnnouncement ? `Showing: “${activeAnnouncement.text}”` : 'None active (banner hidden)') : 'Unavailable'}{' '}
                · <Link to="/admin/announcements" className="font-medium text-forest underline underline-offset-2">Manage</Link>
              </p>
            ) : (
              <p className="mt-2 text-sm text-ink/60">Awaiting Appwrite configuration.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
