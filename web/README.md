# Nadlanzebait — web

Mobile-first website for **Home Real Estate** (נדל״ן זה בית) — Arik Naim's
Tel Aviv real-estate agency: a valuation-focused selling pitch, on-site
property listings with full detail, customer testimonials, and contact
details, including a WhatsApp-first valuation request form.

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [react-router-dom](https://reactrouter.com/) for routing
- [react-i18next](https://react.i18next.com/) for translations — English
  (US), English (UK), Hebrew (RTL), French, and Russian (fallback language:
  Hebrew, since that's the language Arik actually writes in)
- Plain CSS (`src/styles/index.css`), mobile-first with a couple of
  breakpoints, using CSS logical properties so it mirrors automatically for
  Hebrew's right-to-left layout. Design system (colors, type, components)
  ported from a Claude Design handoff — see `src/data/content.ts` for the
  design tokens' matching copy/labels.

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
  components/   Layout (header/hamburger nav/footer), LanguageSwitcher (globe dropdown),
                PropertyCard, Logo, GlobeIcon, ScrollToHash
  pages/        Home (includes the testimonials section, linked via /#testimonials),
                Listings, PropertyDetail (opens in a new tab from a listing card), Contact
  data/         Listing/Testimonial types, sample data, and site copy (content.ts)
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
  translation yet (and the i18next fallback language is Hebrew too), so the
  site works today with zero translation infrastructure. A translation
  approach (manual columns, a free-tier API, etc.) can be decided later
  without changing anything else.

None of that is implemented yet — the app currently reads from the sample
arrays in `src/data/`, shaped to match the planned sheet columns so swapping
in a real data source later is a small change, not a rewrite. See
`src/data/README.md` for the column-by-column plan.

## Contact form

There's no backend, so the valuation form on the Contact page validates the
input client-side and then opens a pre-filled WhatsApp message to Arik's
number — it doesn't email or store anything.

## Still open

- Real branding assets (the logo mark is currently an inline SVG house icon
  from the design handoff — swap for Arik's actual logo when he has one).
- Real photography (listing cards currently show a placeholder box instead
  of a photo).
- The Google Sheets CSV fetch.
- How/when to add real French/Russian translations.
- Hosting/deployment target.
