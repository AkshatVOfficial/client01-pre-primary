import { Link } from 'react-router-dom';
import { Sprout, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';
import { buildWhatsAppLink } from '../../utils/whatsapp';
import { SocialIcon } from '../ui/SocialIcon';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { identity, contact, hours, socials, navLinks } = schoolConfig;

  const activeSocials = Object.entries(socials).filter(([, url]) => Boolean(url));

  return (
    <footer className="bg-forest text-cream">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cream/10">
              <Sprout size={20} aria-hidden="true" />
            </span>
            <span className="font-display text-lg text-cream">{identity.name}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">{identity.tagline}</p>
          {activeSocials.length > 0 && (
            <div className="mt-1 flex gap-3">
              {activeSocials.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${identity.name} on ${key}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
                >
                  <SocialIcon name={key} size={16} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-3">
          <h3 className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-peach">Explore</h3>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm text-cream/75 hover:text-cream">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-peach">Contact</h3>
          <a href={contact.phoneHref} className="flex items-start gap-2 text-sm text-cream/75 hover:text-cream">
            <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="flex items-start gap-2 text-sm text-cream/75 hover:text-cream"
          >
            <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {contact.email}
          </a>
          <a
            href={contact.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-sm text-cream/75 hover:text-cream"
          >
            <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {contact.address.full}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-body text-sm font-semibold uppercase tracking-[0.14em] text-peach">School Hours</h3>
          <p className="flex items-start gap-2 text-sm text-cream/75">
            <Clock size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            {hours.display}
          </p>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-cream/20"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-cream/60 sm:flex-row">
          <p>
            &copy; {CURRENT_YEAR} {identity.name}. All rights reserved.
          </p>
          <p>Designed with care for little learners.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
