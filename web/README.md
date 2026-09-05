# Nadlanzebait — web

Mobile-first, largely single-page website for **Home Real Estate** (נדל״ן זה
בית) — Arik Naim's Tel Aviv real-estate agency: a valuation-focused selling
pitch, on-site property listings with full detail, customer testimonials,
and contact details, including a WhatsApp-first valuation request form. Home
holds the steps/properties/testimonials/contact sections, reached by
scrolling or via `/#properties`-style nav links; each property also has its
own permalink page (`/listings/:id`) that opens in a new tab.

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [react-router-dom](https://reactrouter.com/) for routing
- [react-i18next](https://react.i18next.com/) for translations — English
  (US), English (UK), Hebrew (RTL), French, Russian, and Spanish (fallback
  language: Hebrew, since that's the language Arik actually writes in)
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
                PropertiesSection, ContactSection (both rendered on Home; also
                what /#properties and /#contact nav links scroll to via
                ScrollToHash), PropertyCard, Logo, GlobeIcon, SocialIcons
  pages/        Home (hero, steps, properties, testimonials, contact — one page),
                PropertyDetail (opens in a new tab from a listing card)
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
- **Translation**: all current content is translated by hand into all 5
  languages (no translation API/backend needed for what's on the site
  today). Once the sheet is wired up, Arik will type Hebrew and any new
  listing will be missing French/Russian until translated — `localize()`
  falls back to the Hebrew text in that case (the i18next fallback
  language is Hebrew too), so it degrades gracefully rather than breaking.
  A translation approach for that ongoing gap (manual columns, a free-tier
  API called from a small serverless function, etc.) is a separate,
  not-yet-built step — see `src/data/README.md`.

None of that is implemented yet — the app currently reads from the sample
arrays in `src/data/`, shaped to match the planned sheet columns so swapping
in a real data source later is a small change, not a rewrite. See
`src/data/README.md` for the column-by-column plan.

## Contact form

There's no backend, so the valuation form in the Contact section validates
the input client-side and then opens a pre-filled WhatsApp message to
Arik's number — it doesn't email or store anything.

## Still open

- Real branding assets (the logo mark is currently an inline SVG house icon
  from the design handoff — swap for Arik's actual logo when he has one).
- Real photography (listing cards currently show a placeholder box instead
  of a photo).
- Real Instagram/Facebook/TikTok URLs — `SOCIAL_LINKS` in `data/content.ts`
  is currently `"#"` for all three, swap in the real profile URLs once
  those accounts exist.
- The Google Sheets CSV fetch.
- A translation mechanism for *new* content added after the sheet is wired
  up (today's content is already translated by hand).
- Hosting/deployment target.
