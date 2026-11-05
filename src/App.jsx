import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Programs = lazy(() => import('./pages/Programs'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin area is lazy-loaded so the public bundle stays small.
const AdminRoot = lazy(() => import('./pages/admin/AdminRoot'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const RequireAdmin = lazy(() => import('./auth/RequireAdmin'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminEnquiries = lazy(() => import('./pages/admin/Enquiries'));
const AdminEnquiryDetail = lazy(() => import('./pages/admin/EnquiryDetail'));
const AdminGallery = lazy(() => import('./pages/admin/GalleryAdmin'));
const AdminSecurity = lazy(() => import('./pages/admin/Security'));
const AdminAnnouncements = lazy(() => import('./pages/admin/Announcements'));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/admin" element={<AdminRoot />}>
              <Route path="login" element={<AdminLogin />} />
              <Route element={<RequireAdmin />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="enquiries" element={<AdminEnquiries />} />
                  <Route path="enquiries/:id" element={<AdminEnquiryDetail />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="announcements" element={<AdminAnnouncements />} />
                  <Route path="security" element={<AdminSecurity />} />
                </Route>
              </Route>
            </Route>

            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
