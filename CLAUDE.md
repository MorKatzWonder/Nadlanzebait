# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nadlanzebait** is a Real-Estate agency website: services offered, current and previous listings (each linking out to the listing's page on Yad2, the Israeli real estate marketplace), customer testimonials, and contact details for Arik, the office owner. The site is mobile-first and ships in English (US), English (UK), Hebrew (RTL), French, and Russian.

## Current State

The website lives in `web/` (Vite + React + TypeScript). See `web/README.md` for the stack, project structure, and commands, and `web/src/data/README.md` for how listings/testimonials are planned to be sourced from a Google Sheet Arik edits from his phone — fetched as a published CSV, no backend or paid service required. Translation into the non-Hebrew languages is deliberately deferred; the app currently reads placeholder data shaped to match the planned sheet columns and falls back to Hebrew wherever a translation is missing.

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

- Translation strings live in `web/src/i18n/locales/*.json`, one file per language; keep all five in sync when adding a key.
- `Listing`/`Testimonial` data (`web/src/data/`) uses `LocalizedText` (a per-language map with `he` required as the fallback) — always go through `localize()` rather than indexing a language directly, since not every language is guaranteed to have a translation yet.
- CSS uses logical properties (`margin-inline`, `text-align: start`, etc.) instead of physical ones (`margin-left`, `text-align: left`) so the layout mirrors automatically for Hebrew's RTL direction — keep doing this for new styles.
