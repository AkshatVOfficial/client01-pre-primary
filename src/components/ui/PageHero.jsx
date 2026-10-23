/**
 * Shared hero banner used at the top of About / Programs / Gallery / Contact.
 */
export function PageHero({ eyebrow, heading, lede, children }) {
  return (
    <section className="relative overflow-hidden bg-forest pt-32 pb-20 sm:pt-36 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-sage/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-terracotta/15 blur-3xl"
      />
      <div className="container-site relative flex flex-col gap-4">
        {eyebrow && (
          <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-peach">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-cream text-balance">
          {heading}
        </h1>
        {lede && <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-cream/80">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

export default PageHero;
