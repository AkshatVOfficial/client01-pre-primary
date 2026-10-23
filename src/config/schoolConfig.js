/**
 * ============================================================================
 *  SCHOOL CONFIGURATION — EDIT THIS FILE FOR YOUR CLIENT
 * ============================================================================
 *  Every piece of school-specific content lives here: name, contact details,
 *  programs, gallery, testimonials, SEO defaults, etc. Nothing below should
 *  need to be hunted for inside components — change it once, here, and it
 *  updates everywhere on the site.
 *
 *  WHAT YOU WILL LIKELY NEED TO CHANGE FOR A REAL CLIENT:
 *   1. identity        — school name, tagline, logo text, founding year
 *   2. contact          — phone, WhatsApp, email, address, map link
 *   3. hours             — operating days & timings
 *   4. announcement      — top banner text (or turn it off)
 *   5. socials            — social links (remove any the school doesn't have)
 *   6. programs             — rename / re-age / re-describe each program
 *   7. testimonials          — replace with real, permitted parent quotes
 *   8. gallery                — replace placeholder illustrations with real,
 *                                authorized photos (see src/data/galleryData.js)
 *   9. seo                      — titles/descriptions per page + OG defaults
 * ============================================================================
 */

export const schoolConfig = {
  // ---------------------------------------------------------------------
  // 1. IDENTITY
  // ---------------------------------------------------------------------
  identity: {
    name: 'Little Roots Preschool',
    shortName: 'Little Roots',
    tagline: 'Growing Curious Minds, One Little Step at a Time',
    foundedYear: '2024', // placeholder — update with real founding year
    logoText: 'LR', // used by the text-based placeholder logo mark
    description:
      'A warm, play-based early learning environment where children explore, create, and grow at their own pace.',
  },

  // ---------------------------------------------------------------------
  // 2. CONTACT
  // ---------------------------------------------------------------------
  contact: {
    phone: '+91 90000 00000',
    phoneHref: 'tel:+919000000000',
    whatsappNumber: '919000000000', // digits only, country code included, no "+"
    whatsappDefaultMessage:
      'Hello, I would like to know more about admissions at Little Roots Preschool.',
    email: 'hello@example.com',
    address: {
      line1: 'Enter School Address Here',
      line2: 'Your City, Your State – 000000',
      full: 'Enter School Address Here, Your City, Your State – 000000',
    },
    // Replace with the real Google Maps embed / share link for the school.
    mapEmbedUrl:
      'https://www.google.com/maps?q=Your+City,+Your+State&output=embed',
    mapLinkUrl: 'https://www.google.com/maps?q=Your+City,+Your+State',
  },

  // ---------------------------------------------------------------------
  // 3. HOURS
  // ---------------------------------------------------------------------
  hours: {
    days: 'Monday – Saturday',
    time: '8:30 AM – 1:00 PM',
    display: 'Monday–Saturday, 8:30 AM–1:00 PM',
    note: 'Closed on public holidays and declared school holidays.',
  },

  // ---------------------------------------------------------------------
  // 4. ANNOUNCEMENT BAR
  // ---------------------------------------------------------------------
  announcement: {
    show: true,
    text: 'Admissions Open for the New Academic Session',
    linkLabel: 'Enquire Now',
    linkTo: '/contact',
  },

  // ---------------------------------------------------------------------
  // 5. SOCIAL LINKS — set a value to '' to hide that icon in the footer
  // ---------------------------------------------------------------------
  socials: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: '',
  },

  // ---------------------------------------------------------------------
  // 6. PRIMARY NAVIGATION
  // ---------------------------------------------------------------------
  navLinks: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Programs', to: '/programs' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ],

  // ---------------------------------------------------------------------
  // 7. TRUST HIGHLIGHTS (Home page, section D)
  // ---------------------------------------------------------------------
  trustHighlights: [
    {
      icon: 'Blocks',
      title: 'Play-Based Learning',
      description: 'Hands-on activities that turn everyday curiosity into real understanding.',
    },
    {
      icon: 'HeartHandshake',
      title: 'Caring Educators',
      description: 'Warm, attentive teachers who know every child by name and by nature.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Safe Learning Spaces',
      description: 'Bright, child-proofed classrooms designed for little explorers.',
    },
    {
      icon: 'Sprout',
      title: 'Holistic Development',
      description: 'Supporting the whole child — mind, body, heart, and creativity.',
    },
  ],

  // ---------------------------------------------------------------------
  // 8. PROGRAMS
  //    Rename "label" freely — the school may use different conventions
  //    (e.g. "Pre-KG" instead of "Playgroup").
  // ---------------------------------------------------------------------
  programs: [
    {
      id: 'playgroup',
      label: 'Playgroup',
      ageRange: '1.5 – 2.5 years*',
      slug: 'playgroup',
      shortDescription:
        'A gentle first step away from home, built around sensory play and secure routines.',
      objectives: [
        'Build comfort being away from parents in a safe setting',
        'Develop early motor and sensory skills',
        'Begin recognizing colors, shapes, and simple words',
        'Encourage independence in small daily tasks',
      ],
      activities: [
        'Sensory bins and texture play',
        'Picture books and rhyme time',
        'Free play with soft blocks and toys',
        'Simple music and movement circles',
      ],
      color: 'sage',
    },
    {
      id: 'nursery',
      label: 'Nursery',
      ageRange: '2.5 – 3.5 years*',
      slug: 'nursery',
      shortDescription:
        'Curiosity-led exploration that strengthens language, coordination, and confidence.',
      objectives: [
        'Expand vocabulary through conversation and storytelling',
        'Strengthen fine motor skills through hands-on materials',
        'Introduce turn-taking and group play',
        'Encourage self-expression through art and imagination',
      ],
      activities: [
        'Montessori practical-life materials',
        'Art, craft, and free drawing',
        'Outdoor and gross-motor play',
        'Show-and-tell and group storytime',
      ],
      color: 'terracotta',
    },
    {
      id: 'junior-kg',
      label: 'Junior KG / LKG',
      ageRange: '3.5 – 4.5 years*',
      slug: 'junior-kg',
      shortDescription:
        'Structured exploration of letters, numbers, and the world — always through play.',
      objectives: [
        'Build early literacy: letter sounds and recognition',
        'Introduce early numeracy and pattern recognition',
        'Develop social skills through collaborative activities',
        'Nurture curiosity about nature and the everyday world',
      ],
      activities: [
        'Phonics and pre-reading circles',
        'Number games and counting activities',
        'Nature walks and simple science play',
        'Role play and dramatic corners',
      ],
      color: 'gold',
    },
    {
      id: 'senior-kg',
      label: 'Senior KG / UKG',
      ageRange: '4.5 – 5.5 years*',
      slug: 'senior-kg',
      shortDescription:
        'School-readiness built on confidence, curiosity, and a genuine love of learning.',
      objectives: [
        'Strengthen reading, writing, and early comprehension',
        'Build number sense, early addition, and problem-solving',
        'Develop focus, listening, and classroom routines',
        'Prepare emotionally and socially for primary school',
      ],
      activities: [
        'Guided reading and writing practice',
        'Math manipulatives and logic games',
        'Collaborative projects and presentations',
        'Music, movement, and creative play',
      ],
      color: 'forest',
    },
  ],
  programsNote:
    '*Age ranges are placeholders provided for planning purposes only. Please confirm exact eligibility and cut-off dates with the school directly.',

  // ---------------------------------------------------------------------
  // 9. LEARNING PHILOSOPHY (Home page, section G)
  // ---------------------------------------------------------------------
  philosophy: {
    eyebrow: 'How We Teach',
    heading: 'Learning That Looks Like Play',
    paragraphs: [
      'At Little Roots, we believe young children learn best when they are curious, comfortable, and free to explore at their own pace. Our classrooms are designed as little worlds of discovery — inviting hands to touch, eyes to wonder, and minds to ask "why?"',
      'Every activity, from stacking blocks to planting seeds, is chosen with intention: to build coordination, language, confidence, and empathy, one small moment at a time. We guide rather than direct, letting each child\'s own pace lead the way.',
      'Independence is woven into daily routines — pouring, buttoning, tidying — because we believe capability builds self-esteem. And because learning is social too, children work and play together often, building the first threads of friendship and cooperation.',
    ],
    pillars: [
      { title: 'Exploration', description: 'Open-ended materials that invite questions.' },
      { title: 'Hands-On Practice', description: 'Learning by doing, not just watching.' },
      { title: 'Social Growth', description: 'Everyday moments of sharing and teamwork.' },
      { title: 'Independence', description: 'Small freedoms that build big confidence.' },
    ],
  },

  // ---------------------------------------------------------------------
  // 10. TESTIMONIALS — placeholder content only; replace with real,
  //     approved parent quotes before launch. Set `show: false` to hide
  //     the whole section if no testimonials are available yet.
  // ---------------------------------------------------------------------
  testimonials: {
    show: true,
    items: [
      {
        quote:
          'Placeholder testimonial — replace with a real, approved quote from a parent before launch.',
        name: 'Parent Name (Placeholder)',
        relation: 'Parent of a Nursery student',
      },
      {
        quote:
          'Placeholder testimonial — replace with a real, approved quote from a parent before launch.',
        name: 'Parent Name (Placeholder)',
        relation: 'Parent of a Senior KG student',
      },
      {
        quote:
          'Placeholder testimonial — replace with a real, approved quote from a parent before launch.',
        name: 'Parent Name (Placeholder)',
        relation: 'Parent of a Playgroup student',
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 11. ABOUT PAGE CONTENT
  // ---------------------------------------------------------------------
  about: {
    intro: {
      eyebrow: 'About Little Roots',
      heading: 'A Little Place Where Big Growth Begins',
      body: 'Little Roots Preschool was founded on a simple idea: that early childhood is not preparation for life — it already is life, and it deserves to be met with warmth, patience, and wonder. Enter the school\'s real story, history, and founding details here.',
    },
    mission: {
      title: 'Our Mission',
      body: 'To nurture confident, curious, and compassionate learners by providing a safe, joyful environment where every child is free to explore, question, and grow.',
    },
    vision: {
      title: 'Our Vision',
      body: 'A world where every child\'s early years are filled with wonder, kindness, and the freedom to discover who they are.',
    },
    teachingPhilosophy: {
      title: 'Our Teaching Philosophy',
      body: 'We follow a child-centered approach inspired by Montessori principles — observing each child closely, offering materials that match their developmental stage, and stepping back to let genuine learning unfold through play and practice.',
    },
    holisticDevelopment: {
      title: 'Holistic Development',
      body: 'We nurture every dimension of growth, not just academic readiness.',
      areas: [
        { title: 'Cognitive', description: 'Problem-solving, language, and early literacy & numeracy.' },
        { title: 'Physical', description: 'Fine and gross motor skills through active, hands-on play.' },
        { title: 'Social', description: 'Sharing, cooperation, and building early friendships.' },
        { title: 'Emotional', description: 'Confidence, self-regulation, and a sense of security.' },
        { title: 'Creative', description: 'Art, music, imagination, and self-expression.' },
      ],
    },
    facilities: {
      title: 'Our Facilities',
      body: 'Bright, child-safe classrooms, a dedicated activity and play area, a reading corner, and an outdoor space for movement and fresh air. (Replace with the school\'s actual facilities.)',
      items: [
        'Bright, child-proofed classrooms',
        'Dedicated indoor activity area',
        'Cozy reading & storytelling corner',
        'Outdoor play space',
        'Hygienic, child-friendly washrooms',
        'Safe entry & pickup area',
      ],
    },
    educator: {
      title: 'Meet the Principal / Lead Educator',
      name: 'Educator Name (Placeholder)',
      role: 'Principal / Founder',
      bio: 'Add a short, warm introduction of the principal or lead educator here — their background, approach to early education, and what draws them to working with young children. Avoid stating specific qualifications or years of experience until confirmed by the school.',
    },
  },

  // ---------------------------------------------------------------------
  // 12. SEO DEFAULTS — per-page overrides live in src/data/seoData.js
  // ---------------------------------------------------------------------
  seo: {
    siteName: 'Little Roots Preschool',
    defaultTitle: 'Little Roots Preschool — Growing Curious Minds',
    titleTemplate: '%s | Little Roots Preschool',
    defaultDescription:
      'A warm, play-based preschool nurturing curious, confident learners. Explore our programs, philosophy, and admissions at Little Roots Preschool.',
    siteUrl: 'https://www.example.com', // update with the real production domain
    ogImage: '/images/og-cover.svg', // replace with a real social-share image
    themeColor: '#344E41',
  },
};

export default schoolConfig;
