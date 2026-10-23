import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useFocusTrap } from '../../hooks/useFocusTrap';

/**
 * Accessible modal lightbox: Escape to close, arrow keys to navigate,
 * focus trapped inside, focus returned to the trigger on close.
 */
export function GalleryLightbox({ items, index, onClose, onNavigate }) {
  const panelRef = useRef(null);
  const open = index !== null;
  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNavigate(1);
      if (event.key === 'ArrowLeft') onNavigate(-1);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, onNavigate]);

  if (!open) return null;

  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${item.caption}`}
    >
      <button
        type="button"
        aria-label="Close photo viewer"
        onClick={onClose}
        className="absolute inset-0 bg-forest/90 animate-fade-in"
      />

      <div ref={panelRef} className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 inline-flex rounded-full p-2 text-cream hover:bg-cream/10 sm:-top-14"
        >
          <X size={26} aria-hidden="true" />
        </button>

        <div className="relative flex w-full items-center justify-center">
          <button
            type="button"
            onClick={() => onNavigate(-1)}
            aria-label="Previous photo"
            className="absolute left-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream hover:bg-cream/25 sm:-left-14"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
          />

          <button
            type="button"
            onClick={() => onNavigate(1)}
            aria-label="Next photo"
            className="absolute right-1 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream hover:bg-cream/25 sm:-right-14"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>

        <p className="text-center text-sm text-cream/85">
          {item.caption}
          <span className="ml-2 text-cream/50">
            ({index + 1} / {items.length})
          </span>
        </p>
      </div>
    </div>
  );
}

export default GalleryLightbox;
