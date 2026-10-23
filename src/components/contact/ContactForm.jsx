import { useState } from 'react';
import { MessageCircle, Mail, CircleAlert } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';
import { buildWhatsAppLink, buildMailtoLink } from '../../utils/whatsapp';

const INITIAL_VALUES = { parentName: '', phone: '', childInfo: '', message: '' };

function validate(values) {
  const errors = {};
  if (!values.parentName.trim()) errors.parentName = 'Please enter your name.';
  if (!values.phone.trim()) {
    errors.phone = 'Please enter a phone number.';
  } else if (!/^[0-9+\-\s()]{7,15}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!values.childInfo.trim()) errors.childInfo = "Please share your child's age or intended program.";
  if (!values.message.trim()) errors.message = 'Please add a short message.';
  return errors;
}

function buildEnquiryText(values) {
  return [
    `Hello, I would like to know more about admissions at ${schoolConfig.identity.name}.`,
    '',
    `Parent Name: ${values.parentName}`,
    `Phone: ${values.phone}`,
    `Child's Age / Program: ${values.childInfo}`,
    `Message: ${values.message}`,
  ].join('\n');
}

/**
 * Frontend-only enquiry form. There is no backend: submitting hands the
 * entered details off to WhatsApp (primary) or email (alternative) —
 * it never claims to save or deliver the enquiry itself.
 */
export function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  function handleChange(field) {
    return (event) => setValues((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event, channel) {
    event.preventDefault();
    setTouched(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const text = buildEnquiryText(values);

    if (channel === 'whatsapp') {
      window.open(buildWhatsAppLink(text), '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = buildMailtoLink(
        `Admissions Enquiry — ${values.parentName}`,
        text,
      );
    }
  }

  const fieldError = (field) => touched && errors[field];

  return (
    <form className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="parentName" className="mb-1.5 block text-sm font-medium text-forest">
          Parent Name
        </label>
        <input
          id="parentName"
          type="text"
          value={values.parentName}
          onChange={handleChange('parentName')}
          aria-invalid={Boolean(fieldError('parentName'))}
          aria-describedby={fieldError('parentName') ? 'parentName-error' : undefined}
          className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest/40"
          placeholder="e.g. Priya Sharma"
        />
        {fieldError('parentName') && (
          <p id="parentName-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-terracotta-dark">
            <CircleAlert size={13} aria-hidden="true" /> {errors.parentName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-forest">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange('phone')}
          aria-invalid={Boolean(fieldError('phone'))}
          aria-describedby={fieldError('phone') ? 'phone-error' : undefined}
          className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest/40"
          placeholder="e.g. 98765 43210"
        />
        {fieldError('phone') && (
          <p id="phone-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-terracotta-dark">
            <CircleAlert size={13} aria-hidden="true" /> {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="childInfo" className="mb-1.5 block text-sm font-medium text-forest">
          Child&rsquo;s Age / Intended Program
        </label>
        <input
          id="childInfo"
          type="text"
          value={values.childInfo}
          onChange={handleChange('childInfo')}
          aria-invalid={Boolean(fieldError('childInfo'))}
          aria-describedby={fieldError('childInfo') ? 'childInfo-error' : undefined}
          className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest/40"
          placeholder="e.g. 3 years old, interested in Nursery"
        />
        {fieldError('childInfo') && (
          <p id="childInfo-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-terracotta-dark">
            <CircleAlert size={13} aria-hidden="true" /> {errors.childInfo}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-forest">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={values.message}
          onChange={handleChange('message')}
          aria-invalid={Boolean(fieldError('message'))}
          aria-describedby={fieldError('message') ? 'message-error' : undefined}
          className="w-full resize-none rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-forest/40"
          placeholder="Tell us a little about what you'd like to know..."
        />
        {fieldError('message') && (
          <p id="message-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-terracotta-dark">
            <CircleAlert size={13} aria-hidden="true" /> {errors.message}
          </p>
        )}
      </div>

      <p className="text-xs leading-relaxed text-ink/55">
        This form doesn&rsquo;t send your message directly — pressing a button below will open WhatsApp or
        your email app with these details pre-filled, ready for you to send.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={(event) => handleSubmit(event, 'whatsapp')}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-lift"
        >
          <MessageCircle size={18} aria-hidden="true" /> Continue via WhatsApp
        </button>
        <button
          type="button"
          onClick={(event) => handleSubmit(event, 'email')}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-forest/30 px-6 py-3.5 text-sm font-semibold text-forest transition-colors hover:border-forest hover:bg-forest/5"
        >
          <Mail size={18} aria-hidden="true" /> Continue via Email
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
