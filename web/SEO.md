# SEO / AI discoverability

Goal: someone searching for a Tel Aviv real-estate agent — on Google, or by
asking an AI assistant/AI search product — should be able to find and cite
this site.

## Implemented

- `index.html`: descriptive `<title>`, meta description, canonical URL,
  Open Graph + Twitter Card tags, and a site-wide `RealEstateAgent`
  JSON-LD block (name, phone, address).
- `public/robots.txt` and `public/sitemap.xml` (currently just the
  homepage — see limitations below).
- `public/llms.txt` — a plain-language summary of the site for AI
  crawlers/assistants that check for it (an emerging convention, see
  llmstxt.org).
- Per-page `<title>`/meta description, updated at runtime
  (`useDocumentMeta`, `src/hooks/useDocumentMeta.ts`) so the Home page and
  each property detail page carry their own values instead of sharing
  `index.html`'s defaults — used by `Home.tsx` and `PropertyDetail.tsx`.
- Per-listing `RealEstateListing` JSON-LD (price, rooms, size, address),
  injected the same way on the property detail page.

## Known limitations

- **No server-side rendering / prerendering.** This is a client-rendered
  React SPA on GitHub Pages (static file hosting, no server). A crawler
  that doesn't execute JavaScript sees an empty shell for everything
  except what's in `index.html` itself (the site-wide meta tags and
  JSON-LD above). Most major crawlers (Googlebot, and increasingly AI
  crawlers) do execute JavaScript, but not all do, and not reliably.
  Fixing this properly means prerendering each route to static HTML at
  build time (e.g. a Vite SSG plugin, or a small Playwright-based
  prerender script run during the deploy step) — a real project, not a
  quick add.
- **No per-language URLs, so no `hreflang`.** The site is one URL with a
  client-side language switch (`localStorage` + `i18next`), not
  `/en/`, `/fr/`, `/he/` routes. Search engines mostly index whichever
  language happens to render for the crawler, and there's no way to tell
  them the other four translations exist at other URLs, because they
  don't have other URLs. Solving this needs language-prefixed routing.
- **`sitemap.xml` only lists the homepage.** Listing IDs now come from a
  live Google Sheet Arik edits from his phone (see `src/data/README.md`),
  so a static sitemap can't enumerate them without a build step that
  fetches the sheet — and this environment's egress can't always reach
  `docs.google.com` to test that reliably. Worth revisiting once
  prerendering is in place anyway (a prerender step would need to fetch
  the sheet regardless).
- **No Open Graph / social share image.** `og:title` and `og:description`
  are set; there's no `og:image` yet because there's no real photography
  to point it at (listings use a placeholder, per
  `src/data/listings.ts`).

## Recurring maintenance

A scheduled Routine (see the repo's Claude Code session history) reviews
this file and the codebase periodically, checks current search engine and
AI-crawler conventions, and makes safe, incremental improvements against
the roadmap above.
