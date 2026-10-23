import { useCallback, useMemo, useState } from 'react';
import { Seo } from '../components/ui/Seo';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { GalleryFilters } from '../components/gallery/GalleryFilters';
import { GalleryGrid } from '../components/gallery/GalleryGrid';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { galleryData, galleryCategories } from '../data/galleryData';
import { seoData } from '../data/seoData';

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryData
        : galleryData.filter((item) => item.category === activeCategory),
    [activeCategory],
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
          <GalleryGrid items={filteredItems} onOpenImage={handleOpenImage} />
          <p className="text-center text-xs text-ink/50">
            Placeholder illustrations shown for layout purposes. Real, parent-authorized photographs will
            replace these before launch.
          </p>
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
