# Content data layer

`listings.ts` and `testimonials.ts` hold sample data, shaped to match the
rows this app will eventually read from a Google Sheet that Arik edits from
his phone — free to use, no backend required. `content.ts` holds the rest of
the site's copy (hero, stats, steps, about, agent contact details) plus the
lookup dictionaries (property type, neighborhood, condition, characteristic,
point-of-interest labels) used by the listing cards.

## Planned Google Sheet columns

**Listings sheet** — one row per property, columns matching the `Listing`
fields in `types.ts` (`type`, `neighborhood`, `street_he`, `price`, `rooms`,
`size_sqm`, `floor`, `floors`, `condition`, `characteristics`,
`points_of_interest`, `teaser_he`, `description_he`, ...).

**Testimonials sheet**: `id`, `quote_he`, `attribution_he`, same pattern.

Today the sheet only needs a Hebrew column per field — see "Translation"
below for how the other four languages get filled in until the sheet itself
carries per-language columns.

## Wiring up the sheet (not yet built)

1. Publish the Sheet (File → Share → Publish to web, as CSV) so it can be
   fetched without any backend or API key.
2. The frontend fetches the published CSV at build time (or on load) and
   maps rows onto `Listing[]` / `Testimonial[]`, replacing the arrays in
   this folder. This alone is enough for a working, zero-cost, no-backend
   site — Arik edits the sheet from his phone and the content updates.

## Translation

All current content (the sample listings/testimonials here, plus the rest of
the site's copy in `content.ts` and the UI strings in `i18n/locales/`) is
translated by hand into all five languages — no translation API, backend, or
paid service involved. English (US) and English (UK) are two distinct
translations, not the same text twice: `content.ts`'s `L()` helper only
reuses the US wording for GB when nothing actually differs, and writes it
out separately wherever it does (flat vs. apartment, lift vs. elevator,
centre vs. center, neighbourhood vs. neighborhood, etc.).

Content added later that hasn't been translated yet (e.g. once the Google
Sheet is wired up and Arik adds a new listing in Hebrew) will be missing
French/Russian until someone translates it. `localize()` in `localize.ts`
falls back to the Hebrew text in that case, so it degrades gracefully rather
than breaking, but it's still Hebrew shown to a French/Russian visitor, not
a real translation. Closing that gap for *future* content (a translation
API called from a small serverless function, a free-tier service, manual
translation as part of the sheet workflow, etc.) is a separate step from
this pass, which only covers what's on the site today.
