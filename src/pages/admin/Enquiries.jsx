import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoaderCircle, Search } from 'lucide-react';
import { listEnquiries, ENQUIRY_STATUSES, STATUS_LABELS } from '../../lib/enquiries';
import { describeError } from '../../lib/errors';
import { AdminNotice } from '../../components/admin/AdminNotice';
import { ConfigGate } from '../../components/admin/ConfigGate';
import { StatusBadge } from '../../components/admin/StatusBadge';

function EnquiryList() {
  const [state, setState] = useState({ status: 'loading', rows: [], total: 0, error: '' });
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchRows = useCallback(
    () =>
      listEnquiries()
        .then(({ rows, total }) => setState({ status: 'ready', rows, total, error: '' }))
        .catch((error) => setState({ status: 'error', rows: [], total: 0, error: describeError(error) })),
    [],
  );

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const retry = () => {
    setState({ status: 'loading', rows: [], total: 0, error: '' });
    fetchRows();
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return state.rows.filter((row) => {
      if (statusFilter !== 'all' && row.status !== statusFilter) return false;
      if (!needle) return true;
      return [row.parentName, row.phone, row.program, row.childAge, row.message].some((field) =>
        String(field ?? '').toLowerCase().includes(needle),
      );
    });
  }, [state.rows, query, statusFilter]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="enq-search" className="sr-only">
            Search enquiries
          </label>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden="true" />
          <input
            id="enq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, phone, program, message…"
            className="w-full rounded-full border border-forest/15 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-forest/40"
          />
        </div>
        <div>
          <label htmlFor="enq-status" className="sr-only">
            Filter by status
          </label>
          <select
            id="enq-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-full border border-forest/15 bg-white px-4 py-2.5 text-sm sm:w-auto"
          >
            <option value="all">All statuses</option>
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state.status === 'loading' && (
        <div className="flex justify-center py-12" role="status">
          <LoaderCircle className="animate-spin text-forest" aria-hidden="true" />
          <span className="sr-only">Loading enquiries…</span>
        </div>
      )}

      {state.status === 'error' && (
        <AdminNotice
          tone="error"
          title="Could not load enquiries"
          action={
            <button type="button" onClick={retry} className="font-semibold underline underline-offset-2">
              Try again
            </button>
          }
        >
          {state.error}
        </AdminNotice>
      )}

      {state.status === 'ready' && (
        <>
          {state.total > state.rows.length && (
            <AdminNotice tone="info">
              Showing the newest {state.rows.length} of {state.total} enquiries.
            </AdminNotice>
          )}
          <p className="text-sm text-ink/60" aria-live="polite">
            {visible.length} of {state.rows.length} enquiries
          </p>
          {visible.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-forest/20 py-12 text-center text-sm text-ink/60">
              {state.rows.length === 0 ? 'No enquiries yet.' : 'No enquiries match your search or filter.'}
            </p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-forest/10 bg-white/70">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-forest/10 text-xs uppercase tracking-wider text-ink/55">
                  <tr>
                    <th scope="col" className="px-4 py-3">Date</th>
                    <th scope="col" className="px-4 py-3">Parent</th>
                    <th scope="col" className="px-4 py-3">Phone</th>
                    <th scope="col" className="px-4 py-3">Program</th>
                    <th scope="col" className="px-4 py-3">Status</th>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Open</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  {visible.map((row) => (
                    <tr key={row.$id} className="hover:bg-forest/5">
                      <td className="whitespace-nowrap px-4 py-3 text-ink/65">{new Date(row.$createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-medium text-forest">{row.parentName}</td>
                      <td className="whitespace-nowrap px-4 py-3">{row.phone}</td>
                      <td className="px-4 py-3">{row.program}</td>
                      <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/admin/enquiries/${row.$id}`} className="font-semibold text-forest underline underline-offset-2">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function Enquiries() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl text-forest">Admission enquiries</h1>
      <ConfigGate feature="enquiries">
        <EnquiryList />
      </ConfigGate>
    </div>
  );
}

export default Enquiries;
