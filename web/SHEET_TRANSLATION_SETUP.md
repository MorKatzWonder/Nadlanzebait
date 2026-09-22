# Setting up automatic sheet translation (manual, one-time)

Arik types listings and testimonials in Hebrew only — that's the source of
truth. Without this, anyone viewing the site in English, French, Russian, or
Spanish would see that Hebrew text as-is wherever it came straight from the
sheet (teaser, description, exposure direction, status tag, street,
uncommon neighborhoods, testimonial quotes). This sets up a script that
automatically fills in the other four languages for you, for free, using
Google's own translation service — Arik never has to type anything twice.

This needs manual setup in the Google Sheets/Apps Script UI, once for the
**Listings** sheet and once for the **Testimonials** sheet — nothing here
can click through that for you.

## Steps (repeat once for each of the two sheets)

### 1. Add the translation columns

Add these column headers to the sheet's header row, spelled **exactly** as
shown (the script matches on header text). Order doesn't matter — put them
wherever is convenient, e.g. at the far right so they stay out of the way
of the columns Arik actually edits.

**Listings sheet** — for each of these 6 columns, add 4 new columns named
`<column> (EN)`, `<column> (FR)`, `<column> (RU)`, `<column> (ES)`:

- רחוב ומספר (street)
- שכונה (neighborhood)
- תיאור כיווני אוויר (exposure direction)
- תגית סטטוס (status tag)
- משפט פתיחה (teaser)
- תיאור מלא (full description)

That's 24 new columns. For example, for "משפט פתיחה" you'd add:
`משפט פתיחה (EN)`, `משפט פתיחה (FR)`, `משפט פתיחה (RU)`, `משפט פתיחה (ES)`.

**Testimonials sheet** — same pattern, for these 2 columns (8 new columns
total):

- ציטוט (quote)
- חתימה (attribution)

### 2. Paste in the script

1. **Extensions → Apps Script.**
2. Delete the placeholder `myFunction() {}` and paste in the contents of
   `src/data/sheet-translate-apps-script.gs.txt` from this repo.
3. Near the top of the pasted script, make sure the right `TRANSLATE_COLUMNS`
   line is uncommented for this sheet (Listings vs. Testimonials — the
   file has both, with the one you don't need commented out).
4. Save the script (the floppy-disk icon, or Ctrl/Cmd+S).

### 3. Install the "on edit" trigger

This step is what lets the script call Google's translation service — a
plain, un-installed script can't.

1. In the Apps Script editor, click the clock icon (**Triggers**) in the
   left sidebar.
2. **+ Add Trigger** (bottom right).
3. Set: **Function to run**: `onEditTranslate` · **Event source**: From
   spreadsheet · **Event type**: On edit.
4. **Save.** The first time, Google will ask you to authorize the script —
   approve it (it only translates text within this one sheet).

### 4. Backfill existing rows

Reload the sheet (close and reopen the tab, or refresh). A new **Translate**
menu appears next to Extensions. Click **Translate → Translate all rows**
once to fill in translations for every row already in the sheet. New rows
(or edits to existing ones) translate automatically from here on.

## How it behaves

- Never overwrites a cell you've typed into by hand — if a translated cell
  already has something in it, the script leaves it alone. Correcting an
  awkward machine translation is as simple as typing over it.
- A blank translation cell (not translated yet, or a service hiccup) just
  means that language shows the Hebrew text instead — the same graceful
  fallback used everywhere else on the site. Nothing breaks.
- It's machine translation (Google Translate quality) — good enough for a
  quick, accurate read, occasionally a bit stiff. Feel free to hand-correct
  any specific cell; see above.
- Street addresses get the same treatment for consistency, though a name
  like "Rothschild 42" isn't really "translated" so much as spelled out —
  expect a reasonable transliteration, not a literal translation.

## If you add a new column to translate later

Add the 4 language columns next to it (same `<column> (EN)` naming), and
add its Hebrew header to the `TRANSLATE_COLUMNS` list near the top of the
script. No redeploy needed for a plain code edit — same rule as the Leads
script (see `APPS_SCRIPT_SETUP.md`).
