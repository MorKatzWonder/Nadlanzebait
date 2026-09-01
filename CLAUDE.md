# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nadlanzebait** ("Home Real Estate" / נדל״ן זה בית) is Arik Naim's Tel Aviv real-estate agency website: a valuation-focused pitch for sellers, on-site property listings with full detail (no external marketplace links), customer testimonials, and a WhatsApp-first contact/valuation-request flow. The site is mobile-first and ships in English (US), English (UK), Hebrew (RTL), French, and Russian.

## Current State

The website lives in `web/` (Vite + React + TypeScript). See `web/README.md` for the stack, project structure, and commands, and `web/src/data/README.md` for how listings/testimonials are planned to be sourced from a Google Sheet Arik edits from his phone — fetched as a published CSV, no backend or paid service required. All five languages (English US/UK, Hebrew, French, Russian) are fully translated by hand for the current content — no translation API, backend, or paid service involved. New content added later (e.g. once the Google Sheet is wired up) won't have French/Russian yet: the i18next fallback language is Hebrew, and `localize()` falls back to Hebrew for any per-item content missing a translation, so the site degrades gracefully rather than showing English.

The visual design (colors, typography, component styles, page copy) was handed off from a Claude Design project and ported into the React app — see `web/src/data/content.ts` for the design's copy/labels and `web/src/styles/index.css` for the ported CSS.

## Commands

Run from `web/`:

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check (tsc -b) + production build
npm run preview  # serve the production build locally
npm run lint      # oxlint
```

## Conventions

- Translation strings live in `web/src/i18n/locales/*.json`, one file per language; all five should stay complete for existing keys. When adding a *new* key, translate it into all five if you can — if not, it's fine to leave French/Russian unset since the i18next `fallbackLng` is `he`.
- `Listing`/`Testimonial`/site-copy data (`web/src/data/`) uses `LocalizedText` (a per-language map with `he` required as the fallback) — always go through `localize()` rather than indexing a language directly. `content.ts`'s `L()` helper takes `he`/`enUS`/`fr`/`ru` (required) plus an optional `enGB` (defaults to `enUS` — only pass it when British wording actually differs, e.g. flat/lift/centre).
- CSS uses logical properties (`margin-inline`, `text-align: start`, etc.) instead of physical ones (`margin-left`, `text-align: left`) so the layout mirrors automatically for Hebrew's RTL direction — keep doing this for new styles.
- No backend: the Contact page's valuation form validates client-side and opens a pre-filled WhatsApp link rather than submitting anywhere.
