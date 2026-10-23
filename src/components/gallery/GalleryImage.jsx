import { useState } from 'react';
import { ImageOff, ZoomIn } from 'lucide-react';

/**
 * Single gallery thumbnail with a loading shimmer and a broken-image fallback.
 */
export function GalleryImage({ item, onOpen, aspect = 'aspect-[4/5]' }) {
  const [status, setStatus] = useState('loading');

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`group relative block w-full overflow-hidden rounded-2xl sm:rounded-3xl ${aspect} bg-sage/10 text-left`}
      aria-label={`Open photo: ${item.caption}`}
    >
      {status !== 'error' ? (
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
            status === 'loading' ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-forest/5 text-ink/40">
          <ImageOff size={24} aria-hidden="true" />
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-forest/10" aria-hidden="true" />
      )}

      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest/70 via-forest/0 to-forest/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="flex w-full items-center justify-between gap-2 p-3 sm:p-4">
          <span className="text-xs sm:text-sm font-medium text-cream">{item.caption}</span>
          <ZoomIn size={16} className="shrink-0 text-cream" aria-hidden="true" />
        </div>
      </div>
    </button>
  );
}

export default GalleryImage;
