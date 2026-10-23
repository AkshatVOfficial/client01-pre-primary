import { schoolConfig } from '../config/schoolConfig';

/**
 * Per-page SEO overrides. Falls back to schoolConfig.seo defaults for
 * anything not specified here. Edit titles/descriptions per page as needed.
 */
export const seoData = {
  home: {
    title: schoolConfig.seo.defaultTitle,
    description: schoolConfig.seo.defaultDescription,
  },
  about: {
    title: 'About Us',
    description:
      "Learn about Little Roots Preschool's mission, teaching philosophy, and child-centered approach to early childhood education.",
  },
  programs: {
    title: 'Our Programs',
    description:
      'Explore our Playgroup, Nursery, Junior KG, and Senior KG programs — play-based learning designed for every stage of early childhood.',
  },
  gallery: {
    title: 'Gallery',
    description:
      'A glimpse into daily life at Little Roots Preschool — classroom moments, activities, events, and outdoor play.',
  },
  contact: {
    title: 'Contact & Admissions',
    description:
      'Get in touch with Little Roots Preschool for admissions enquiries, school visits, and more information about our programs.',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
  },
};

export default seoData;
