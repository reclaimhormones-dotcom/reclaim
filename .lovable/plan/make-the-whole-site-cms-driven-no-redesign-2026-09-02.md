# Make the whole site CMS-driven (no redesign)

Goal: every visible word and image on Home, About, Programs, Gallery, Contact, Header and Footer comes from Firestore, with images hosted on Cloudinary. Pixel output stays identical.

## How content gets into Firestore

1. I upload all ~45 existing images from the project to Cloudinary (cloud `pumhgsff`, preset `reclaim`) and record the returned URLs.
2. I build one seed dataset that mirrors today's site exactly — every heading, paragraph, list item, stat, step, FAQ, plus the Cloudinary URLs.
3. Admin gets a **"Publish site content"** action that writes this seed into Firestore in one click (safe to re-run; it only fills documents that are missing).
4. Local image files in `src/assets` are deleted once the Cloudinary URLs are live in the pages.

The seed doubles as the render fallback, so the site never flashes empty while Firestore loads or before seeding.

## Firestore shape

- `settings/site` — phone, email, address, hours, map embed, WhatsApp, socials, consultation price, UPI/QR (extends what exists)
- `navigation/main` — logo image, menu items (label + link + order), header button label/link
- `pages/homepage` — hero slides (mobile + desktop), hero title/subtitle/CTAs, stats, philosophy, about preview, programs preview, testimonials preview, journey steps, gallery preview, footer CTA band
- `pages/aboutpage` — hero, story, mission, vision, doctor profile, certifications, values, timeline, all images
- `pages/programspage`, `pages/gallerypage`, `pages/contactpage` — hero, section headings, supporting copy, FAQs, images
- `pages/footer` — logo, description, quick links, copyright, socials
- `programs` — title, description, image, benefits, category, order, active
- `gallery` — image, caption, category, order
- `testimonials` — name, review, rating, program, photo, order

All reads use real-time `onSnapshot` listeners, so admin edits appear on the live site immediately.

## Admin dashboard modules

Reworked into structured editors, one per document, using a shared set of field controls:

- **Navigation** — logo image card, menu rows (add/edit/reorder/delete), header button
- **Home page** — section-by-section accordion covering every text field, list and image on the page
- **About page** — story, mission, vision, doctor profile, certifications, values, timeline rows, images
- **Programs / Gallery / Testimonials** — existing CRUD extended with benefits, active toggle, reorder, category
- **Contact** — phone, email, address, hours, Google map embed, WhatsApp, socials, page copy, FAQs
- **Footer** — logo, description, quick links, copyright, socials

Every image field renders as an image card: preview, Cloudinary URL, Replace, Delete, Upload — replacing uploads to Cloudinary, stores the new URL, and the site updates instantly.

## Technical notes

- New `src/lib/site-content.ts` holds the typed content schema + seed defaults; `src/hooks/useSiteContent.ts` gains one typed hook per page document.
- New `src/components/admin/fields.tsx` adds reusable Text/Textarea/List/ImageCard/Repeater controls so each admin editor stays short.
- Pages keep their exact JSX; only literals are swapped for `content.*` values with the seed value as fallback.
- Assessment flow, payments, enquiries and admin auth are untouched.

## Sequencing

1. Cloudinary upload + seed dataset + schema types
2. Seeding action in admin, real-time hooks
3. Convert pages one at a time (Home, About, Programs, Gallery, Contact, Header, Footer), verifying each renders identically
4. Build the admin editors for each document
5. Delete `src/assets` images, verify pages in a browser pass
