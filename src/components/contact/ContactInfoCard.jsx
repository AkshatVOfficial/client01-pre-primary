import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';
import { buildWhatsAppLink } from '../../utils/whatsapp';

export function ContactInfoCard() {
  const { contact, hours } = schoolConfig;

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-forest/8 bg-white/70 p-7 sm:p-8">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage/20 text-sage-dark">
          <Phone size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-forest">Phone</p>
          <a href={contact.phoneHref} className="text-sm text-ink/75 hover:text-forest">
            {contact.phone}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#1da851]">
          <MessageCircle size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-forest">WhatsApp</p>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink/75 hover:text-forest"
          >
            +{contact.whatsappNumber}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-terracotta/15 text-terracotta-dark">
          <Mail size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-forest">Email</p>
          <a href={`mailto:${contact.email}`} className="text-sm text-ink/75 hover:text-forest">
            {contact.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold/40 text-forest">
          <MapPin size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-forest">Address</p>
          <a
            href={contact.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink/75 hover:text-forest"
          >
            {contact.address.full}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
          <Clock size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-forest">School Hours</p>
          <p className="text-sm text-ink/75">{hours.display}</p>
          <p className="text-xs text-ink/50">{hours.note}</p>
        </div>
      </div>
    </div>
  );
}

export default ContactInfoCard;
