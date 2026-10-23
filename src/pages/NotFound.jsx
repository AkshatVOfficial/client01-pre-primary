import { Home as HomeIcon, Sprout } from 'lucide-react';
import { Seo } from '../components/ui/Seo';
import { Container } from '../components/ui/Container';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { seoData } from '../data/seoData';

export function NotFound() {
  return (
    <>
      <Seo title={seoData.notFound.title} description={seoData.notFound.description} path="/404" />
      <section className="flex min-h-[70vh] items-center py-20">
        <Container className="flex flex-col items-center gap-6 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-sage/20 text-sage-dark">
            <Sprout size={28} aria-hidden="true" />
          </span>
          <span className="font-display text-6xl text-forest/20">404</span>
          <h1 className="text-3xl sm:text-4xl text-forest text-balance">This Page Wandered Off</h1>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-ink/70">
            We couldn&rsquo;t find the page you were looking for. Let&rsquo;s get you back to familiar ground.
          </p>
          <PrimaryButton to="/" icon={HomeIcon}>
            Back to Home
          </PrimaryButton>
        </Container>
      </section>
    </>
  );
}

export default NotFound;
