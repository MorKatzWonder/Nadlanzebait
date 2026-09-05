# Roadmap

What's live on [nadlanzebait](https://morkatzwonder.github.io/Nadlanzebait/)
today, what's known-broken, and what's still open. Updated as part of every
feature change going forward — not just when asked.

## Implemented

**Core site**
- Mobile-first React/TypeScript SPA (Vite), single-page Home with
  scroll-anchored sections (hero, steps, properties, testimonials, contact),
  plus a standalone property detail page per listing.
- Six languages — English (US), English (UK), Hebrew (RTL), French, Russian,
  Spanish — via i18next, with a globe language switcher. Hebrew is the
  i18next fallback language and the source of truth for content; missing
  translations on new content fall back to Hebrew rather than breaking.
- Logical CSS properties throughout so layout mirrors automatically for
  Hebrew's RTL direction.
- Hamburger nav at all screen sizes; footer with Instagram/Facebook/TikTok
  social icons.
- 3D hover effect on property/testimonial cards; mobile carousels with dot
  indicators (RTL-correct) for Properties and Testimonials.

**Content data layer**
- Listings and testimonials are sourced from published Google Sheet CSVs
  (`src/data/sheetConfig.ts`, `sheetParse.ts`, `useSheetData.ts`), edited by
  Arik from his phone — free, no backend. Falls back to bundled sample data
  (`listings.ts`, `testimonials.ts`) on any fetch/parse failure, with a
  loading state so visitors never see a flash of stale sample data.
- Listings: free-text neighborhood (not a closed enum), an opt-out
  "להציג באתר" (Show on site) column, multi-value cells for characteristics/
  points-of-interest/photos.
- Testimonials: opt-out "קהל יעד" (target audience) column — tag a quote
  buyer- or seller-only, or leave blank to show it to everyone.
- Property detail pages: photo gallery, full spec table, WhatsApp deep link
  pre-filled per listing.

**Buyer/Seller personas**
- The two hero CTAs ("Free valuation" / "Browse properties") double as a
  persona picker: clicking one filters the page for that persona (the
  seller-only "three steps" section, or the properties grid) and filters
  testimonials to that audience. With neither clicked, the page shows
  everything, unfiltered — this is the default, not a special case.
- The contact/valuation form relabels itself for a Buyer (heading, "area of
  interest" field, WhatsApp message wording) vs. the default Seller-oriented
  valuation request, across all six languages.

**Steps section**
- "Three steps, no surprises" is an icon accordion (`StepsAccordion.tsx`):
  each step shows only an icon + short title by default; clicking expands it
  in place to reveal the full explanation. Icons match the site's
  stroke-based line-icon system and reflect open/closed state (neon fill +
  rotated chevron when expanded).

**Contact & lead capture**
- Client-side-validated valuation/inquiry form opens a pre-filled WhatsApp
  chat — this is the channel that actually reaches Arik, and nothing else
  blocks or depends on it.
- Best-effort, fire-and-forget logging of each submission to a
  "Nadlanzebait — Leads" Google Sheet via a free Apps Script Web App
  (`src/data/leadsConfig.ts`, `src/data/leads-apps-script.gs.txt`,
  `APPS_SCRIPT_SETUP.md`) as a fallback in case a visitor closes WhatsApp
  without hitting Send. See **Known issues** below — this part is currently
  broken.

**SEO / AEO foundations** (see `SEO.md` for full detail)
- Descriptive title/meta description, canonical URL, Open Graph + Twitter
  Card tags, site-wide `RealEstateAgent` JSON-LD in `index.html`.
- Per-page title/meta (`useDocumentMeta`) and per-listing `RealEstateListing`
  JSON-LD on property detail pages.
- `robots.txt`, `sitemap.xml` (homepage only — see gaps below), `llms.txt`
  for AI crawlers/assistants.
- A scheduled Routine periodically reviews `SEO.md` and the codebase against
  current search/AI-crawler conventions.

## Known issues

- **Leads Google Sheet isn't receiving rows.** Confirmed: WhatsApp opens
  correctly with the pre-filled message (the part that actually reaches
  Arik), but submissions aren't showing up in the "Nadlanzebait — Leads"
  sheet. The site-side request is constructed and fired correctly (verified
  directly), so the fault is on the Apps Script side. Likely causes, in
  order of likelihood:
  1. The live deployment is running older code that predates the GET/doGet
     fix (a code edit alone doesn't take effect until you deploy a **new
     version** of the existing deployment).
  2. The Web App's access setting isn't "Anyone" (e.g. it's "Anyone with a
     Google account", which silently rejects anonymous site visitors).
  3. The deployment needs re-authorization (Google occasionally requires
     re-consent after security/account changes).
  - **Fastest way to diagnose**: open the Apps Script editor for the sheet →
    **Executions** (left sidebar) → submit the form on the live site → see
    whether a `doGet` execution shows up and whether it errored. That tells
    us which of the above it is.
  - **Fastest likely fix**: paste `src/data/leads-apps-script.gs.txt` into
    the Apps Script editor fresh (to guarantee it matches), then
    **Deploy → Manage deployments → edit (pencil) → Version: New version →
    Deploy**. This keeps the same URL, so `leadsConfig.ts` doesn't change.

## Not yet implemented / open decisions

- **Multi-platform listing content generator** — turning a sheet row into
  ready-to-post Facebook/Instagram/Twitter/Yad2 copy. Deferred at your
  request until domain + leads were settled; domain is done, leads is the
  item above.
- **Sheet content auto-translation** — Google Apps Script has a free
  built-in `LanguageApp.translate()` that could auto-translate a new Hebrew
  row into the other five languages when Arik adds a listing. Proposed, not
  built — needs a decision on whether machine-translated listing copy is
  acceptable quality for a live listing (vs. today's manual-translation-only
  policy for hand-authored site copy).
- **Full sitemap** — `sitemap.xml` currently only lists the homepage;
  listing IDs come from a live sheet, so enumerating them needs a build-time
  fetch step.
- **hreflang / per-language URLs** — the site is one URL with a client-side
  language switch, so there's no way to tell search engines the other five
  translations exist. Needs language-prefixed routing to fix properly.
- **Prerendering** — this is a client-rendered SPA; a crawler that doesn't
  execute JavaScript sees an empty shell beyond what's in `index.html`.
  Fixing this needs a prerender step (SSG plugin or a Playwright-based
  script) at build/deploy time.
- **Open Graph image** — `og:title`/`og:description` are set; no `og:image`
  yet since there's no real listing photography (placeholders only).
- **Real mobile device testing** — verified so far via emulated Playwright
  viewports only, not actual phones.
- **Custom domain** — `nadlanzebait.com` was connected then fully reverted
  at your request; the site runs on GitHub Pages' own URL. Can be
  reconnected if/when wanted.
