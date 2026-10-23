import { ImageOff } from 'lucide-react';
import { GalleryImage } from './GalleryImage';

const SPAN_PATTERN = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]'];

export function GalleryGrid({ items, onOpenImage }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-forest/20 py-20 text-center">
        <ImageOff size={32} className="text-ink/30" aria-hidden="true" />
        <p className="text-sm text-ink/60">No photos in this category yet. Please check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {items.map((item, index) => (
        <GalleryImage
          key={item.id}
          item={item}
          onOpen={onOpenImage}
          aspect={SPAN_PATTERN[index % SPAN_PATTERN.length]}
        />
      ))}
    </div>
  );
}

export default GalleryGrid;
