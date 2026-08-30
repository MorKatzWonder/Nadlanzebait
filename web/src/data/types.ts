import type { SupportedLanguage } from "../i18n";

/**
 * Mirrors the columns Arik will maintain in the Google Sheet: he text is the
 * source of truth he types on his phone, the other languages are filled in
 * by the translation function (or manually, if he overrides one).
 */
export type LocalizedText = Partial<Record<SupportedLanguage, string>> & {
  he: string;
};

export type ListingStatus = "current" | "previous";

export interface Listing {
  id: string;
  status: ListingStatus;
  city: string;
  price: number;
  currency: "ILS";
  rooms: number;
  sizeSqm: number;
  photoUrl: string;
  yad2Url: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface Testimonial {
  id: string;
  authorName: string;
  quote: LocalizedText;
}
