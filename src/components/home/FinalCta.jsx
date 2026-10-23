import { ArrowRight, MessageCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { PrimaryButton } from '../ui/PrimaryButton';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export function FinalCta() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-terracotta px-6 py-14 text-center sm:px-14 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-14 -right-10 h-56 w-56 rounded-full bg-forest/15 blur-2xl"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-3xl sm:text-4xl leading-[1.12] text-white text-balance">
              Ready to Begin Your Child&rsquo;s Little Roots Journey?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/90">
              Reach out to ask questions, request a school visit, or begin the admissions conversation —
              we&rsquo;d love to meet your family.
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton to="/contact" variant="ghost" icon={ArrowRight}>
                Enquire About Admissions
              </PrimaryButton>
              <PrimaryButton
                href={buildWhatsAppLink()}
                external
                icon={MessageCircle}
                className="bg-forest text-cream hover:bg-forest-light"
              >
                Chat on WhatsApp
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FinalCta;
