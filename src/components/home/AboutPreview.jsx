import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { schoolConfig } from '../../config/schoolConfig';

export function AboutPreview() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 overflow-hidden rounded-[2rem] shadow-soft lg:order-1">
          <img
            src="/images/about/about-intro.svg"
            alt="Educator guiding a small group of children through a hands-on learning activity"
            width="900"
            height="700"
            loading="lazy"
            className="h-[280px] w-full object-cover sm:h-[360px]"
          />
        </div>
        <div className="order-1 flex flex-col items-start gap-5 lg:order-2">
          <SectionHeading
            eyebrow="Who We Are"
            heading="A Warm Beginning to Lifelong Learning"
            lede={schoolConfig.identity.description}
          />
          <p className="text-sm leading-relaxed text-ink/70">
            {schoolConfig.about.teachingPhilosophy.body}
          </p>
          <PrimaryButton to="/about" variant="secondary" icon={ArrowRight}>
            More About Us
          </PrimaryButton>
        </div>
      </Container>
    </section>
  );
}

export default AboutPreview;
