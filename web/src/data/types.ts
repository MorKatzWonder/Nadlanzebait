import type { SupportedLanguage } from "../i18n";

/**
 * Mirrors the columns Arik will maintain in the Google Sheet: he text is the
 * source of truth he types on his phone, the other languages are filled in
 * later (manually, or by a translation step). Missing languages fall back
 * to Hebrew via localize().
 */
export type LocalizedText = Partial<Record<SupportedLanguage, string>> & {
  he: string;
};

export type PropertyType =
  | "apt"
  | "garden"
  | "pent"
  | "duplex"
  | "villa"
  | "cottage"
  | "studio"
  | "roof";

/**
 * A closed set here would break the moment Arik lists a property somewhere
 * not on the list — see `Listing.neighborhood`, which is free text (like
 * `street`), not this type. This enum only names the handful of presets the
 * bundled sample data uses, so those get full 6-language translations via
 * `NEIGHBORHOOD_LABELS` in content.ts.
 */
export type Neighborhood =
  | "center"
  | "florentin"
  | "nevetzedek"
  | "oldnorth"
  | "ramataviv"
  | "kerem";

export type Condition = "new" | "likenew" | "renov" | "kept" | "good" | "needs" | "demo";

export type Characteristic =
  | "renov"
  | "mamad"
  | "balc"
  | "ac"
  | "quiet"
  | "tama"
  | "bright"
  | "high"
  | "entr"
  | "sea"
  | "now"
  | "shabbat";

export type PointOfInterest =
  | "school"
  | "kinder"
  | "park"
  | "beach"
  | "rail"
  | "bus"
  | "super"
  | "cafe"
  | "syn";

export interface Listing {
  id: string;
  type: PropertyType;
  neighborhood: LocalizedText;
  street: LocalizedText;
  price: number;
  rooms: number;
  sizeSqm: number;
  balconySqm: number;
  floor: number;
  floors: number;
  exposureCount: number;
  exposureDesc: LocalizedText;
  parking: number;
  storage: boolean;
  basement: boolean;
  shabbatElevator: boolean;
  accessible: boolean;
  yearBuilt: number;
  condition: Condition;
  status?: LocalizedText;
  /** Photo URLs, in display order. Empty/omitted shows a placeholder. */
  photos?: string[];
  characteristics: Characteristic[];
  pointsOfInterest: PointOfInterest[];
  teaser: LocalizedText;
  description: LocalizedText;
}

export interface Testimonial {
  id: string;
  quote: LocalizedText;
  attribution: LocalizedText;
}
