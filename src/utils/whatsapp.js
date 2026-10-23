import { schoolConfig } from '../config/schoolConfig';

/**
 * Builds a wa.me deep link that opens WhatsApp with a pre-filled message.
 * Falls back to the school's configured default enquiry message.
 *
 * @param {string} [message] - custom message; defaults to schoolConfig's message
 * @param {string} [number] - digits-only WhatsApp number with country code
 * @returns {string} a ready-to-use https://wa.me/... URL
 */
export function buildWhatsAppLink(message, number = schoolConfig.contact.whatsappNumber) {
  const text = message || schoolConfig.contact.whatsappDefaultMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a mailto: link with a pre-filled subject and body.
 *
 * @param {string} subject
 * @param {string} body
 * @param {string} [email]
 * @returns {string}
 */
export function buildMailtoLink(subject, body, email = schoolConfig.contact.email) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${email}?${params.toString().replace(/\+/g, '%20')}`;
}

export default buildWhatsAppLink;
