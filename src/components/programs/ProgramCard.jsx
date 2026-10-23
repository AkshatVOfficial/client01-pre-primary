import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ACCENTS = {
  sage: 'bg-sage/20 text-sage-dark',
  terracotta: 'bg-terracotta/15 text-terracotta-dark',
  gold: 'bg-gold/40 text-forest',
  forest: 'bg-forest/10 text-forest',
};

/**
 * Compact program card used on the Home preview and as a quick link.
 * For full detail, see ProgramDetail (Programs page).
 */
export function ProgramCard({ program, imageSrc }) {
  const accent = ACCENTS[program.color] ?? ACCENTS.sage;

  return (
    <Link
      to={`/programs#${program.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-forest/8 bg-white/70 transition-all hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="overflow-hidden">
        <img
          src={imageSrc}
          alt={`${program.label} program illustration`}
          width="600"
          height="400"
          loading="lazy"
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${accent}`}>
          {program.ageRange}
        </span>
        <h3 className="text-xl text-forest">{program.label}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink/70">{program.shortDescription}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta-dark">
          Learn more
          <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default ProgramCard;
