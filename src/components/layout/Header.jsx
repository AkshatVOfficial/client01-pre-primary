import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Sprout } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';
import { PrimaryButton } from '../ui/PrimaryButton';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 shadow-soft backdrop-blur-md' : 'bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label={`${schoolConfig.identity.name} — home`}>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-cream shadow-soft">
            <Sprout size={22} aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg sm:text-xl text-forest">{schoolConfig.identity.name}</span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-sage-dark sm:block">
              {schoolConfig.identity.shortName}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {schoolConfig.navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                  isActive ? 'bg-forest/10 text-forest' : 'text-ink/80 hover:text-forest'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <PrimaryButton to="/contact" className="hidden sm:inline-flex">
            Enquire Now
          </PrimaryButton>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="inline-flex rounded-full p-2.5 text-forest hover:bg-forest/10 lg:hidden"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

export default Header;
