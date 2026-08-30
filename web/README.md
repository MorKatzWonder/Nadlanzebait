# Nadlanzebait — web

Mobile-first website for Nadlanzebait Real Estate: services, current and
previous listings (linking out to Yad2), customer testimonials, and contact
details for Arik, the office owner.

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [react-router-dom](https://reactrouter.com/) for routing
- [react-i18next](https://react.i18next.com/) for translations — English
  (US), English (UK), Hebrew (RTL), French, and Russian
- Plain CSS (`src/styles/index.css`), mobile-first with a couple of
  breakpoints, using CSS logical properties so it mirrors automatically for
  Hebrew's right-to-left layout

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run preview  # serve the production build locally
```

## Project structure

```
src/
  components/   Layout (header/nav/footer), LanguageSwitcher
  pages/        Home, Services, Listings, Testimonials, Contact
  data/         Listing/Testimonial types + placeholder data
                (see data/README.md for the planned Google Sheets mapping)
  i18n/         i18next setup + one JSON file per language
  styles/       global mobile-first CSS
```

## Content management (not yet wired up)

Arik needs to add/edit listings and testimonials from his phone without a
developer involved, and without any paid backend. The plan is:

- **Source of truth**: a Google Sheet, edited from the Sheets mobile app,
  published as CSV and fetched by the site directly — free, no server.
- **Translation**: deliberately deferred. Arik types Hebrew only for now;
  `localize()` falls back to the Hebrew text for any language without a
  translation yet, so the site works today with zero translation
  infrastructure. A translation approach (manual columns, a free-tier API,
  etc.) can be decided later without changing anything else.
- **Yad2**: each listing is a manually-maintained card (photo, price,
  details) linking out to its Yad2 page — no scraping/API integration.

None of that is implemented yet — the app currently reads from the
placeholder arrays in `src/data/`, shaped to match the sheet columns so
swapping in a real data source later is a small change, not a rewrite. See
`src/data/README.md` for the column-by-column plan.

## Still open

- Real branding (logo, color palette, photography) — currently placeholders.
- Arik's real contact details (phone/WhatsApp/email are placeholders in
  `src/pages/Contact.tsx`).
- The Google Sheets CSV fetch.
- How/when to add real translations.
- Hosting/deployment target.
