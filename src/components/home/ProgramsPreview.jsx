import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { PrimaryButton } from '../ui/PrimaryButton';
import { ProgramCard } from '../programs/ProgramCard';
import { schoolConfig } from '../../config/schoolConfig';

const PROGRAM_IMAGES = {
  playgroup: '/images/programs/playgroup.svg',
  nursery: '/images/programs/nursery.svg',
  'junior-kg': '/images/programs/junior-kg.svg',
  'senior-kg': '/images/programs/senior-kg.svg',
};

export function ProgramsPreview() {
  return (
    <section className="bg-cream-dark/60 py-16 sm:py-20">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our Programs"
            heading="A Program for Every Age & Stage"
            lede="From a gentle first step away from home to confident school readiness — each stage builds on the last."
          />
          <PrimaryButton to="/programs" variant="secondary" icon={ArrowRight} className="shrink-0">
            View All Programs
          </PrimaryButton>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {schoolConfig.programs.map((program) => (
            <ProgramCard key={program.id} program={program} imageSrc={PROGRAM_IMAGES[program.id]} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProgramsPreview;
