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
} as const;

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
 * matches one of those presets, use its full 5-language label; otherwise
 * keep the raw Hebrew as-is (same graceful fallback `localize()` already
 * does everywhere else for untranslated content), rather than dropping the
 * whole listing over an unrecognized neighborhood name.
 */
function resolveNeighborhood(raw: string | undefined): LocalizedText | null {
  const text = (raw ?? "").trim();
  if (!text) return null;
  const preset = NEIGHBORHOOD_MAP.get(text);
  return preset ? NEIGHBORHOOD_LABELS[preset] : { he: text };
}

function rowToListing(row: Record<string, string>, index: number): Listing | null {
  if (isHidden(row[LISTING_HEADERS.visible])) return null;

  const type = TYPE_MAP.get(row[LISTING_HEADERS.type] ?? "");
  const neighborhood = resolveNeighborhood(row[LISTING_HEADERS.neighborhood]);
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
    street: { he: street },
    price: parseNum(row[LISTING_HEADERS.price]),
    rooms: parseNum(row[LISTING_HEADERS.rooms]),
    sizeSqm: parseNum(row[LISTING_HEADERS.sizeSqm]),
    balconySqm: parseNum(row[LISTING_HEADERS.balconySqm]),
    floor: parseNum(row[LISTING_HEADERS.floor]),
    floors: parseNum(row[LISTING_HEADERS.floors]),
    exposureCount: parseNum(row[LISTING_HEADERS.exposureCount]),
    exposureDesc: { he: row[LISTING_HEADERS.exposureDesc] ?? "" },
    parking: parseNum(row[LISTING_HEADERS.parking]),
    storage: parseBool(row[LISTING_HEADERS.storage]),
    basement: parseBool(row[LISTING_HEADERS.basement]),
    shabbatElevator: parseBool(row[LISTING_HEADERS.shabbatElevator]),
    accessible: parseBool(row[LISTING_HEADERS.accessible]),
    yearBuilt: parseNum(row[LISTING_HEADERS.yearBuilt]),
    condition: condition as Condition,
    status: statusHe ? { he: statusHe } : undefined,
    photos: photos.length > 0 ? photos : undefined,
    characteristics,
    pointsOfInterest,
    teaser: { he: row[LISTING_HEADERS.teaser] ?? "" },
    description: { he: row[LISTING_HEADERS.description] ?? "" },
  };
  return listing;
}

function rowToTestimonial(row: Record<string, string>, index: number): Testimonial | null {
  const quote = row[TESTIMONIAL_HEADERS.quote]?.trim();
  const attribution = row[TESTIMONIAL_HEADERS.attribution]?.trim();
  if (!quote || !attribution) return null;
  const id = row[TESTIMONIAL_HEADERS.id]?.trim() || `sheet-t${index}`;
  return { id, quote: { he: quote }, attribution: { he: attribution } };
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
