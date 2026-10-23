import { ArrowRight, MessageCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { PrimaryButton } from '../ui/PrimaryButton';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl sm:left-auto sm:right-0 sm:translate-x-1/4"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-20 h-80 w-80 rounded-full bg-sage/25 blur-3xl"
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6 animate-fade-up">
          <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-terracotta-dark">
            A Little Place to Grow
          </span>
          <h1 className="max-w-xl text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] text-forest text-balance">
            Big Dreams Begin with Little Steps.
          </h1>
          <p className="max-w-lg text-base sm:text-lg leading-relaxed text-ink/80">
            At Little Roots, every day is an invitation to wonder. We nurture curiosity, creativity,
            independence, and confidence through warm, play-based learning designed around your child.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton to="/programs" icon={ArrowRight}>
              Explore Our Programs
            </PrimaryButton>
            <PrimaryButton to="/contact" variant="secondary" icon={MessageCircle}>
              Talk to Us
            </PrimaryButton>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
            <img
              src="/images/hero/hero-classroom.svg"
              alt="Warm, light-filled preschool classroom set up for hands-on, play-based learning"
              width="1200"
              height="900"
              className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[460px]"
              loading="eager"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 hidden h-28 w-28 rounded-3xl bg-terracotta/20 sm:block"
          />
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 hidden h-20 w-20 rounded-full bg-sage/30 sm:block"
          />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
