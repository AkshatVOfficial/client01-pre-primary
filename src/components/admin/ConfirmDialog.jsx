import { useEffect, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

/** Accessible confirm dialog (Escape cancels, focus trapped). */
export function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', busy = false, onConfirm, onCancel }) {
  const panelRef = useRef(null);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape' && !busy) onCancel();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, busy, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="absolute inset-0 bg-forest/70" aria-hidden="true" onClick={busy ? undefined : onCancel} />
      <div ref={panelRef} className="relative z-10 w-full max-w-md rounded-3xl bg-cream p-6 shadow-lift">
        <h2 id="confirm-title" className="text-xl text-forest">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{message}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-full border-2 border-forest/30 px-5 py-2.5 text-sm font-semibold text-forest hover:border-forest disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="rounded-full bg-terracotta-dark px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta disabled:opacity-50"
          >
            {busy ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
