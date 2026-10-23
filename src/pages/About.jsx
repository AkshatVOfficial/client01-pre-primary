import { ArrowRight, UserRound } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { FeatureItem } from '../components/ui/FeatureItem';
import { HolisticGrid } from '../components/about/HolisticGrid';
import { schoolConfig } from '../config/schoolConfig';
import { seoData } from '../data/seoData';

export function About() {
  const { about } = schoolConfig;

  return (
    <>
      <Seo title={seoData.about.title} description={seoData.about.description} path="/about" />

      <PageHero
        eyebrow={about.intro.eyebrow}
        heading={about.intro.heading}
        lede={about.intro.body}
      />

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-3xl border border-forest/8 bg-sage/10 p-8">
            <h2 className="text-2xl text-forest">{about.mission.title}</h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/75">{about.mission.body}</p>
          </div>
          <div className="rounded-3xl border border-forest/8 bg-terracotta/10 p-8">
            <h2 className="text-2xl text-forest">{about.vision.title}</h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink/75">{about.vision.body}</p>
          </div>
        </Container>
      </section>

      {/* Teaching philosophy */}
      <section className="bg-cream-dark/60 py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Our Approach" heading={about.teachingPhilosophy.title} />
            <p className="text-sm sm:text-base leading-relaxed text-ink/75">
              {about.teachingPhilosophy.body}
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img
              src="/images/about/about-intro.svg"
              alt="A child engaged in independent, hands-on learning in the classroom"
              width="900"
              height="700"
              loading="lazy"
              className="h-[280px] w-full object-cover sm:h-[340px]"
            />
          </div>
        </Container>
      </section>

      {/* Holistic development */}
      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="center"
            eyebrow="Whole-Child Learning"
            heading={about.holisticDevelopment.title}
            lede={about.holisticDevelopment.body}
            className="mx-auto"
          />
          <HolisticGrid areas={about.holisticDevelopment.areas} />
        </Container>
      </section>

      {/* Facilities preview */}
      <section className="bg-cream-dark/60 py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-[2rem] shadow-soft lg:order-2">
            <img
              src="/images/about/about-facilities.svg"
              alt="A bright, child-safe classroom area at the preschool"
              width="900"
              height="700"
              loading="lazy"
              className="h-[280px] w-full object-cover sm:h-[340px]"
            />
          </div>
          <div className="flex flex-col gap-4 lg:order-1">
            <SectionHeading eyebrow="Where Learning Happens" heading={about.facilities.title} lede={about.facilities.body} />
            <ul className="mt-2 flex flex-col gap-3">
              {about.facilities.items.map((item) => (
                <FeatureItem key={item}>{item}</FeatureItem>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Educator */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-[2.5rem] bg-forest p-8 text-center sm:p-12 lg:flex-row lg:items-start lg:gap-10 lg:text-left">
            <div
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-cream/10 sm:h-32 sm:w-32"
              role="img"
              aria-label={`Placeholder photo of ${about.educator.name}`}
            >
              <UserRound size={48} className="text-peach" aria-hidden="true" />
            </div>
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-peach">
                {about.educator.role}
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl text-cream">{about.educator.name}</h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-cream/75">
                {about.educator.bio}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-2xl sm:text-3xl text-forest text-balance">
            See What Your Child Will Explore Every Day
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton to="/programs" icon={ArrowRight}>
              Explore Our Programs
            </PrimaryButton>
            <PrimaryButton to="/contact" variant="secondary">
              Contact Us
            </PrimaryButton>
          </div>
        </Container>
      </section>
    </>
  );
}

export default About;
