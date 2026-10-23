# Little Roots Preschool — Complete Project Guide

A premium, fully responsive React + Vite + Tailwind CSS website for a pre-primary school. Built with clean architecture, reusable components, and centralized configuration for easy client customization.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Quick Start](#quick-start)
4. [Pages & Features](#pages--features)
5. [What You Can Edit](#what-you-can-edit)
6. [File Locations for Customization](#file-locations-for-customization)
7. [Design System](#design-system)
8. [Deployment](#deployment)
9. [Component Architecture](#component-architecture)
10. [SEO & Metadata](#seo--metadata)

---

## 🎯 Overview

This website is designed for pre-primary schools (playgroups, nurseries, KG/LKG/UKG) with a **premium Soft Montessori** aesthetic.

**Key Features:**
- ✅ 5 fully functional pages (Home, About, Programs, Gallery, Contact)
- ✅ Responsive design (mobile 320px → desktop 1920px+)
- ✅ Gallery with category filters & keyboard-accessible lightbox
- ✅ WhatsApp & email enquiry integration (no backend required)
- ✅ Sticky header with mobile navigation
- ✅ Announcement bar (easily toggleable)
- ✅ SEO-friendly with page-specific metadata
- ✅ Accessibility best practices (WCAG compliance, keyboard navigation)
- ✅ Production-ready, zero configuration needed

---

## 📁 Project Structure

```
little-roots-preschool/
├── public/
│   ├── images/
│   │   ├── hero/                     # Hero section images
│   │   ├── programs/                 # Program card illustrations
│   │   ├── about/                    # About page images
│   │   ├── gallery/                  # Gallery placeholder images
│   │   └── og-cover.svg             # Open Graph image
│   ├── favicon.svg
│   ├── robots.txt                    # SEO robot directives
│   └── sitemap.xml                   # XML sitemap
│
├── src/
│   ├── config/
│   │   └── schoolConfig.js           # 🎯 MAIN CONFIG FILE — Edit here!
│   │
│   ├── data/
│   │   ├── galleryData.js            # Gallery entries (images, captions, categories)
│   │   └── seoData.js                # Page metadata & titles
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx            # Header with nav & logo
│   │   │   ├── MobileMenu.jsx        # Mobile hamburger menu
│   │   │   ├── Footer.jsx            # Footer with links & contact
│   │   │   ├── AnnouncementBar.jsx   # Top announcement banner
│   │   │   ├── FloatingWhatsApp.jsx  # Green WhatsApp button (bottom-right)
│   │   │   └── Layout.jsx            # Wrapper component for all pages
│   │   │
│   │   ├── ui/
│   │   │   ├── PrimaryButton.jsx     # CTA buttons (green)
│   │   │   ├── SectionHeading.jsx    # Section titles
│   │   │   ├── PageHero.jsx          # Page header with background
│   │   │   ├── FeatureItem.jsx       # Small cards for highlights
│   │   │   ├── Container.jsx         # Max-width wrapper
│   │   │   ├── IconBadge.jsx         # Small icon + text combo
│   │   │   ├── SocialIcon.jsx        # Social media icons
│   │   │   └── Seo.jsx               # Meta tags component
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx              # Hero section (eyebrow, heading, CTA)
│   │   │   ├── TrustHighlights.jsx   # 4 trust badges
│   │   │   ├── AboutPreview.jsx      # Brief about + link to full page
│   │   │   ├── ProgramsPreview.jsx   # Program cards
│   │   │   ├── Philosophy.jsx        # Learning philosophy section
│   │   │   ├── ActivitiesPreview.jsx # Gallery preview (6 images)
│   │   │   ├── Testimonials.jsx      # Parent testimonial cards
│   │   │   ├── TestimonialCard.jsx   # Single testimonial
│   │   │   └── FinalCta.jsx          # Bottom call-to-action
│   │   │
│   │   ├── about/
│   │   │   └── HolisticGrid.jsx      # 5-pillar development grid
│   │   │
│   │   ├── programs/
│   │   │   ├── ProgramCard.jsx       # Program card (name, age, description)
│   │   │   └── ProgramDetail.jsx     # Expandable program details
│   │   │
│   │   ├── gallery/
│   │   │   ├── GalleryGrid.jsx       # Main gallery grid
│   │   │   ├── GalleryFilters.jsx    # Category filter buttons
│   │   │   ├── GalleryImage.jsx      # Single image in grid
│   │   │   └── GalleryLightbox.jsx   # Modal lightbox (keyboard accessible)
│   │   │
│   │   └── contact/
│   │       ├── ContactForm.jsx       # Enquiry form (WhatsApp/email)
│   │       ├── ContactInfoCard.jsx   # Phone/email/address cards
│   │       ├── MapEmbed.jsx          # Google Maps embed
│   │       └── Faq.jsx               # FAQs section
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # Home page
│   │   ├── About.jsx                 # About Us page
│   │   ├── Programs.jsx              # Programs page
│   │   ├── Gallery.jsx               # Gallery page
│   │   ├── Contact.jsx               # Contact & Admissions page
│   │   └── NotFound.jsx              # 404 page
│   │
│   ├── hooks/
│   │   ├── useScrollToTop.js         # Auto-scroll on page change
│   │   ├── useLockBodyScroll.js      # Prevent body scroll on modal open
│   │   └── useFocusTrap.js           # Keyboard focus management
│   │
│   ├── utils/
│   │   └── whatsapp.js               # WhatsApp URL encoder & helper
│   │
│   ├── App.jsx                       # React Router setup
│   ├── main.jsx                      # Vite entry point
│   └── index.css                     # Global styles (Tailwind imports)
│
├── index.html                        # HTML entry point
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS config
├── package.json                      # Dependencies
├── vercel.json                       # Vercel SPA rewrite config
└── README.md                         # This file
```

---

## 🚀 Quick Start

### 1. **Install dependencies**
```bash
npm install
```

### 2. **Run development server**
```bash
npm run dev
```
Opens at `http://localhost:5173`

### 3. **Build for production**
```bash
npm run build
```
Outputs to `dist/` folder

### 4. **Preview production build locally**
```bash
npm run preview
```

### 5. **Run linter**
```bash
npm run lint
```

---

## 📄 Pages & Features

### **Home Page** (`/`)
- Announcement bar (editable, can be hidden)
- Hero section with eyebrow, heading, CTA buttons, and decorative shapes
- Trust highlights (4 badges: Play-Based Learning, Caring Educators, Safe Spaces, Holistic Development)
- About preview with link to full About page
- Program cards preview (all 4 programs)
- Learning philosophy editorial section
- Gallery preview (6 curated images)
- Parent testimonials (2-3 cards, can be hidden)
- Final call-to-action section
- Footer with nav links, contact info, social media

### **About Us Page** (`/about`)
- Page hero with title
- School introduction & mission
- Vision statement
- Teaching philosophy
- 5-pillar holistic development grid (Cognitive, Physical, Social, Emotional, Creative)
- Facilities preview
- Educator/Principal introduction
- CTA to programs or contact

### **Programs Page** (`/programs`)
- Dedicated section for each program:
  - Playgroup
  - Nursery
  - Junior KG / LKG
  - Senior KG / UKG
- Each program shows: name, age range, description, learning objectives, activities, illustration
- Program philosophy section (play, creativity, language, social interaction)
- Bottom CTA to contact for enquiries

### **Gallery Page** (`/gallery`)
- Responsive image grid with varied proportions
- Category filters (All, Classroom, Activities, Events, Outdoor Play)
- Hover effects on images
- Click-to-open lightbox modal
- Keyboard navigation (← → arrows to navigate, ESC to close)
- Image captions
- Accessible focus indicators

### **Contact & Admissions Page** (`/contact`)
- Welcome heading
- Enquiry form with fields: Parent Name, Phone, Child's Age/Program, Message
- Form validation with error messages
- Two submission options:
  - "Continue via WhatsApp" — opens WhatsApp with pre-filled message
  - "Send via Email" — opens mailto: with pre-filled body
- Contact info cards (Phone, WhatsApp, Email, Address)
- Google Maps embed
- School hours display
- FAQ section with collapsible answers
- Explanation that form is frontend-only (no database backend)

---

## ✏️ What You Can Edit

### **Configuration File** — `src/config/schoolConfig.js`

This is the **single source of truth** for all school information. Edit here once, and it updates everywhere on the site.

```javascript
schoolConfig = {
  identity: {
    name: 'Little Roots Preschool',              // School name
    shortName: 'Little Roots',                   // Short version (used in some headers)
    tagline: 'Growing Curious Minds...',         // School tagline
    foundedYear: '2024',                         // Founding year
    logoText: 'LR',                              // Logo initials (text-based placeholder)
    description: 'A warm, play-based...',        // SEO description
  },

  contact: {
    phone: '+91 90000 00000',                    // Display phone number
    phoneHref: 'tel:+919000000000',              // Clickable tel: link
    whatsappNumber: '919000000000',              // Digits only, no +
    whatsappDefaultMessage: 'Hello, I would...', // Pre-filled WhatsApp message
    email: 'hello@example.com',                  // School email
    address: {
      line1: 'Enter School Address Here',
      line2: 'Your City, Your State – 000000',
      full: 'Full address for maps/footer',
    },
    mapEmbedUrl: 'https://www.google.com/maps?q=...',  // Google Maps embed URL
    mapLinkUrl: 'https://www.google.com/maps?q=...',   // Google Maps link URL
  },

  hours: {
    days: 'Monday – Saturday',
    time: '8:30 AM – 1:00 PM',
    display: 'Monday–Saturday, 8:30 AM–1:00 PM',
    note: 'Closed on public holidays...',
  },

  announcement: {
    show: true,                              // Set to false to hide announcement bar
    text: 'Admissions Open for...',
    linkLabel: 'Enquire Now',
    linkTo: '/contact',
  },

  socials: {
    instagram: 'https://instagram.com/',     // Set to '' to hide
    facebook: 'https://facebook.com/',       // Set to '' to hide
    youtube: '',                             // Already hidden
  },

  programs: [
    {
      id: 'playgroup',
      name: 'Playgroup',
      ageRange: '18 months – 2.5 years',
      description: 'Focused on play-based exploration...',
      objectives: ['...', '...'],
      activities: ['Free play', 'Sensory activities'],
      image: '/images/programs/playgroup.svg',
    },
    // ... Nursery, Junior KG, Senior KG similarly
  ],

  testimonials: [
    {
      id: 1,
      name: '[Parent Name — Placeholder]',
      childName: '[Child Name — Placeholder]',
      quote: '[Placeholder parent testimonial...]',
      show: true,  // Set to false to hide individual testimonial
    },
    // ...
  ],

  seo: {
    defaultTitle: 'Little Roots Preschool | Play-Based Early Learning',
    defaultDescription: 'A warm, welcoming...',
    ogImage: '/og-cover.svg',
    pages: {
      home: { title: '...', description: '...' },
      about: { title: '...', description: '...' },
      // ... per-page metadata
    },
  },
};
```

---

## 📍 File Locations for Customization

### **🎯 MUST EDIT FIRST** 
| What | Where | Example |
|------|-------|---------|
| School name, phone, email, address | `src/config/schoolConfig.js` | Lines 29–56 |
| School hours | `src/config/schoolConfig.js` | Lines 62–67 |
| Announcement bar (on/off, text) | `src/config/schoolConfig.js` | Lines 72–77 |
| Program names, ages, descriptions | `src/config/schoolConfig.js` | Lines 120–180+ |
| Testimonials | `src/config/schoolConfig.js` | Lines 200–250+ |
| Page titles & SEO descriptions | `src/config/schoolConfig.js` | Lines 300+ (seo section) |
| Social media links | `src/config/schoolConfig.js` | Lines 82–86 |

### **🖼️ Images to Replace**
| Purpose | Location | Action |
|---------|----------|--------|
| Logo/favicon | `public/favicon.svg` | Replace with school logo |
| Hero image | `public/images/hero/hero-classroom.svg` | Replace with real classroom photo |
| Program illustrations | `public/images/programs/*.svg` | Replace with program photos (playgroup.svg, nursery.svg, junior-kg.svg, senior-kg.svg) |
| About page images | `public/images/about/about-*.svg` | Replace with school facility/educator photos |
| Gallery images | `public/images/gallery/*.svg` | Replace with activity photos |
| Open Graph image | `public/og-cover.svg` | Replace with school branding image |

### **Gallery Data** — `src/data/galleryData.js`
Add, edit, or remove gallery images here. Each entry:
```javascript
{
  id: 'img-001',
  src: '/images/gallery/art-crafts.svg',      // Path to image file
  alt: 'Children doing art activities',       // Alt text for accessibility
  caption: 'Art & Crafts',                    // Caption shown on hover
  category: 'Activities',                     // Filter category
}
```

### **SEO & Meta Tags** — `src/data/seoData.js`
Per-page titles, descriptions, and Open Graph metadata for social sharing.

---

## 🎨 Design System

### **Color Palette** (defined in `tailwind.config.js`)
- **Warm Cream**: `#FAF7F0` — Primary background
- **Deep Forest Green**: `#344E41` — Headings, buttons, accents
- **Soft Sage Green**: `#9CAF88` — Secondary accents
- **Muted Terracotta**: `#D98B73` — Highlights
- **Warm Peach**: `#F3D6C6` — Soft highlights
- **Pale Yellow**: `#F2E6A7` — Decorative accents
- **Body Text**: `#41443F` — Dark gray text

### **Typography**
- **Headings**: DM Serif Display (elegant serif, from Google Fonts)
- **Body**: DM Sans (clean sans-serif, from Google Fonts)
- Fallbacks: Georgia → serif; sans-serif → system stack

### **Visual Elements**
- Rounded corners (8-12px typically)
- Subtle shadows (no excessive drop-shadows)
- Organic decorative shapes (SVG blobs)
- Simple line icons from Lucide React

---

## 🌐 Deployment

### **Deploy to Vercel**

**Option 1: Git Push** (Recommended)
```bash
# 1. Initialize git locally
git init
git add .
git commit -m "Initial commit: Little Roots Preschool website"

# 2. Push to GitHub/GitLab/Bitbucket
git remote add origin <your-repo-url>
git push -u origin main

# 3. Connect to Vercel
# Go to vercel.com → Import Project → Select your repo
# Vercel auto-detects Vite (build command: vite build, output: dist/)
# Deploy button → Done!
```

**Option 2: CLI Deploy** (Quick Test)
```bash
npm run build
npx vercel
# Follow prompts — it will deploy the dist/ folder
```

### **Important: Vercel Routing**
The file `vercel.json` already includes SPA rewrites:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This ensures that direct loads on `/about`, `/programs`, `/gallery`, `/contact` (and page refreshes) work correctly with React Router.

### **Connect Custom Domain**
After deployment:
1. Go to your Vercel project settings → Domains
2. Add your custom domain (e.g., littlerootspreschool.com)
3. Follow DNS instructions from your domain registrar

---

## 🧩 Component Architecture

### **Layout Components** (`src/components/layout/`)
- **Header.jsx** — Sticky nav, logo, links, Enquire button
- **MobileMenu.jsx** — Mobile hamburger menu (hidden on desktop, opens/closes correctly)
- **Footer.jsx** — School info, nav links, social icons, copyright
- **AnnouncementBar.jsx** — Top banner (can be toggled on/off via config)
- **FloatingWhatsApp.jsx** — Green WhatsApp button (bottom-right corner)
- **Layout.jsx** — Wrapper that applies Header/Footer to all pages

### **UI Components** (`src/components/ui/`)
- **PrimaryButton.jsx** — Green CTA buttons
- **SectionHeading.jsx** — Section titles with optional description
- **PageHero.jsx** — Page header (eyebrow, title, description, background)
- **Container.jsx** — Max-width wrapper (1120px)
- **FeatureItem.jsx** — Small card: icon + heading + text
- **IconBadge.jsx** — Icon in circle + text (compact format)
- **SocialIcon.jsx** — Social media icon links
- **Seo.jsx** — Meta tags (Helmet wrapper)

### **Page Components** (`src/pages/`)
- **Home.jsx** — Imports and arranges all home sections
- **About.jsx** — Mission, philosophy, holistic development grid
- **Programs.jsx** — Program cards with accordion details
- **Gallery.jsx** — Grid, filters, lightbox
- **Contact.jsx** — Form, info cards, map, FAQs
- **NotFound.jsx** — 404 page

### **Section Components**
- **home/Hero.jsx** — Hero with CTA buttons
- **home/TrustHighlights.jsx** — 4 trust badges
- **home/ProgramsPreview.jsx** — Program card grid
- **home/Testimonials.jsx** — Testimonial cards
- **gallery/GalleryGrid.jsx** — Responsive image grid
- **gallery/GalleryLightbox.jsx** — Modal (keyboard accessible)
- **contact/ContactForm.jsx** — Enquiry form

---

## 🔍 SEO & Metadata

### **Page-Specific Titles & Descriptions**
Defined in `src/data/seoData.js` and used via the `<Seo />` component in each page.

Example:
```javascript
home: {
  title: 'Little Roots Preschool | Play-Based Early Learning',
  description: 'A warm, welcoming preschool...'
}
```

### **Open Graph (OG) Tags**
Social media preview image, title, description set in config's `seo.ogImage`.

### **Sitemap & Robots**
- `public/sitemap.xml` — Lists all pages
- `public/robots.txt` — Directs search engine crawlers

**Note:** Update domain in both files once real domain is live.

### **Meta Tags Generated**
- Viewport (mobile responsive)
- Theme color (forest green)
- Description
- OG tags (image, title, description for Facebook/LinkedIn shares)
- Twitter card tags

---

## 🎓 Accessibility & Performance

### **Accessibility Features**
- ✅ Semantic HTML (`<nav>`, `<main>`, `<footer>`, etc.)
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Image alt text on all images
- ✅ Form labels & error messages
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus indicators (visible on button/link focus)
- ✅ ARIA attributes on modal & interactive components
- ✅ Color contrast ratio ≥ 4.5:1

### **Performance**
- Lazy-loaded images (native `loading="lazy"`)
- Optimized bundle (Vite tree-shaking)
- CSS Tailwind purging (unused styles removed in build)
- No external analytics or tracking (privacy-first)
- Gzipped assets on Vercel (~100KB total JS+CSS)

---

## 🔧 Development Workflow

### **To Edit & Test Locally**

1. **Make changes to config:**
   ```bash
   # Edit src/config/schoolConfig.js
   # Changes appear instantly on dev server
   ```

2. **Add gallery images:**
   ```bash
   # 1. Drop images into public/images/gallery/
   # 2. Edit src/data/galleryData.js to add entries
   # Gallery updates automatically
   ```

3. **Update program details:**
   ```bash
   # Edit programs[] array in src/config/schoolConfig.js
   # All pages referencing programs update instantly
   ```

4. **Test responsiveness:**
   ```bash
   # Use browser DevTools (F12) → Ctrl+Shift+M (device toolbar)
   # Test at 320px, 375px, 768px, 1024px widths
   ```

5. **Check links & form submission:**
   - WhatsApp button: Opens WhatsApp with pre-filled message ✓
   - Email form button: Opens mailto: with pre-filled body ✓
   - Navigation links: All work correctly ✓
   - Mobile menu: Opens/closes correctly ✓

---

## 📋 Pre-Launch Checklist

Before delivering to the client:

- [ ] Replace `schoolConfig.js` details (name, phone, email, address)
- [ ] Replace all placeholder images in `public/images/` with real school photos
- [ ] Replace program information (names, ages, descriptions)
- [ ] Add real testimonials (with permission from parents)
- [ ] Set social media links or hide social icons
- [ ] Update Google Maps embed link to school's actual location
- [ ] Test all pages on mobile (no horizontal overflow)
- [ ] Test WhatsApp & email links work correctly
- [ ] Verify gallery filters work & lightbox opens/closes
- [ ] Check form validation (try submitting empty form, then with data)
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)
- [ ] Update `sitemap.xml` and `robots.txt` with real domain
- [ ] Update Open Graph image for social sharing
- [ ] Run `npm run build` and verify no errors
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Final QA on live site

---

## 📞 Support & Questions

### **If something doesn't work:**

1. **Dev server won't start:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Build fails:**
   ```bash
   npm run build 2>&1 | head -50  # See full error
   ```

3. **Images not showing:**
   - Check paths in `src/data/galleryData.js` match actual files in `public/images/`
   - Ensure all images are in correct subdirectories

4. **WhatsApp link not working:**
   - Verify `whatsappNumber` in config (digits only, no "+")
   - Ensure message text is URL-encoded (handled automatically)

---

## 📝 License & Credits

**Built with:**
- React 19+
- Vite
- Tailwind CSS 4
- React Router 7
- Lucide React (icons)
- React Helmet Async (SEO)

**Design:** Premium Soft Montessori style — warm, welcoming, child-friendly, modern.

---

## 🎉 Ready to Deploy!

Your website is **production-ready**. Edit the config, swap the images, and deploy. No backend, no database, no complicated setup.

**Questions?** Refer to the sections above or check the component code inline — everything is documented.

**Good luck with your client! 🌱**
