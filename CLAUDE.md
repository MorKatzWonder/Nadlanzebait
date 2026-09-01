# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nadlanzebait** ("Home Real Estate" / נדל״ן זה בית) is Arik Naim's Tel Aviv real-estate agency website: a valuation-focused pitch for sellers, on-site property listings with full detail (no external marketplace links), customer testimonials, and a WhatsApp-first contact/valuation-request flow. The site is mobile-first and ships in English (US), English (UK), Hebrew (RTL), French, and Russian.

## Current State

The website lives in `web/` (Vite + React + TypeScript). See `web/README.md` for the stack, project structure, and commands, and `web/src/data/README.md` for how listings/testimonials are planned to be sourced from a Google Sheet Arik edits from his phone — fetched as a published CSV, no backend or paid service required. Translation into French/Russian is deliberately deferred: the i18next fallback language is Hebrew (not English), and `localize()` falls back to Hebrew for any per-item content missing a translation.

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

- Translation strings live in `web/src/i18n/locales/*.json`, one file per language. English (US/GB) and Hebrew should stay complete; French/Russian only need keys that differ from the Hebrew fallback (the i18next `fallbackLng` is `he`), so it's fine to leave a French/Russian key unset when there's no real translation yet.
- `Listing`/`Testimonial`/site-copy data (`web/src/data/`) uses `LocalizedText` (a per-language map with `he` required as the fallback) — always go through `localize()` rather than indexing a language directly, since not every language is guaranteed to have a translation yet.
- CSS uses logical properties (`margin-inline`, `text-align: start`, etc.) instead of physical ones (`margin-left`, `text-align: left`) so the layout mirrors automatically for Hebrew's RTL direction — keep doing this for new styles.
- No backend: the Contact page's valuation form validates client-side and opens a pre-filled WhatsApp link rather than submitting anywhere.
