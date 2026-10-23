import { BookOpen, Sparkles } from 'lucide-react';
import { FeatureItem } from '../ui/FeatureItem';

const ACCENTS = {
  sage: { bg: 'bg-sage/15', chip: 'bg-sage/25 text-sage-dark' },
  terracotta: { bg: 'bg-terracotta/10', chip: 'bg-terracotta/20 text-terracotta-dark' },
  gold: { bg: 'bg-gold/25', chip: 'bg-gold/50 text-forest' },
  forest: { bg: 'bg-forest/8', chip: 'bg-forest/15 text-forest' },
};

/**
 * Full program detail block used on the Programs page — image, age range,
 * description, objectives, and example activities. Alternates image side.
 */
export function ProgramDetail({ program, imageSrc, reverse = false }) {
  const accent = ACCENTS[program.color] ?? ACCENTS.sage;

  return (
    <div
      id={program.slug}
      className={`scroll-mt-28 rounded-[2.5rem] ${accent.bg} p-6 sm:p-10 lg:p-12`}
    >
      <div className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-14 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="overflow-hidden rounded-[2rem] shadow-soft">
          <img
            src={imageSrc}
            alt={`${program.label} classroom illustration`}
            width="800"
            height="600"
            loading="lazy"
            className="h-[240px] w-full object-cover sm:h-[300px]"
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${accent.chip}`}>
              {program.ageRange}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl text-forest">{program.label}</h2>
          <p className="text-sm sm:text-base leading-relaxed text-ink/75">{program.shortDescription}</p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-forest/80">
                <Sparkles size={16} aria-hidden="true" /> Learning Objectives
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {program.objectives.map((objective) => (
                  <FeatureItem key={objective}>{objective}</FeatureItem>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-forest/80">
                <BookOpen size={16} aria-hidden="true" /> Example Activities
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {program.activities.map((activity) => (
                  <FeatureItem key={activity}>{activity}</FeatureItem>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramDetail;
