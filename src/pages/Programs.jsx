import { MessageCircle } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { ProgramDetail } from '../components/programs/ProgramDetail';
import { schoolConfig } from '../config/schoolConfig';
import { seoData } from '../data/seoData';

const PROGRAM_IMAGES = {
  playgroup: '/images/programs/playgroup.svg',
  nursery: '/images/programs/nursery.svg',
  'junior-kg': '/images/programs/junior-kg.svg',
  'senior-kg': '/images/programs/senior-kg.svg',
};

export function Programs() {
  const { programs, programsNote } = schoolConfig;

  return (
    <>
      <Seo title={seoData.programs.title} description={seoData.programs.description} path="/programs" />

      <PageHero
        eyebrow="Our Programs"
        heading="A Program for Every Age & Stage"
        lede="Each stage is built around how young children actually learn — through play, exploration, and gentle structure."
      />

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-10">
          {programs.map((program, index) => (
            <ProgramDetail
              key={program.id}
              program={program}
              imageSrc={PROGRAM_IMAGES[program.id]}
              reverse={index % 2 === 1}
            />
          ))}
          <p className="text-center text-xs text-ink/50">{programsNote}</p>
        </Container>
      </section>

      {/* Learning through play approach */}
      <section className="bg-forest py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <SectionHeading
            align="center"
            tone="light"
            eyebrow="Our Approach, Across Every Program"
            heading="Learning Through Play, Every Single Day"
            lede="Whatever the age group, our classrooms share the same foundation: creativity, hands-on practical activities, language-rich conversation, and genuine social interaction. Children don't just prepare for learning — they live it, through play, every day."
            className="mx-auto"
          />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-2xl sm:text-3xl text-forest text-balance">
            Have Questions About the Right Program for Your Child?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryButton to="/contact" icon={MessageCircle}>
              Enquire Now
            </PrimaryButton>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Programs;
