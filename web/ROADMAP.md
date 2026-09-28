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

**Legal / compliance** (hand-written in all six languages; Hebrew governs)
- `/accessibility` — accessibility statement (IS 5568 / WCAG 2.0 AA),
  coordinator Arik Naim, 050-746-4403.
- `/privacy` — privacy policy naming everything that touches visitor data
  (WhatsApp/Meta, Google Sheets + Fonts, GitHub Pages), no cookies/analytics.
- `/terms` — terms of use: listings aren't a binding offer, valuations are a
  broker's estimate (not a certified appraisal), fees only under a signed
  written brokerage order, Israeli law / Tel Aviv courts.
- Content lives in `src/data/legal.ts`; bump `LEGAL_LAST_UPDATED` whenever
  the wording changes.
- Required consent checkbox on the contact form, linking to the privacy
  policy.
- Footer legal bar: links to all three pages, broker license no. 3131081 and
  business reg. no. 037711835.
- Translated 404 page for unknown in-app routes.
- Descriptive photo alt text ("street, neighborhood — photo N of M") on the
  gallery and on listing cards (cards now show the first photo when a
  listing has one), with lazy loading.
- Contrast: `--ink-3` and footer label color darkened to meet WCAG AA
  (they were ~3:1).

**SEO / AEO foundations** (see `SEO.md` for full detail)
- Descriptive title/meta description, canonical URL, Open Graph + Twitter
  Card tags, site-wide `RealEstateAgent` JSON-LD in `index.html`.
- Per-page title/meta (`useDocumentMeta`) and per-listing `RealEstateListing`
  JSON-LD on property detail pages.
- `robots.txt`, `sitemap.xml` (homepage only — see gaps below), `llms.txt`
  for AI crawlers/assistants.
- A scheduled Routine periodically reviews `SEO.md` and the codebase against
  current search/AI-crawler conventions.

## Waiting on you

- **Leads Google Sheet isn't receiving rows — needs the Apps Script setup
  steps.** Confirmed: WhatsApp opens correctly with the pre-filled message
  (the part that actually reaches Arik), but submissions aren't showing up
  in the "Nadlanzebait — Leads" sheet. The site-side request is constructed
  and fired correctly (verified directly), so the fault is on the Apps
  Script side — specifically, you haven't yet walked through
  `APPS_SCRIPT_SETUP.md`'s deployment steps. Likely causes once you do:
  1. The live deployment is running older code that predates the GET/doGet
     fix (a code edit alone doesn't take effect until you deploy a **new
     version** of the existing deployment).
  2. The Web App's access setting isn't "Anyone" (e.g. it's "Anyone with a
     Google account", which silently rejects anonymous site visitors).
  3. The deployment needs re-authorization (Google occasionally requires
     re-consent after security/account changes).
  - **Fastest way to diagnose**: open the Apps Script editor for the sheet →
    **Executions** (left sidebar) → submit the form on the live site → see
    whether a `doGet` execution shows up and whether it errored.
  - **Fastest likely fix**: paste `src/data/leads-apps-script.gs.txt` into
    the Apps Script editor fresh, then **Deploy → Manage deployments → edit
    (pencil) → Version: New version → Deploy**. Same URL, no site change
    needed. Full walkthrough in `APPS_SCRIPT_SETUP.md`.
  - You said you'd do this later — flagging here so it doesn't get lost;
    ask any time and I'll walk through it with you live.

## Not yet implemented / open decisions

### Legal / compliance — still open

The rest of the launch-checklist items are built (see **Implemented**).
What's left:

- **Lawyer review** of the three legal pages before launch.
- **Real testimonials** — `TESTIMONIALS_CSV_URL` is empty, so the site shows
  bundled *sample* reviews. Presenting invented reviews as real is
  misleading advertising — swap in real ones (with the customers'
  permission) before launch. **[needs you]**
- **Real social links** — `SOCIAL_LINKS` in `content.ts` are still `#`
  placeholders. **[needs you]**
- **Photo copyright** — real listing photos must be Arik's own or licensed.
  **[needs you]**
- **Direct-load 404 on GitHub Pages** — the in-app 404 shows for bad links
  clicked *inside* the site, but a mistyped URL loaded directly (or a
  refresh on `/privacy`, `/listings/…`) gets GitHub's own 404 page, since
  Pages doesn't know it's an SPA. Fix: a `public/404.html` that redirects
  into the app.
- **Cookie banner / tracking** — not needed today (no analytics, pixels or
  cookies). Revisit — banner + cookie policy + privacy policy update — if
  Google Analytics or a Meta Pixel is ever added.
- Self-hosting Google Fonts — declined for now; disclosed in the privacy
  policy instead.
- Not applicable: refund and shipping policies (no e-commerce).

### Other open items


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
