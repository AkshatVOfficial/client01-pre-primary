import { useCallback, useEffect, useState } from 'react';
import { LoaderCircle, Pencil, Plus, Trash2 } from 'lucide-react';
import {
  deleteAnnouncement,
  isSafeLink,
  listAnnouncements,
  saveAnnouncement,
  setAnnouncementActive,
} from '../../lib/announcements';
import { describeError } from '../../lib/errors';
import { AdminNotice } from '../../components/admin/AdminNotice';
import { ConfigGate } from '../../components/admin/ConfigGate';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';

const EMPTY = { text: '', linkLabel: '', linkTo: '', isActive: true };
const fieldClass = 'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm disabled:opacity-60';

function AnnouncementForm({ editing, onDone, onCancel }) {
  const [values, setValues] = useState(editing ?? EMPTY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (field) => (event) =>
    setValues((prev) => ({ ...prev, [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    if (!values.text.trim()) return setError('Please enter the announcement text.');
    if (values.linkTo && !values.linkLabel.trim()) return setError('Add link text, or clear the link.');
    if (!isSafeLink(values.linkTo.trim())) return setError('The link must start with "/" (a page on this site) or "https://".');
    setBusy(true);
    setError('');
    try {
      await saveAnnouncement(editing?.$id, values);
      onDone();
    } catch (err) {
      setError(describeError(err, 'Could not save the announcement.'));
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-3xl border border-forest/10 bg-white/70 p-6">
      <h2 className="text-xl text-forest">{editing ? 'Edit announcement' : 'New announcement'}</h2>
      <div>
        <label htmlFor="ann-text" className="mb-1.5 block text-sm font-medium text-forest">Text</label>
        <input id="ann-text" maxLength={300} value={values.text} onChange={set('text')} disabled={busy} className={fieldClass} placeholder="Admissions Open for the New Academic Session" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ann-label" className="mb-1.5 block text-sm font-medium text-forest">Link text <span className="font-normal text-ink/50">(optional)</span></label>
          <input id="ann-label" maxLength={50} value={values.linkLabel} onChange={set('linkLabel')} disabled={busy} className={fieldClass} placeholder="Enquire Now" />
        </div>
        <div>
          <label htmlFor="ann-link" className="mb-1.5 block text-sm font-medium text-forest">Link to <span className="font-normal text-ink/50">(optional)</span></label>
          <input id="ann-link" maxLength={200} value={values.linkTo} onChange={set('linkTo')} disabled={busy} className={fieldClass} placeholder="/contact" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-ink/80">
        <input type="checkbox" checked={values.isActive} onChange={set('isActive')} disabled={busy} className="h-4 w-4 accent-[#344E41]" />
        Show on the website
      </label>
      {error && <AdminNotice tone="error">{error}</AdminNotice>}
      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-light disabled:opacity-60">
          {busy && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />} Save
        </button>
        <button type="button" onClick={onCancel} disabled={busy} className="rounded-full border-2 border-forest/30 px-6 py-3 text-sm font-semibold text-forest">Cancel</button>
      </div>
    </form>
  );
}

function AnnouncementManager() {
  const [state, setState] = useState({ status: 'loading', rows: [], error: '' });
  const [form, setForm] = useState(null); // null | 'new' | row
  const [feedback, setFeedback] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    listAnnouncements()
      .then((rows) => setState({ status: 'ready', rows, error: '' }))
      .catch((error) => setState({ status: 'error', rows: [], error: describeError(error) }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggle(row) {
    setBusy(true);
    setFeedback(null);
    try {
      await setAnnouncementActive(row.$id, !row.isActive);
    } catch (error) {
      setFeedback({ tone: 'error', text: describeError(error, 'Could not update the announcement.') });
    } finally {
      setBusy(false);
      load();
    }
  }

  async function confirmDelete() {
    setBusy(true);
    try {
      await deleteAnnouncement(pendingDelete.$id);
    } catch (error) {
      setFeedback({ tone: 'error', text: describeError(error, 'Could not delete the announcement.') });
    } finally {
      setPendingDelete(null);
      setBusy(false);
      load();
    }
  }

  const activeCount = state.rows.filter((r) => r.isActive).length;

  return (
    <div className="flex flex-col gap-6">
      <AdminNotice tone="info">
        The website shows the <strong>newest active</strong> announcement. If none is active, the banner is hidden. If the
        announcements cannot be loaded, the website falls back to the banner text in <code>schoolConfig.js</code>.
        {activeCount > 1 && ` You currently have ${activeCount} active; only the newest is visible.`}
      </AdminNotice>

      {form ? (
        <AnnouncementForm
          key={form === 'new' ? 'new' : form.$id}
          editing={form === 'new' ? null : form}
          onCancel={() => setForm(null)}
          onDone={() => {
            setForm(null);
            load();
          }}
        />
      ) : (
        <button type="button" onClick={() => setForm('new')} className="inline-flex w-fit items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-light">
          <Plus size={16} aria-hidden="true" /> New announcement
        </button>
      )}

      {feedback && <AdminNotice tone={feedback.tone}>{feedback.text}</AdminNotice>}

      {state.status === 'loading' && (
        <div className="flex justify-center py-10" role="status">
          <LoaderCircle className="animate-spin text-forest" aria-hidden="true" />
          <span className="sr-only">Loading announcements…</span>
        </div>
      )}
      {state.status === 'error' && <AdminNotice tone="error" title="Could not load announcements">{state.error}</AdminNotice>}
      {state.status === 'ready' &&
        (state.rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-forest/20 py-10 text-center text-sm text-ink/60">No announcements yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {state.rows.map((row) => (
              <li key={row.$id} className="flex flex-col gap-3 rounded-2xl border border-forest/10 bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-forest">{row.text}</p>
                  <p className="text-xs text-ink/55">
                    {row.linkLabel && row.linkTo ? `${row.linkLabel} → ${row.linkTo} · ` : ''}
                    {new Date(row.$createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button type="button" role="switch" aria-checked={row.isActive} disabled={busy} onClick={() => toggle(row)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${row.isActive ? 'bg-forest text-cream' : 'bg-forest/10 text-forest'}`}>
                    {row.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button type="button" aria-label={`Edit announcement “${row.text}”`} onClick={() => setForm(row)} className="rounded-full border border-forest/20 p-2 text-forest"><Pencil size={14} aria-hidden="true" /></button>
                  <button type="button" aria-label={`Delete announcement “${row.text}”`} onClick={() => setPendingDelete(row)} className="rounded-full border border-terracotta-dark/40 p-2 text-terracotta-dark"><Trash2 size={14} aria-hidden="true" /></button>
                </div>
              </li>
            ))}
          </ul>
        ))}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        busy={busy}
        title="Delete this announcement?"
        message="It will be removed permanently. To hide it temporarily, set it to Inactive instead."
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export function Announcements() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl text-forest">Announcements</h1>
      <ConfigGate feature="announcements">
        <AnnouncementManager />
      </ConfigGate>
    </div>
  );
}

export default Announcements;
