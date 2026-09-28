# Roadmap

What's live on [www.nadlanzebait.com](https://www.nadlanzebait.com/)
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
- Deep links (a property page opened in a new tab, a refresh on `/privacy`)
  load correctly. Root cause of the blank property pages: GitHub Pages serves
  `404.html` for any path without its own file, and that was a stale
  hand-copied file pointing at a deleted JS bundle. Permanent fix, in layers:
  - `npm run build` copies `index.html` to `404.html` every time.
  - Automatic deploys (`.github/workflows/deploy.yml`): every push to `main`
    that touches `web/` builds, lints and publishes to `gh-pages` — no more
    hand deploys. It refuses to publish if `404.html` doesn't match
    `index.html` or references a missing bundle.
  - Old bundles in `assets/` are kept on deploy, so a browser holding a
    cached older page still finds its script.
  - An error boundary around every page shows a translated "something went
    wrong — reload" message instead of a blank screen if a page ever
    crashes.
- PNG favicons (32/192), an Apple touch icon and `theme-color`, alongside the
  SVG favicon — Safari and home-screen shortcuts ignore SVG favicons.

**Custom domain**
- The site is reachable at `www.nadlanzebait.com` (and `nadlanzebait.com`,
  which GitHub redirects to `www`), not just the `github.io` URL. DNS at the
  registrar (apex A records to GitHub Pages' four anycast IPs, `www` CNAME
  to `morkatzwonder.github.io`) is confirmed correct.
- **Why it failed the first time**: the DNS records were correct in the
  registrar's panel, but hadn't finished propagating yet when it was tested
  — Squarespace's own "domain not connected" placeholder was still showing
  from the old resolver cache, which looked identical to a real failure.
  It wasn't a code bug: `vite.config.ts`'s `base` and the `CNAME` file were
  already set correctly in that first attempt. By the time this was
  reconnected, DNS had long since settled, and it worked immediately.
- Every hardcoded absolute URL (canonical, Open Graph, JSON-LD, sitemap,
  robots.txt, llms.txt, per-listing structured data) points at
  `https://www.nadlanzebait.com/`.

**Automatic sheet-content translation**
- Arik only ever types Hebrew in the Listings/Testimonials sheets. A free
  Apps Script (`src/data/sheet-translate-apps-script.gs.txt`) now watches
  for edits and auto-fills English/French/Russian/Spanish versions of
  every free-text field — teaser, description, exposure direction, status
  tag, street, an uncommon neighborhood name, testimonial quotes — using
  Google's free translation service. `sheetParse.ts` reads those columns
  via `buildLocalizedText()`. Machine translation, not human; Arik can
  overwrite any specific cell by hand and the script won't touch it again.
  A blank/untranslated cell still falls back to Hebrew, same graceful
  degradation as before this existed — nothing on the site depends on this
  actually being set up.
- Verified end-to-end with a mocked sheet response: translated columns
  render correctly per-language on listing cards and in the address line;
  a deliberately blank translation cell correctly falls back to Hebrew.
- **Needs setup** — see **Waiting on you** below.

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

- **Leads Google Sheet is still only getting a timestamp, not the rest of
  the fields — points at the deployment's "Execute as" setting.** WhatsApp
  itself works correctly (pre-filled message opens fine — the part that
  actually reaches Arik). Diagnosed this round: hitting the deployed `/exec`
  URL directly in a browser (bypassing the site entirely) reproduces the
  exact same symptom — a row with only `new Date()`'s value, everything
  else blank — which rules out anything on the site side (the request URL
  and parameters were independently confirmed correct via network capture).
  That leaves the Apps Script deployment itself: when **Execute as** is set
  to "User accessing the web app" instead of "Me", `doGet` still runs for
  an anonymous visitor (hence the date), but `e.parameter` silently comes
  back empty.
  - **Fix**: Apps Script editor → **Deploy → Manage deployments** → edit
    (pencil) → **Execute as: Me** → **Version: New version** → Deploy. Same
    URL, no site change needed.
  - You've since pointed `leadsConfig.ts` at a new deployment URL directly
    (via two direct commits, to `main` and to this PR's branch — merged
    here without conflict). Still needs testing against that fix once
    "Execute as" is confirmed set to "Me" on that deployment.

- **Sheet-content translation needs the Apps Script + sheet columns set
  up.** The code and the script are ready, but this needs the same kind of
  manual, human-only steps as the Leads webhook: add ~24 new columns to
  the Listings sheet (8 to Testimonials), paste the script into each
  sheet's Apps Script editor, and install an "on edit" trigger. Full
  walkthrough in `SHEET_TRANSLATION_SETUP.md`. Until this is done, sheet
  content keeps showing Hebrew for non-Hebrew visitors (the pre-existing
  behavior) — nothing breaks either way, it just isn't translated yet.

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
