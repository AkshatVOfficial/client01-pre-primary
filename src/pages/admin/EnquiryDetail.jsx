import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, LoaderCircle, MessageCircle, Phone, Trash2 } from 'lucide-react';
import { getEnquiry, updateEnquiry, deleteEnquiry, ENQUIRY_STATUSES, STATUS_LABELS } from '../../lib/enquiries';
import { describeError } from '../../lib/errors';
import { buildWhatsAppLink } from '../../utils/whatsapp';
import { AdminNotice } from '../../components/admin/AdminNotice';
import { ConfigGate } from '../../components/admin/ConfigGate';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';
import { StatusBadge } from '../../components/admin/StatusBadge';

/** Indian 10-digit numbers get the 91 country code; anything else is used as typed (digits only). */
function toWhatsAppNumber(phone) {
  const digits = String(phone).replace(/\D/g, '');
  return digits.length === 10 ? `91${digits}` : digits;
}

function Field({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/55">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap break-words text-sm text-ink">{children || '—'}</dd>
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ status: 'loading', row: null, error: '' });
  const [status, setStatus] = useState('pending');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getEnquiry(id)
      .then((row) => {
        if (cancelled) return;
        setState({ status: 'ready', row, error: '' });
        setStatus(row.status);
        setNotes(row.adminNotes ?? '');
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', row: null, error: describeError(error) });
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);
    try {
      const row = await updateEnquiry(id, { status, adminNotes: notes.trim() });
      setState({ status: 'ready', row, error: '' });
      setFeedback({ tone: 'success', text: 'Changes saved.' });
    } catch (error) {
      setFeedback({ tone: 'error', text: describeError(error, 'Could not save changes.') });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteEnquiry(id);
      navigate('/admin/enquiries', { replace: true });
    } catch (error) {
      setConfirmDelete(false);
      setDeleting(false);
      setFeedback({ tone: 'error', text: describeError(error, 'Could not delete this enquiry.') });
    }
  }

  if (state.status === 'loading') {
    return (
      <div className="flex justify-center py-16" role="status">
        <LoaderCircle className="animate-spin text-forest" aria-hidden="true" />
        <span className="sr-only">Loading enquiry…</span>
      </div>
    );
  }
  if (state.status === 'error') {
    return <AdminNotice tone="error" title="Could not load this enquiry">{state.error}</AdminNotice>;
  }

  const { row } = state;
  const waLink = buildWhatsAppLink(
    `Hello ${row.parentName}, thank you for your enquiry about ${row.program}. `,
    toWhatsAppNumber(row.phone),
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="flex flex-col gap-5 rounded-3xl border border-forest/10 bg-white/70 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl text-forest">{row.parentName}</h2>
          <StatusBadge status={row.status} />
        </div>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone">{row.phone}</Field>
          <Field label="Received">{new Date(row.$createdAt).toLocaleString()}</Field>
          <Field label="Child's age">{row.childAge}</Field>
          <Field label="Program">{row.program}</Field>
          <div className="sm:col-span-2">
            <Field label="Message">{row.message}</Field>
          </div>
          <Field label="Consent to be contacted">{row.consent ? 'Yes' : 'No'}</Field>
        </dl>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${row.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 rounded-full border-2 border-forest/30 px-5 py-2.5 text-sm font-semibold text-forest hover:border-forest">
            <Phone size={16} aria-hidden="true" /> Call
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
            <MessageCircle size={16} aria-hidden="true" /> WhatsApp
          </a>
        </div>
      </section>

      <form onSubmit={handleSave} className="flex flex-col gap-4 rounded-3xl border border-forest/10 bg-white/70 p-6">
        <h2 className="text-xl text-forest">Manage</h2>
        <div>
          <label htmlFor="enq-status-edit" className="mb-1.5 block text-sm font-medium text-forest">
            Status
          </label>
          <select id="enq-status-edit" value={status} onChange={(e) => setStatus(e.target.value)} disabled={saving} className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm">
            {ENQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="enq-notes" className="mb-1.5 block text-sm font-medium text-forest">
            Internal notes <span className="font-normal text-ink/50">(optional, never shown publicly)</span>
          </label>
          <textarea id="enq-notes" rows={5} maxLength={2000} value={notes} onChange={(e) => setNotes(e.target.value)} disabled={saving} className="w-full resize-none rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm" />
        </div>
        {feedback && <AdminNotice tone={feedback.tone}>{feedback.text}</AdminNotice>}
        <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-light disabled:opacity-60">
          {saving && <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />} Save changes
        </button>
        <button type="button" onClick={() => setConfirmDelete(true)} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-terracotta-dark/40 px-6 py-3 text-sm font-semibold text-terracotta-dark hover:bg-terracotta/10">
          <Trash2 size={16} aria-hidden="true" /> Delete enquiry
        </button>
      </form>

      <ConfirmDialog
        open={confirmDelete}
        busy={deleting}
        title="Delete this enquiry?"
        message={`The enquiry from ${row.parentName} will be permanently removed. This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}

export function EnquiryDetail() {
  return (
    <div className="flex flex-col gap-6">
      <Link to="/admin/enquiries" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-forest hover:underline">
        <ArrowLeft size={16} aria-hidden="true" /> All enquiries
      </Link>
      <h1 className="text-3xl text-forest">Enquiry</h1>
      <ConfigGate feature="enquiries">
        <Detail />
      </ConfigGate>
    </div>
  );
}

export default EnquiryDetail;
