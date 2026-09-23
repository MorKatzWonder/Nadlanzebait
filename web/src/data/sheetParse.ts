import {
  CHARACTERISTIC_LABELS,
  CONDITION_LABELS,
  NEIGHBORHOOD_LABELS,
  POI_LABELS,
  TYPE_LABELS,
} from "./content";
import type {
  Characteristic,
  Condition,
  Listing,
  LocalizedText,
  Persona,
  PointOfInterest,
  PropertyType,
  Testimonial,
} from "./types";

/**
 * Header names in the Google Sheet, in Hebrew (the language Arik edits in).
 * Must match the header row of the published sheet exactly — see
 * data/README.md for the full column reference.
 */
const LISTING_HEADERS = {
  id: "מזהה",
  type: "סוג נכס",
  neighborhood: "שכונה",
  street: "רחוב ומספר",
  price: "מחיר",
  rooms: "חדרים",
  sizeSqm: "שטח במ״ר",
  balconySqm: "שטח מרפסת במ״ר",
  floor: "קומה",
  floors: "מתוך כמה קומות",
  exposureCount: "מספר כיווני אוויר",
  exposureDesc: "תיאור כיווני אוויר",
  parking: "חניות",
  storage: "מחסן",
  basement: "מרתף",
  shabbatElevator: "מעלית שבת",
  accessible: "גישה לנכים",
  yearBuilt: "שנת בנייה",
  condition: "מצב הנכס",
  status: "תגית סטטוס",
  photos: "קישורי תמונות",
  characteristics: "מאפיינים",
  pointsOfInterest: "נקודות עניין בסביבה",
  teaser: "משפט פתיחה",
  description: "תיאור מלא",
  visible: "להציג באתר",
} as const;

const TESTIMONIAL_HEADERS = {
  id: "מזהה",
  quote: "ציטוט",
  attribution: "חתימה",
  audience: "קהל יעד",
} as const;

const AUDIENCE_MAP: Record<string, Persona> = {
  קונה: "buyer",
  קונים: "buyer",
  מוכר: "seller",
  מוכרים: "seller",
};

/** Minimal RFC4180 CSV parser: handles quoted fields with embedded commas/newlines/escaped quotes. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const s = text.replace(/\r\n/g, "\n");

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (inQuotes) {
      if (char === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  row.push(field);
  if (row.length > 1 || row[0] !== "") rows.push(row);
  return rows;
}

function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows
    .slice(1)
    .filter((r) => r.some((cell) => cell.trim() !== ""))
    .map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        obj[h] = (r[idx] ?? "").trim();
      });
      return obj;
    });
}

function reverseLabelMap<K extends string>(labels: Record<K, LocalizedText>): Map<string, K> {
  const map = new Map<string, K>();
  (Object.keys(labels) as K[]).forEach((key) => {
    map.set(labels[key].he.trim(), key);
  });
  return map;
}

/**
 * Free-text sheet fields (teaser, description, street, etc.) are translated
 * automatically by the "Translate" Apps Script — see
 * listings-translate-apps-script.gs.txt — which fills in "<header> (EN)",
 * "<header> (FR)", "<header> (RU)", "<header> (ES)" columns next to the
 * Hebrew one Arik types in. The English translation is reused for both
 * en-US and en-GB (same convention as content.ts's L() helper — only
 * diverge when British wording actually differs, which machine
 * translation doesn't know to do). A blank translation column (not
 * translated yet, or the script isn't set up) just means that language
 * falls back to Hebrew via localize(), same graceful degradation as
 * everywhere else in the app.
 */
function buildLocalizedText(row: Record<string, string>, baseHeader: string, he: string): LocalizedText {
  const text: LocalizedText = { he };
  const en = row[`${baseHeader} (EN)`]?.trim();
  if (en) {
    text["en-US"] = en;
    text["en-GB"] = en;
  }
  const fr = row[`${baseHeader} (FR)`]?.trim();
  if (fr) text.fr = fr;
  const ru = row[`${baseHeader} (RU)`]?.trim();
  if (ru) text.ru = ru;
  const es = row[`${baseHeader} (ES)`]?.trim();
  if (es) text.es = es;
  return text;
}

const TYPE_MAP = reverseLabelMap(TYPE_LABELS);
const NEIGHBORHOOD_MAP = reverseLabelMap(NEIGHBORHOOD_LABELS);
const CONDITION_MAP = reverseLabelMap(CONDITION_LABELS);
const CHARACTERISTIC_MAP = reverseLabelMap(CHARACTERISTIC_LABELS);
const POI_MAP = reverseLabelMap(POI_LABELS);

function parseBool(v: string | undefined): boolean {
  const s = (v ?? "").trim();
  return s === "כן" || s.toUpperCase() === "TRUE" || s === "1";
}

/** Opt-out rather than opt-in: a blank/missing "Show on site" cell still shows the
 *  listing, so forgetting to fill it in on a new row doesn't hide it by surprise. */
function isHidden(v: string | undefined): boolean {
  const s = (v ?? "").trim();
  return s === "לא" || s.toUpperCase() === "FALSE" || s === "0";
}

function parseNum(v: string | undefined): number {
  const n = Number((v ?? "").replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}

/** Multi-value cells (characteristics, points of interest, photo URLs) are "/"-separated. */
function splitMulti(v: string | undefined): string[] {
  return (v ?? "")
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Unlike type/condition, a neighborhood isn't a closed set — Tel Aviv has far
 * more of them than the handful this app ships translations for. If the text
 * matches one of those presets, use its full 6-language label; otherwise
 * build a translated LocalizedText from the sheet's own "(EN)"/"(FR)"/"(RU)"/
 * "(ES)" columns (see buildLocalizedText), rather than dropping the whole
 * listing over an unrecognized neighborhood name.
 */
function resolveNeighborhood(row: Record<string, string>): LocalizedText | null {
  const text = row[LISTING_HEADERS.neighborhood]?.trim();
  if (!text) return null;
  const preset = NEIGHBORHOOD_MAP.get(text);
  return preset ? NEIGHBORHOOD_LABELS[preset] : buildLocalizedText(row, LISTING_HEADERS.neighborhood, text);
}

function rowToListing(row: Record<string, string>, index: number): Listing | null {
  if (isHidden(row[LISTING_HEADERS.visible])) return null;

  const type = TYPE_MAP.get(row[LISTING_HEADERS.type] ?? "");
  const neighborhood = resolveNeighborhood(row);
  const condition = CONDITION_MAP.get(row[LISTING_HEADERS.condition] ?? "");
  const street = row[LISTING_HEADERS.street];
  if (!type || !neighborhood || !condition || !street) {
    console.warn(
      `Skipping sheet row ${row[LISTING_HEADERS.id] || index} — unrecognized or missing value for one of: type, neighborhood, condition, street.`,
    );
    return null;
  }

  const characteristics = splitMulti(row[LISTING_HEADERS.characteristics])
    .map((label) => CHARACTERISTIC_MAP.get(label))
    .filter((v): v is Characteristic => Boolean(v));
  const pointsOfInterest = splitMulti(row[LISTING_HEADERS.pointsOfInterest])
    .map((label) => POI_MAP.get(label))
    .filter((v): v is PointOfInterest => Boolean(v));
  const photos = splitMulti(row[LISTING_HEADERS.photos]);
  const statusHe = row[LISTING_HEADERS.status]?.trim();
  const id = row[LISTING_HEADERS.id]?.trim() || `sheet-${index}`;

  const listing: Listing = {
    id,
    type: type as PropertyType,
    neighborhood,
    street: buildLocalizedText(row, LISTING_HEADERS.street, street),
    price: parseNum(row[LISTING_HEADERS.price]),
    rooms: parseNum(row[LISTING_HEADERS.rooms]),
    sizeSqm: parseNum(row[LISTING_HEADERS.sizeSqm]),
    balconySqm: parseNum(row[LISTING_HEADERS.balconySqm]),
    floor: parseNum(row[LISTING_HEADERS.floor]),
    floors: parseNum(row[LISTING_HEADERS.floors]),
    exposureCount: parseNum(row[LISTING_HEADERS.exposureCount]),
    exposureDesc: buildLocalizedText(row, LISTING_HEADERS.exposureDesc, row[LISTING_HEADERS.exposureDesc] ?? ""),
    parking: parseNum(row[LISTING_HEADERS.parking]),
    storage: parseBool(row[LISTING_HEADERS.storage]),
    basement: parseBool(row[LISTING_HEADERS.basement]),
    shabbatElevator: parseBool(row[LISTING_HEADERS.shabbatElevator]),
    accessible: parseBool(row[LISTING_HEADERS.accessible]),
    yearBuilt: parseNum(row[LISTING_HEADERS.yearBuilt]),
    condition: condition as Condition,
    status: statusHe ? buildLocalizedText(row, LISTING_HEADERS.status, statusHe) : undefined,
    photos: photos.length > 0 ? photos : undefined,
    characteristics,
    pointsOfInterest,
    teaser: buildLocalizedText(row, LISTING_HEADERS.teaser, row[LISTING_HEADERS.teaser] ?? ""),
    description: buildLocalizedText(row, LISTING_HEADERS.description, row[LISTING_HEADERS.description] ?? ""),
  };
  return listing;
}

function rowToTestimonial(row: Record<string, string>, index: number): Testimonial | null {
  const quote = row[TESTIMONIAL_HEADERS.quote]?.trim();
  const attribution = row[TESTIMONIAL_HEADERS.attribution]?.trim();
  if (!quote || !attribution) return null;
  const id = row[TESTIMONIAL_HEADERS.id]?.trim() || `sheet-t${index}`;
  const audience = AUDIENCE_MAP[row[TESTIMONIAL_HEADERS.audience]?.trim() ?? ""];
  return {
    id,
    quote: buildLocalizedText(row, TESTIMONIAL_HEADERS.quote, quote),
    attribution: buildLocalizedText(row, TESTIMONIAL_HEADERS.attribution, attribution),
    audience,
  };
}

export function parseListingsCsv(csv: string): Listing[] {
  return rowsToObjects(parseCsv(csv))
    .map((row, i) => rowToListing(row, i))
    .filter((l): l is Listing => l !== null);
}

export function parseTestimonialsCsv(csv: string): Testimonial[] {
  return rowsToObjects(parseCsv(csv))
    .map((row, i) => rowToTestimonial(row, i))
    .filter((t): t is Testimonial => t !== null);
}
