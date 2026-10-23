import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { galleryData } from '../../data/galleryData';

const PREVIEW_IDS = [
  'art-crafts',
  'storytime',
  'practical-life',
  'outdoor-play',
  'music-movement',
  'classroom-exploration',
];

export function ActivitiesPreview() {
  const items = PREVIEW_IDS.map((id) => galleryData.find((entry) => entry.id === id)).filter(Boolean);

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

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl sm:rounded-3xl ${
                index === 0 ? 'col-span-2 row-span-2 aspect-square sm:col-span-1 sm:row-span-2 sm:aspect-auto sm:h-full' : 'aspect-square'
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
      </Container>
    </section>
  );
}

export default ActivitiesPreview;
