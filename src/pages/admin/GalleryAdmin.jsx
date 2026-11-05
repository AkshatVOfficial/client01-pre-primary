import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, LoaderCircle, Pencil, Trash2 } from 'lucide-react';
import { galleryCategories } from '../../data/galleryData';
import {
  ACCEPTED_TYPES,
  MAX_UPLOAD_BYTES,
  deleteGalleryItem,
  galleryImageUrl,
  listAllGalleryRows,
  updateGalleryRow,
  uploadGalleryImage,
} from '../../lib/gallery';
import { describeError } from '../../lib/errors';
import { AdminNotice } from '../../components/admin/AdminNotice';
import { ConfigGate } from '../../components/admin/ConfigGate';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';

const CATEGORIES = galleryCategories.filter((c) => c !== 'All');
const MAX_MB = MAX_UPLOAD_BYTES / (1024 * 1024);
const fieldClass = 'w-full rounded-xl border border-forest/15 bg-white px-3.5 py-2.5 text-sm disabled:opacity-60';

function UploadForm({ nextOrder, onUploaded }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [altText, setAltText] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isPublished, setIsPublished] = useState(true);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file]);
  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  function handleFile(event) {
    setFeedback(null);
    const picked = event.target.files?.[0];
    if (!picked) return;
    if (!ACCEPTED_TYPES.includes(picked.type)) {
      setFeedback({ tone: 'error', text: 'Please choose a JPG, PNG or WebP image.' });
      event.target.value = '';
      return;
    }
    if (picked.size > 25 * 1024 * 1024) {
      setFeedback({ tone: 'error', text: 'That file is very large. Please choose a photo under 25 MB.' });
      event.target.value = '';
      return;
    }
    setFile(picked);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    if (!file) return setFeedback({ tone: 'error', text: 'Please choose a photo first.' });
    if (!caption.trim()) return setFeedback({ tone: 'error', text: 'Please add a caption.' });
    if (!altText.trim()) return setFeedback({ tone: 'error', text: 'Please describe the photo in the alt text field (for accessibility).' });

    setBusy(true);
    setFeedback(null);
    try {
      await uploadGalleryImage({ file, caption, altText, category, displayOrder: nextOrder, isPublished });
      setFile(null);
      setCaption('');
      setAltText('');
      if (inputRef.current) inputRef.current.value = '';
      setFeedback({ tone: 'success', text: 'Photo uploaded.' });
      onUploaded();
    } catch (error) {
      const text =
        error?.message === 'FILE_TOO_LARGE'
          ? `This photo is still larger than ${MAX_MB} MB after resizing. Please choose a smaller one.`
          : describeError(error, 'Upload failed. Nothing was saved.');
      setFeedback({ tone: 'error', text });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-3xl border border-forest/10 bg-white/70 p-6 lg:grid-cols-[220px_1fr]">
      <div>
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-forest/5">
          {preview ? <img src={preview} alt="Selected photo preview" className="h-full w-full object-cover" /> : <ImagePlus className="text-ink/30" size={32} aria-hidden="true" />}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl text-forest">Upload a photo</h2>
        <div>
          <label htmlFor="gal-file" className="mb-1.5 block text-sm font-medium text-forest">
            Photo <span className="font-normal text-ink/50">(JPG, PNG or WebP · large photos are resized automatically)</span>
          </label>
          <input ref={inputRef} id="gal-file" type="file" accept={ACCEPTED_TYPES.join(',')} onChange={handleFile} disabled={busy} className="block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-forest file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gal-caption" className="mb-1.5 block text-sm font-medium text-forest">Caption</label>
            <input id="gal-caption" type="text" maxLength={200} value={caption} onChange={(e) => setCaption(e.target.value)} disabled={busy} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="gal-category" className="mb-1.5 block text-sm font-medium text-forest">Category</label>
            <select id="gal-category" value={category} onChange={(e) => setCategory(e.target.value)} disabled={busy} className={fieldClass}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="gal-alt" className="mb-1.5 block text-sm font-medium text-forest">
            Alt text <span className="font-normal text-ink/50">(describe the photo for screen readers)</span>
          </label>
          <input id="gal-alt" type="text" maxLength={300} value={altText} onChange={(e) => setAltText(e.target.value)} disabled={busy} className={fieldClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink/80">
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} disabled={busy} className="h-4 w-4 accent-[#344E41]" />
          Show on the public website
        </label>
        <p className="text-xs text-ink/55">Only upload photos you have permission to publish, especially photos showing children.</p>
        {feedback && <AdminNotice tone={feedback.tone}>{feedback.text}</AdminNotice>}
        <button type="submit" disabled={busy} className="inline-flex w-fit items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-light disabled:opacity-60">
          {busy ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <ImagePlus size={16} aria-hidden="true" />}
          {busy ? 'Uploading…' : 'Upload photo'}
        </button>
      </div>
    </form>
  );
}

function PhotoCard({ row, index, count, busy, onMove, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState(row.caption);
  const [altText, setAltText] = useState(row.altText);
  const [category, setCategory] = useState(row.category);

  const categoryOptions = CATEGORIES.includes(row.category) ? CATEGORIES : [row.category, ...CATEGORIES];

  async function handleSave(event) {
    event.preventDefault();
    if (!caption.trim() || !altText.trim()) return;
    const ok = await onSave(row, { caption: caption.trim(), altText: altText.trim(), category });
    if (ok) setEditing(false);
  }

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white/70">
      <div className="relative aspect-[4/3] bg-forest/5">
        <img src={galleryImageUrl(row.fileId)} alt={row.altText} loading="lazy" className="h-full w-full object-cover" />
        <span className={`absolute left-2 top-2 rounded-full px-2.5 py-1 text-xs font-semibold ${row.isPublished ? 'bg-forest text-cream' : 'bg-gold text-ink'}`}>
          {row.isPublished ? 'Published' : 'Hidden'}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        {editing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-3">
            <div>
              <label htmlFor={`cap-${row.$id}`} className="mb-1 block text-xs font-medium text-forest">Caption</label>
              <input id={`cap-${row.$id}`} value={caption} maxLength={200} onChange={(e) => setCaption(e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label htmlFor={`alt-${row.$id}`} className="mb-1 block text-xs font-medium text-forest">Alt text</label>
              <input id={`alt-${row.$id}`} value={altText} maxLength={300} onChange={(e) => setAltText(e.target.value)} className={fieldClass} />
            </div>
            <div>
              <label htmlFor={`cat-${row.$id}`} className="mb-1 block text-xs font-medium text-forest">Category</label>
              <select id={`cat-${row.$id}`} value={category} onChange={(e) => setCategory(e.target.value)} className={fieldClass}>
                {categoryOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className="rounded-full bg-forest px-4 py-2 text-xs font-semibold text-cream disabled:opacity-60">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="rounded-full border border-forest/30 px-4 py-2 text-xs font-semibold text-forest">Cancel</button>
            </div>
          </form>
        ) : (
          <div>
            <p className="font-medium text-forest">{row.caption}</p>
            <p className="text-xs text-ink/55">{row.category}</p>
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-1.5">
          <button type="button" aria-label={`Move “${row.caption}” earlier`} disabled={busy || index === 0} onClick={() => onMove(index, -1)} className="rounded-full border border-forest/20 p-2 text-forest disabled:opacity-30"><ArrowUp size={14} aria-hidden="true" /></button>
          <button type="button" aria-label={`Move “${row.caption}” later`} disabled={busy || index === count - 1} onClick={() => onMove(index, 1)} className="rounded-full border border-forest/20 p-2 text-forest disabled:opacity-30"><ArrowDown size={14} aria-hidden="true" /></button>
          <button type="button" aria-label={`Edit “${row.caption}”`} disabled={busy} onClick={() => setEditing((v) => !v)} className="rounded-full border border-forest/20 p-2 text-forest"><Pencil size={14} aria-hidden="true" /></button>
          <button type="button" aria-label={row.isPublished ? `Hide “${row.caption}” from the website` : `Publish “${row.caption}”`} disabled={busy} onClick={() => onSave(row, { isPublished: !row.isPublished })} className="rounded-full border border-forest/20 p-2 text-forest">
            {row.isPublished ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
          </button>
          <button type="button" aria-label={`Delete “${row.caption}”`} disabled={busy} onClick={() => onDelete(row)} className="ml-auto rounded-full border border-terracotta-dark/40 p-2 text-terracotta-dark"><Trash2 size={14} aria-hidden="true" /></button>
        </div>
      </div>
    </li>
  );
}

function GalleryManager() {
  const [state, setState] = useState({ status: 'loading', rows: [], error: '' });
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = useCallback(() => {
    listAllGalleryRows()
      .then((rows) => setState({ status: 'ready', rows, error: '' }))
      .catch((error) => setState({ status: 'error', rows: [], error: describeError(error) }));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const nextOrder = useMemo(
    () => (state.rows.length ? Math.max(...state.rows.map((r) => r.displayOrder ?? 0)) + 1 : 0),
    [state.rows],
  );

  async function handleSave(row, data) {
    setBusy(true);
    setFeedback(null);
    try {
      const updated = await updateGalleryRow(row.$id, data);
      setState((prev) => ({ ...prev, rows: prev.rows.map((r) => (r.$id === row.$id ? updated : r)) }));
      return true;
    } catch (error) {
      setFeedback({ tone: 'error', text: describeError(error, 'Could not save the change.') });
      return false;
    } finally {
      setBusy(false);
    }
  }

  // Re-number everything to 0..n-1 after a swap so ties or gaps can never confuse the order.
  async function handleMove(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= state.rows.length) return;
    setBusy(true);
    setFeedback(null);
    const next = [...state.rows];
    [next[index], next[target]] = [next[target], next[index]];
    try {
      const updates = [];
      next.forEach((row, position) => {
        if (row.displayOrder !== position) updates.push(updateGalleryRow(row.$id, { displayOrder: position }));
      });
      await Promise.all(updates);
    } catch (error) {
      setFeedback({ tone: 'error', text: describeError(error, 'Could not change the order.') });
    } finally {
      setBusy(false);
      load();
    }
  }

  async function handleConfirmDelete() {
    setBusy(true);
    try {
      const { fileDeleted } = await deleteGalleryItem(pendingDelete);
      setFeedback(
        fileDeleted
          ? { tone: 'success', text: 'Photo deleted.' }
          : { tone: 'info', text: 'The photo was removed from the gallery, but its file could not be deleted from storage. You can remove it in the Appwrite console.' },
      );
    } catch (error) {
      setFeedback({ tone: 'error', text: describeError(error, 'Could not delete the photo.') });
    } finally {
      setPendingDelete(null);
      setBusy(false);
      load();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <UploadForm nextOrder={nextOrder} onUploaded={load} />
      {feedback && <AdminNotice tone={feedback.tone}>{feedback.text}</AdminNotice>}

      {state.status === 'loading' && (
        <div className="flex justify-center py-10" role="status">
          <LoaderCircle className="animate-spin text-forest" aria-hidden="true" />
          <span className="sr-only">Loading photos…</span>
        </div>
      )}
      {state.status === 'error' && (
        <AdminNotice tone="error" title="Could not load the gallery" action={<button type="button" onClick={load} className="font-semibold underline underline-offset-2">Try again</button>}>
          {state.error}
        </AdminNotice>
      )}
      {state.status === 'ready' &&
        (state.rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-forest/20 py-12 text-center text-sm text-ink/60">
            No photos yet. Upload the first one above.
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {state.rows.map((row, index) => (
              <PhotoCard key={row.$id} row={row} index={index} count={state.rows.length} busy={busy} onMove={handleMove} onSave={handleSave} onDelete={setPendingDelete} />
            ))}
          </ul>
        ))}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        busy={busy}
        title="Delete this photo?"
        message="The photo is removed from the website and from storage permanently. To just hide it, use the eye button instead."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

export function GalleryAdmin() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl text-forest">Gallery</h1>
      <ConfigGate feature="gallery">
        <GalleryManager />
      </ConfigGate>
    </div>
  );
}

export default GalleryAdmin;
