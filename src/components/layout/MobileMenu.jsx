import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';
import { PrimaryButton } from '../ui/PrimaryButton';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useFocusTrap } from '../../hooks/useFocusTrap';

export function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button
        type="button"
        aria-label="Close menu overlay"
        onClick={onClose}
        className="absolute inset-0 bg-forest/40 backdrop-blur-sm animate-fade-in"
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col bg-cream px-6 py-6 shadow-lift"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xl text-forest">{schoolConfig.identity.shortName}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex rounded-full p-2 text-forest hover:bg-forest/10"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-1">
          {schoolConfig.navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-xl px-3 py-3 font-body text-lg font-medium transition-colors ${
                  isActive ? 'bg-sage/20 text-forest' : 'text-ink hover:bg-forest/5'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 pt-10">
          <PrimaryButton to="/contact" onClick={onClose} className="w-full">
            Enquire Now
          </PrimaryButton>
          <a href={schoolConfig.contact.phoneHref} className="text-center text-sm font-medium text-forest/70">
            Call {schoolConfig.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
