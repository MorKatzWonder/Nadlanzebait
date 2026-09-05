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

## Wiring up the sheet

The fetch/parse side is built (`sheetParse.ts`, `useSheetData.ts`). Two
Google Sheets already exist with the right columns and six/three example
rows to copy — "Nadlanzebait — Listings" and "Nadlanzebait — Testimonials"
— seeded from the sample data in this folder. What's left is two manual
steps only a human can do in the Google Sheets UI:

1. **Publish each sheet as CSV**: open it → File → Share → Publish to web
   → choose the sheet/tab → CSV → Publish. Copy the link it gives you.
2. **Paste the two links into `sheetConfig.ts`** as `LISTINGS_CSV_URL` and
   `TESTIMONIALS_CSV_URL`.

That's it — `useListings()` / `useTestimonials()` (used by
`PropertiesSection`, `Home`, `PropertyDetail`) fetch the published CSV on
page load, parse it, and use it in place of the bundled sample arrays. If
the URL is left empty, or the fetch/parse fails for any reason (sheet not
published yet, network hiccup, a row with an unrecognized value), the site
silently falls back to the sample data — nothing ever breaks.

### Column reference (Listings sheet)

Headers are in Hebrew (the language Arik edits in) and must match exactly
— see `LISTING_HEADERS` in `sheetParse.ts` for the authoritative list.
Most are self-explanatory; a few notes:

- **מזהה** (id): free text, used in the listing's URL. Leave blank and one
  is generated automatically.
- **סוג נכס** / **שכונה** / **מצב הנכס**: must exactly match one of the
  Hebrew labels already shown on the live site's filters (e.g. "דירה",
  "דירת גן", "פלורנטין", "משופצת") — see `TYPE_LABELS` / `NEIGHBORHOOD_LABELS`
  / `CONDITION_LABELS` in `content.ts` for the full list. An unrecognized
  value causes that row to be skipped.
- **מחסן** / **מרתף** / **מעלית שבת** / **גישה לנכים**: "כן" or "לא".
  Column reference (Testimonials sheet): **מזהה** / **ציטוט** / **חתימה**.
- **קישורי תמונות** / **מאפיינים** / **נקודות עניין בסביבה**: multiple
  values separated by " / " (e.g. "משופצת / ממ״ד / מרפסת שמש"). The
  characteristic/point-of-interest labels must match `CHARACTERISTIC_LABELS`
  / `POI_LABELS` in `content.ts`, same rule as above.

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
