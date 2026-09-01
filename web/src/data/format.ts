import type { SupportedLanguage } from "../i18n";

export function formatPrice(price: number, language: SupportedLanguage) {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(price);
}
