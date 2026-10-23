import { Helmet } from 'react-helmet-async';
import { schoolConfig } from '../../config/schoolConfig';

/**
 * Page-level metadata: title, description, canonical URL, and Open Graph tags.
 * Usage: <Seo title="About Us" description="..." path="/about" />
 */
export function Seo({ title, description, path = '/' }) {
  const { seo } = schoolConfig;
  const fullTitle = title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle;
  const metaDescription = description || seo.defaultDescription;
  const canonicalUrl = `${seo.siteUrl.replace(/\/$/, '')}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="theme-color" content={seo.themeColor} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${seo.siteUrl.replace(/\/$/, '')}${seo.ogImage}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${seo.siteUrl.replace(/\/$/, '')}${seo.ogImage}`} />
    </Helmet>
  );
}

export default Seo;
