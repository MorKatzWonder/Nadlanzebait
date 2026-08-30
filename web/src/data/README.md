# Content data layer

`listings.ts` and `testimonials.ts` currently hold placeholder data, shaped
exactly like the rows this app will eventually read from a Google Sheet that
Arik edits from his phone — free to use, no backend required.

## Planned Google Sheet columns

**Listings sheet**

| column | maps to |
| --- | --- |
| `id` | `Listing.id` |
| `status` (`current` / `previous`) | `Listing.status` |
| `city` | `Listing.city` |
| `price` | `Listing.price` |
| `rooms` | `Listing.rooms` |
| `size_sqm` | `Listing.sizeSqm` |
| `photo_url` | `Listing.photoUrl` |
| `yad2_url` | `Listing.yad2Url` |
| `title_he` | `Listing.title.he` (source text Arik types) |
| `description_he` | `Listing.description.he` (source text Arik types) |

**Testimonials sheet**: `id`, `author_name`, `quote_he`, same pattern.

Only Hebrew columns for now — see "Translation" below.

## Wiring up the sheet (not yet built)

1. Publish the Sheet (File → Share → Publish to web, as CSV) so it can be
   fetched without any backend or API key.
2. The frontend fetches the published CSV at build time (or on load) and
   maps rows onto `Listing[]` / `Testimonial[]`, replacing the arrays in
   this folder. This alone is enough for a working, zero-cost, no-backend
   site — Arik edits the sheet from his phone and the content updates.

## Translation — deliberately deferred

We're intentionally *not* building a translation pipeline yet, to avoid any
paid API or backend service. For now:

- Arik only has to type Hebrew.
- `localize()` in `localize.ts` falls back to the Hebrew text whenever a
  language's translation is missing, so English/French/Russian visitors see
  Hebrew content rather than a broken UI until real translations exist.

When a translation approach is chosen later (manual columns per language,
a free-tier translation API, browser-based translation, etc.), it plugs in
at the same two places: add columns to the sheet and/or extend `localize()`
— no other code needs to change.
