import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { TestimonialCard } from './TestimonialCard';
import { schoolConfig } from '../../config/schoolConfig';

export function Testimonials() {
  const { testimonials } = schoolConfig;
  if (!testimonials.show || testimonials.items.length === 0) return null;

  return (
    <section className="bg-cream-dark/60 py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          align="center"
          eyebrow="From Our Families"
          heading="What Parents Are Saying"
          className="mx-auto"
        />
        <p className="mx-auto -mt-6 max-w-xl text-center text-xs text-ink/50">
          Placeholder quotes shown for layout purposes — to be replaced with real, approved parent testimonials.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item) => (
            <TestimonialCard key={item.name + item.relation} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
