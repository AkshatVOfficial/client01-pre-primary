import { Seo } from '../components/ui/Seo';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactInfoCard } from '../components/contact/ContactInfoCard';
import { MapEmbed } from '../components/contact/MapEmbed';
import { Faq } from '../components/contact/Faq';
import { seoData } from '../data/seoData';

export function Contact() {
  return (
    <>
      <Seo title={seoData.contact.title} description={seoData.contact.description} path="/contact" />

      <PageHero
        eyebrow="Contact & Admissions"
        heading="Let's Start the Conversation"
        lede="Questions about admissions, a program, or want to visit? We'd love to hear from your family."
      />

      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col gap-6 rounded-3xl border border-forest/8 bg-cream-dark/40 p-6 sm:p-8">
            <SectionHeading eyebrow="Send an Enquiry" heading="We'd Love to Hear From You" />
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6">
            <ContactInfoCard />
            <MapEmbed />
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark/60 py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading
            eyebrow="Good to Know"
            heading="Frequently Asked Questions"
            lede="A few common questions from parents just getting started. Answers below are placeholders — please confirm details with the school."
          />
          <Faq />
        </Container>
      </section>
    </>
  );
}

export default Contact;
