import { Seo } from '../components/ui/Seo';
import { Hero } from '../components/home/Hero';
import { TrustHighlights } from '../components/home/TrustHighlights';
import { AboutPreview } from '../components/home/AboutPreview';
import { ProgramsPreview } from '../components/home/ProgramsPreview';
import { Philosophy } from '../components/home/Philosophy';
import { ActivitiesPreview } from '../components/home/ActivitiesPreview';
import { Testimonials } from '../components/home/Testimonials';
import { FinalCta } from '../components/home/FinalCta';
import { seoData } from '../data/seoData';

export function Home() {
  return (
    <>
      <Seo title={null} description={seoData.home.description} path="/" />
      <Hero />
      <TrustHighlights />
      <AboutPreview />
      <ProgramsPreview />
      <Philosophy />
      <ActivitiesPreview />
      <Testimonials />
      <FinalCta />
    </>
  );
}

export default Home;
