/**
 * Gallery data — centralized array of gallery entries.
 * Replace `src` with real, authorized photographs before launch.
 * Keep `id`, `alt`, `caption`, and `category` filled in for every entry —
 * the gallery page and lightbox depend on all four.
 *
 * Categories currently in use: 'Classroom', 'Activities', 'Events', 'Outdoor Play'
 * (feel free to add or rename categories — the filter UI reads them from this file).
 */

export const galleryData = [
  {
    id: 'art-crafts',
    src: '/images/gallery/art-crafts.svg',
    alt: 'Children engaged in an art and craft activity at the preschool',
    caption: 'Art & Craft Time',
    category: 'Activities',
  },
  {
    id: 'storytime',
    src: '/images/gallery/storytime.svg',
    alt: 'A teacher reading a storybook to a group of young children',
    caption: 'Storytelling Circle',
    category: 'Classroom',
  },
  {
    id: 'practical-life',
    src: '/images/gallery/practical-life.svg',
    alt: 'Children practicing everyday life skills with Montessori materials',
    caption: 'Practical Life Activities',
    category: 'Classroom',
  },
  {
    id: 'outdoor-play',
    src: '/images/gallery/outdoor-play.svg',
    alt: 'Children playing together in the outdoor play area',
    caption: 'Outdoor Play',
    category: 'Outdoor Play',
  },
  {
    id: 'music-movement',
    src: '/images/gallery/music-movement.svg',
    alt: 'A music and movement session with children dancing and singing',
    caption: 'Music & Movement',
    category: 'Activities',
  },
  {
    id: 'classroom-exploration',
    src: '/images/gallery/classroom-exploration.svg',
    alt: 'Children exploring learning materials inside the classroom',
    caption: 'Classroom Exploration',
    category: 'Classroom',
  },
  {
    id: 'building-blocks',
    src: '/images/gallery/building-blocks.svg',
    alt: 'Children building and stacking blocks together',
    caption: 'Building & Construction Play',
    category: 'Activities',
  },
  {
    id: 'garden-walk',
    src: '/images/gallery/garden-walk.svg',
    alt: 'Children on a nature walk in the school garden',
    caption: 'Nature & Garden Walk',
    category: 'Outdoor Play',
  },
  {
    id: 'annual-day',
    src: '/images/gallery/annual-day.svg',
    alt: 'Children performing on stage during the annual day celebration',
    caption: 'Annual Day Celebration',
    category: 'Events',
  },
  {
    id: 'sports-day',
    src: '/images/gallery/sports-day.svg',
    alt: 'Children participating in sports day races and games',
    caption: 'Sports Day',
    category: 'Events',
  },
];

export const galleryCategories = ['All', 'Classroom', 'Activities', 'Events', 'Outdoor Play'];

export default galleryData;
