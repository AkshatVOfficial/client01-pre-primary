import { Seo } from '../components/ui/Seo';
import { PageHero } from '../components/ui/PageHero';
import { Container } from '../components/ui/Container';
import { schoolConfig } from '../config/schoolConfig';
import { seoData } from '../data/seoData';

// Update this date whenever the policy text changes.
const LAST_UPDATED = 'Enter date here';

function Section({ title, children }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl text-forest">{title}</h2>
      {children}
    </section>
  );
}

/**
 * Privacy policy TEMPLATE. The school must review and adapt this text (ideally with a
 * legal adviser) before launch; it is not legal advice and makes no compliance claims.
 */
export function Privacy() {
  const { identity, contact } = schoolConfig;
  const para = 'text-[15px] leading-relaxed text-ink/80';

  return (
    <>
      <Seo title={seoData.privacy.title} description={seoData.privacy.description} path="/privacy" />

      <PageHero
        eyebrow="Privacy"
        heading="Privacy Policy"
        lede={`How ${identity.name} handles the details you share through this website.`}
      />

      <section className="py-16 sm:py-20">
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <p className="rounded-2xl bg-gold/40 p-4 text-sm text-ink/80">
            <strong>Template notice:</strong> this policy is a starting template. The school should review
            and adapt it, and confirm the placeholders below, before relying on it. Last updated:{' '}
            {LAST_UPDATED}.
          </p>

          <Section title="What we collect">
            <p className={para}>
              When you submit the admissions enquiry form we collect: the parent&rsquo;s name, phone number,
              your child&rsquo;s age, the program you are interested in, and your message. We also record
              the date and time of the enquiry and your confirmation that we may contact you. Please do not
              include sensitive information (such as medical details or identity numbers) in the message.
            </p>
          </Section>

          <Section title="Why we collect it">
            <p className={para}>
              Only to respond to your admissions enquiry, arrange school visits, and keep a record of
              enquiries received. We do not use these details for advertising and we do not sell them.
            </p>
          </Section>

          <Section title="Where it is stored and who can see it">
            <p className={para}>
              Enquiries are stored in a database provided by Appwrite, a cloud service we use to run this
              website. Only authorised school administrators can view them. Appwrite acts as a service
              provider that stores the data on our behalf.
            </p>
          </Section>

          <Section title="WhatsApp and email">
            <p className={para}>
              The website offers optional buttons that open WhatsApp or your email app with your details
              pre-filled. Nothing is sent until you press send in that app, and those services handle your
              message under their own privacy policies.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p className={para}>
              [School to confirm: for example, enquiries are kept for up to ___ months after the admission
              session ends, then deleted.]
            </p>
          </Section>

          <Section title="Cookies">
            <p className={para}>
              The public pages of this website do not use advertising or analytics cookies. If a school
              administrator signs in, a secure session is stored in their browser so they stay signed in.
            </p>
          </Section>

          <Section title="Your choices">
            <p className={para}>
              You may ask us to show, correct, or delete the details you submitted by contacting the school
              at{' '}
              <a href={`mailto:${contact.email}`} className="font-medium text-forest underline underline-offset-2">
                {contact.email}
              </a>{' '}
              or {contact.phone}. [School to confirm the process and response time.]
            </p>
          </Section>

          <Section title="Children's information">
            <p className={para}>
              This form is intended for parents and guardians. We ask only for a child&rsquo;s age, not their
              name or photograph. Photographs shown on this website are published only with parent
              permission.
            </p>
          </Section>

          <Section title="Contact">
            <p className={para}>
              {identity.name}, {contact.address.full}. Questions about this policy can be sent to{' '}
              {contact.email}.
            </p>
          </Section>
        </Container>
      </section>
    </>
  );
}

export default Privacy;
