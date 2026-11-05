import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, CircleAlert, CircleCheck, Send, LoaderCircle } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';
import { buildWhatsAppLink, buildMailtoLink } from '../../utils/whatsapp';
import { features } from '../../lib/appwriteConfig';
import { createEnquiry } from '../../lib/enquiries';
import { describeError } from '../../lib/errors';

const INITIAL_VALUES = {
  parentName: '',
  phone: '',
  childAge: '',
  program: '',
  message: '',
  consent: false,
  website: '', // honeypot: real visitors never see or fill this
};

// Keep in sync with the column sizes in APPWRITE_SETUP.md
const LIMITS = { parentName: 100, phone: 20, childAge: 30, message: 1000 };

const PROGRAM_OPTIONS = [...schoolConfig.programs.map((p) => p.label), 'Not sure yet'];

function validate(values, requireConsent) {
  const errors = {};
  if (!values.parentName.trim()) errors.parentName = 'Please enter your name.';
  if (!values.phone.trim()) {
    errors.phone = 'Please enter a phone number.';
  } else if (!/^[0-9+\-\s()]{7,15}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!values.childAge.trim()) errors.childAge = "Please share your child's age.";
  if (!values.program) errors.program = 'Please choose a program (or "Not sure yet").';
  if (!values.message.trim()) errors.message = 'Please add a short message.';
  if (requireConsent && !values.consent) errors.consent = 'Please tick the box so we may contact you about this enquiry.';
  return errors;
}

function buildEnquiryText(values) {
  return [
    `Hello, I would like to know more about admissions at ${schoolConfig.identity.name}.`,
    '',
    `Parent Name: ${values.parentName}`,
    `Phone: ${values.phone}`,
    `Child's Age: ${values.childAge}`,
    `Program: ${values.program}`,
    `Message: ${values.message}`,
  ].join('\n');
}

const inputClass =
  'w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest/40 disabled:opacity-60';

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs text-terracotta-dark">
      <CircleAlert size={13} aria-hidden="true" /> {message}
    </p>
  );
}

/**
 * Enquiry form.
 *  - Appwrite configured: "Submit Enquiry" saves the enquiry, and only reports
 *    success if the save really succeeded. WhatsApp / email are optional follow-ups.
 *  - Appwrite NOT configured: nothing is saved; the form falls back to the old
 *    hand-off to WhatsApp / email, and says so honestly.
 */
export function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [phase, setPhase] = useState('editing'); // editing | submitting | saved | failed
  const [submitted, setSubmitted] = useState(null);

  const savedRef = useRef(null);
  const saveEnabled = features.enquiries;
  const busy = phase === 'submitting';

  // Move focus to the confirmation so keyboard / screen-reader users notice it.
  useEffect(() => {
    if (phase === 'saved') savedRef.current?.focus();
  }, [phase]);

  function handleChange(field) {
    return (event) => {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };
  }

  function runValidation() {
    setTouched(true);
    const validationErrors = validate(values, saveEnabled);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }

  function openWhatsApp(source = values) {
    window.open(buildWhatsAppLink(buildEnquiryText(source)), '_blank', 'noopener,noreferrer');
  }

  function openEmail(source = values) {
    window.location.href = buildMailtoLink(
      `Admissions Enquiry — ${source.parentName}`,
      buildEnquiryText(source),
    );
  }

  async function handleSave(event) {
    event.preventDefault();
    if (busy) return;
    if (!runValidation()) return;

    // Honeypot filled → almost certainly a bot. Do not save and do not report success.
    if (values.website) {
      setPhase('failed');
      return;
    }

    setPhase('submitting');
    try {
      await createEnquiry(values);
      setSubmitted(values);
      setPhase('saved');
    } catch (error) {
      console.error('Enquiry could not be saved', error?.code, error?.type);
      setPhase('failed');
      setErrors((prev) => ({ ...prev, form: describeError(error) }));
    }
  }

  function handleHandOff(channel) {
    if (!runValidation()) return;
    if (channel === 'whatsapp') openWhatsApp();
    else openEmail();
  }

  function handleReset() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched(false);
    setSubmitted(null);
    setPhase('editing');
  }

  if (phase === 'saved' && submitted) {
    return (
      <div ref={savedRef} tabIndex={-1} className="flex flex-col gap-5 outline-none" role="status">
        <div className="flex items-start gap-3 rounded-2xl bg-sage/15 p-5">
          <CircleCheck size={22} className="mt-0.5 shrink-0 text-sage-dark" aria-hidden="true" />
          <div>
            <p className="font-semibold text-forest">Thank you, {submitted.parentName.trim()} — your enquiry has been received.</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/70">
              The school team will get back to you on {submitted.phone.trim()}. If you would like a faster
              reply, you can also message us directly:
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openWhatsApp(submitted)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-lift"
          >
            <MessageCircle size={18} aria-hidden="true" /> Also message us on WhatsApp
          </button>
          <button
            type="button"
            onClick={() => openEmail(submitted)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-forest/30 px-6 py-3.5 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest/5"
          >
            <Mail size={18} aria-hidden="true" /> Also send an email
          </button>
        </div>
        <button type="button" onClick={handleReset} className="self-start text-sm font-medium text-forest underline underline-offset-4">
          Send another enquiry
        </button>
      </div>
    );
  }

  const fieldError = (field) => touched && errors[field];

  return (
    <form className="flex flex-col gap-5" noValidate onSubmit={handleSave}>
      <div>
        <label htmlFor="parentName" className="mb-1.5 block text-sm font-medium text-forest">
          Parent Name
        </label>
        <input
          id="parentName"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.parentName}
          value={values.parentName}
          onChange={handleChange('parentName')}
          disabled={busy}
          aria-invalid={Boolean(fieldError('parentName'))}
          aria-describedby={fieldError('parentName') ? 'parentName-error' : undefined}
          className={inputClass}
          placeholder="e.g. Priya Sharma"
        />
        <FieldError id="parentName-error" message={fieldError('parentName')} />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-forest">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          maxLength={LIMITS.phone}
          value={values.phone}
          onChange={handleChange('phone')}
          disabled={busy}
          aria-invalid={Boolean(fieldError('phone'))}
          aria-describedby={fieldError('phone') ? 'phone-error' : undefined}
          className={inputClass}
          placeholder="e.g. 98765 43210"
        />
        <FieldError id="phone-error" message={fieldError('phone')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="childAge" className="mb-1.5 block text-sm font-medium text-forest">
            Child&rsquo;s Age
          </label>
          <input
            id="childAge"
            type="text"
            maxLength={LIMITS.childAge}
            value={values.childAge}
            onChange={handleChange('childAge')}
            disabled={busy}
            aria-invalid={Boolean(fieldError('childAge'))}
            aria-describedby={fieldError('childAge') ? 'childAge-error' : undefined}
            className={inputClass}
            placeholder="e.g. 3 years 2 months"
          />
          <FieldError id="childAge-error" message={fieldError('childAge')} />
        </div>

        <div>
          <label htmlFor="program" className="mb-1.5 block text-sm font-medium text-forest">
            Program of Interest
          </label>
          <select
            id="program"
            value={values.program}
            onChange={handleChange('program')}
            disabled={busy}
            aria-invalid={Boolean(fieldError('program'))}
            aria-describedby={fieldError('program') ? 'program-error' : undefined}
            className={inputClass}
          >
            <option value="">Select a program…</option>
            {PROGRAM_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError id="program-error" message={fieldError('program')} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-forest">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={handleChange('message')}
          disabled={busy}
          aria-invalid={Boolean(fieldError('message'))}
          aria-describedby={fieldError('message') ? 'message-error' : undefined}
          className={`${inputClass} resize-none`}
          placeholder="Tell us a little about what you'd like to know..."
        />
        <FieldError id="message-error" message={fieldError('message')} />
      </div>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange('website')}
        />
      </div>

      {saveEnabled && (
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/75">
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            onChange={handleChange('consent')}
            disabled={busy}
            aria-invalid={Boolean(fieldError('consent'))}
            aria-describedby={fieldError('consent') ? 'consent-error' : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-[#344E41]"
          />
          <span>
            I agree that {schoolConfig.identity.name} may store these details and contact me about this
            enquiry. I have read the{' '}
            <Link to="/privacy" className="font-medium text-forest underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError id="consent-error" message={fieldError('consent')} />
      </div>
      )}

      {phase === 'failed' && (
        <div role="alert" className="flex items-start gap-2 rounded-2xl bg-terracotta/10 p-4 text-sm text-terracotta-dark">
          <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <strong>Your enquiry was not saved.</strong> {errors.form || 'Please try again.'} You can still
            reach us right away using WhatsApp or email below.
          </p>
        </div>
      )}

      {saveEnabled ? (
        <>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-semibold text-cream shadow-soft transition-all hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-lift disabled:pointer-events-none disabled:opacity-60"
          >
            {busy ? (
              <>
                <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending…
              </>
            ) : (
              <>
                <Send size={18} aria-hidden="true" /> Submit Enquiry
              </>
            )}
          </button>
          {phase === 'failed' && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleHandOff('whatsapp')}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle size={18} aria-hidden="true" /> Continue via WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleHandOff('email')}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-forest/30 px-6 py-3 text-sm font-semibold text-forest hover:border-forest hover:bg-forest/5"
              >
                <Mail size={18} aria-hidden="true" /> Continue via Email
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="text-xs leading-relaxed text-ink/55">
            This form doesn&rsquo;t send your message directly — pressing a button below will open WhatsApp or
            your email app with these details pre-filled, ready for you to send. Nothing is stored on the
            website.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => handleHandOff('whatsapp')}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-lift"
            >
              <MessageCircle size={18} aria-hidden="true" /> Continue via WhatsApp
            </button>
            <button
              type="button"
              onClick={() => handleHandOff('email')}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-forest/30 px-6 py-3.5 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest/5"
            >
              <Mail size={18} aria-hidden="true" /> Continue via Email
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default ContactForm;
