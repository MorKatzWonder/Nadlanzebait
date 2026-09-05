# Setting up lead capture (manual, one-time)

The valuation form on the Contact section still opens WhatsApp with a
pre-filled message, same as before — but it now also tries to log every
submission as a row in the **"Nadlanzebait — Leads"** Google Sheet, so Arik
has the details even if a visitor closes WhatsApp without hitting send.

This needs one manual setup step that only a human can do in the Google
Sheets/Apps Script UI — nothing here can click through that for you.

## Steps

1. Open the **"Nadlanzebait — Leads"** Google Sheet (shared with
   ariknaim@gmail.com).
2. **Extensions → Apps Script.**
3. Delete the placeholder `myFunction() {}` and paste in the contents of
   `src/data/leads-apps-script.gs.txt` from this repo.
4. **Deploy → New deployment.**
5. Click the gear next to "Select type" → **Web app**.
6. Set:
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
7. **Deploy.** The first time, Google will ask you to authorize the
   script — approve it (it only touches this one sheet).
8. Copy the **Web app URL** it gives you (ends in `/exec`).
9. Paste that URL as `LEADS_WEBHOOK_URL` in `src/data/leadsConfig.ts`,
   then rebuild and redeploy the site (or ask Claude to do it).

Left empty, `LEADS_WEBHOOK_URL` just does nothing — the WhatsApp flow keeps
working exactly as before, nothing breaks.

## If the script needs updating later

Editing the Apps Script code, or the Leads sheet's columns, doesn't need a
new deployment — only changing *who can access it* or *how it's invoked*
does. If you do need to redeploy: **Deploy → Manage deployments → edit
(pencil icon) → New version → Deploy** keeps the same URL, so
`leadsConfig.ts` doesn't need to change.
