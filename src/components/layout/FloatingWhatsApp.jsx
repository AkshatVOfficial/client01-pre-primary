import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../../utils/whatsapp';

/**
 * Persistent floating WhatsApp shortcut, visible on every page.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 focus-visible:outline-offset-4 sm:bottom-7 sm:right-7"
    >
      <MessageCircle size={26} aria-hidden="true" fill="currentColor" className="text-white" strokeWidth={0} />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}

export default FloatingWhatsApp;
