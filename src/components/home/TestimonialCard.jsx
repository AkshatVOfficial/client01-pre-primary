import { Quote } from 'lucide-react';

export function TestimonialCard({ quote, name, relation }) {
  return (
    <div className="flex h-full flex-col gap-5 rounded-3xl border border-forest/8 bg-white/70 p-7">
      <Quote size={28} className="text-terracotta/50" aria-hidden="true" />
      <p className="flex-1 text-sm sm:text-base leading-relaxed text-ink/80 italic">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="text-sm font-semibold text-forest">{name}</p>
        <p className="text-xs text-ink/55">{relation}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
