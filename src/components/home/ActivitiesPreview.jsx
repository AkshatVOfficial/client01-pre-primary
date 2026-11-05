import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { useGalleryItems } from '../../hooks/useGalleryItems';

// Used only for the static placeholder gallery (Appwrite not configured).
const PREVIEW_IDS = [
  'art-crafts',
  'storytime',
  'practical-life',
  'outdoor-play',
  'music-movement',
  'classroom-exploration',
];

export function ActivitiesPreview() {
  const { status, items: allItems, source } = useGalleryItems();

  const items =
    source === 'static'
      ? PREVIEW_IDS.map((id) => allItems.find((entry) => entry.id === id)).filter(Boolean)
      : allItems.slice(0, 6);

  // Live gallery with no published photos yet: hide the section instead of showing an empty grid.
  if (status === 'ready' && items.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="A Day at Little Roots"
            heading="Moments from Our Classrooms"
            lede="A glimpse into the everyday joy of art, stories, movement, and play."
          />
          <PrimaryButton to="/gallery" variant="secondary" icon={ArrowRight} className="shrink-0">
            View Full Gallery
          </PrimaryButton>
        </div>

        {status === 'loading' ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3" role="status" aria-label="Loading photos">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-2xl bg-forest/10 sm:rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl sm:rounded-3xl ${
                  index === 0
                    ? 'col-span-2 row-span-2 aspect-square sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:h-full'
                    : 'aspect-square'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width="500"
                  height="500"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default ActivitiesPreview;
