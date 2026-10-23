import { Outlet } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { useScrollToTop } from '../../hooks/useScrollToTop';

/**
 * Root layout: announcement bar + header stay sticky at top, footer at
 * bottom, routed page content via <Outlet />. Also resets scroll on
 * route change.
 */
export function Layout() {
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-cream"
      >
        Skip to main content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default Layout;
