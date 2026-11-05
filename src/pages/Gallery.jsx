import { useCallback, useMemo, useState } from 'react';
import { Seo } from '../components/ui/Seo';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { GalleryFilters } from '../components/gallery/GalleryFilters';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { galleryCategories } from '../data/galleryData';
import { seoData } from '../data/seoData';
import { useGalleryItems } from '../hooks/useGalleryItems';

export function Gallery() {
  const { status, items, source, failed } = useGalleryItems();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(
    () => (activeCategory === 'All' ? items : items.filter((item) => item.category === activeCategory)),
    [activeCategory, items],
  );

  const handleOpenImage = useCallback(
    (item) => {
      const index = filteredItems.findIndex((entry) => entry.id === item.id);
      setLightboxIndex(index);
    },
    [filteredItems],
  );

  const handleNavigate = useCallback(
    (direction) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const total = filteredItems.length;
        return (current + direction + total) % total;
      });
    },
    [filteredItems],
  );

  return (
    <>
      <Seo title={seoData.gallery.title} description={seoData.gallery.description} path="/gallery" />

      <PageHero
        eyebrow="Gallery"
        heading="A Glimpse Into Our Classrooms"
        lede="Everyday moments of art, stories, movement, and play — captured around the school."
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <GalleryFilters
            categories={galleryCategories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
          {status === 'loading' ? (
            <div
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
              role="status"
              aria-label="Loading photos"
            >
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-2xl bg-forest/10 sm:rounded-3xl" />
              ))}
            </div>
          ) : (
            <GalleryGrid items={filteredItems} onOpenImage={handleOpenImage} />
          )}
          {source === 'static' && (
            <p className="text-center text-xs text-ink/50">
              {failed
                ? 'We could not load the latest photos right now, so placeholder illustrations are shown.'
                : 'Placeholder illustrations shown for layout purposes. Real, parent-authorized photographs will replace these before launch.'}
            </p>
          )}
        </Container>
      </section>

      <GalleryLightbox
        items={filteredItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default Gallery;
