# Little Roots Preschool

Responsive preschool website (React 19, Vite, Tailwind CSS 4, React Router 7) with an optional Appwrite backend
(enquiries, gallery, announcements, protected admin area).

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run lint
```

The public site works with **no configuration**. To switch on the backend, follow `APPWRITE_SETUP.md`, then fill `.env`
(copy `.env.example`). Deploy with `DEPLOYMENT.md`.

## Status

| Feature | Code | Needs Appwrite setup? |
|---|---|---|
| Public pages (Home, About, Programs, Gallery, Contact, Privacy, 404) | Done | No |
| Enquiry form saving to Appwrite (+ consent, honeypot, WhatsApp/email follow-up) | Done | **Yes** — otherwise WhatsApp/email hand-off only |
| Admin sign-in, MFA (authenticator app), protected routes, logout | Done | **Yes** |
| Admin: overview, enquiries (search, filter, detail, status, notes, delete) | Done | **Yes** |
| Admin: gallery upload / edit / reorder / hide / delete | Done | **Yes** |
| Admin: announcements | Done | **Yes** |
| Public gallery + announcement bar read from Appwrite (fallback to static content) | Done | **Yes** |

"Done" means written and tested against a **mocked** Appwrite API in a browser. It has **not** been run against a
real Appwrite project yet — do the acceptance tests in `APPWRITE_SETUP.md` section 7 after setup.

## What to edit where

| Change | File |
|---|---|
| School name, phone, WhatsApp, email, address, hours, social links, maps link | `src/config/schoolConfig.js` |
| Programs, testimonials, About text, SEO defaults | `src/config/schoolConfig.js` |
| FAQ questions | `src/components/contact/Faq.jsx` |
| Placeholder gallery + categories | `src/data/galleryData.js` (live photos are managed in `/admin/gallery`) |
| Announcement text | `/admin/announcements` (fallback text in `schoolConfig.js`) |
| Privacy policy text | `src/pages/Privacy.jsx` (template — review before launch) |
| Page titles / descriptions | `src/data/seoData.js` |
| Colours / fonts | `src/index.css` (`@theme`) |
| Appwrite IDs | `.env` / Vercel environment variables — never in code |

## Structure

```
src/
  lib/          appwriteConfig.js (env), appwrite.js (client), enquiries.js, gallery.js, announcements.js, errors.js
  auth/         AuthProvider, RequireAdmin, useAuth
  hooks/        useGalleryItems, useAnnouncement, + existing UI hooks
  pages/        public pages + pages/admin/*
  components/   layout, ui, home, about, programs, gallery, contact, admin
```

Security notes: only public identifiers are in the frontend; permissions in Appwrite (label `admin`) are the real
access control; the `/admin` routes are `noindex` and disallowed in `robots.txt`.
