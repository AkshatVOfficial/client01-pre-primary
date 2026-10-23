const TONES = {
  sage: 'bg-sage/20 text-sage-dark',
  terracotta: 'bg-terracotta/15 text-terracotta-dark',
  forest: 'bg-forest/10 text-forest',
  gold: 'bg-gold/40 text-forest',
};

/**
 * Small rounded icon chip used throughout feature lists and cards.
 */
export function IconBadge({ icon: Icon, tone = 'sage', size = 44 }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-2xl ${TONES[tone] ?? TONES.sage}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={2} />
    </span>
  );
}

export default IconBadge;
