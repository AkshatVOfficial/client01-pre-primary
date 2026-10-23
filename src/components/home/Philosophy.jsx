import { Container } from '../ui/Container';
import { schoolConfig } from '../../config/schoolConfig';

export function Philosophy() {
  const { philosophy } = schoolConfig;

  return (
    <section className="relative overflow-hidden bg-forest py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-sage/15 blur-3xl"
      />
      <Container className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-peach">
            {philosophy.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-cream text-balance">
            {philosophy.heading}
          </h2>
          <div className="flex flex-col gap-4">
            {philosophy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-sm sm:text-base leading-relaxed text-cream/75">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start sm:gap-5">
          {philosophy.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-cream/10 bg-cream/5 p-5 sm:p-6 transition-colors hover:bg-cream/10"
            >
              <h3 className="text-lg text-peach">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Philosophy;
