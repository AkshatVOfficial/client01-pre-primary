/**
 * Consistent eyebrow + heading + optional lede, used to open most sections.
 */
export function SectionHeading({
  eyebrow,
  heading,
  lede,
  align = 'left',
  tone = 'dark',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  const eyebrowTone = tone === 'light' ? 'text-peach' : 'text-terracotta-dark';
  const ledeTone = tone === 'light' ? 'text-cream/80' : 'text-ink/75';

  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {eyebrow && (
        <span
          className={`font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] ${eyebrowTone}`}
        >
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2 className={`text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] text-balance ${tone === 'light' ? 'text-cream' : 'text-forest'}`}>
          {heading}
        </h2>
      )}
      {lede && (
        <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${ledeTone}`}>{lede}</p>
      )}
    </div>
  );
}

export default SectionHeading;
