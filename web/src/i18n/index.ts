import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enUS from "./locales/en-US.json";
import enGB from "./locales/en-GB.json";
import he from "./locales/he.json";
import fr from "./locales/fr.json";
import ru from "./locales/ru.json";

export const SUPPORTED_LANGUAGES = ["en-US", "en-GB", "he", "fr", "ru"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const RTL_LANGUAGES: SupportedLanguage[] = ["he"];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  "en-US": "English (US)",
  "en-GB": "English (UK)",
  he: "עברית",
  fr: "Français",
  ru: "Русский",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      "en-US": { translation: enUS },
      "en-GB": { translation: enGB },
      he: { translation: he },
      fr: { translation: fr },
      ru: { translation: ru },
    },
    fallbackLng: "he",
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export function applyDocumentDirection(language: string) {
  const isRtl = RTL_LANGUAGES.includes(language as SupportedLanguage);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = language;
}

i18n.on("languageChanged", applyDocumentDirection);

export default i18n;
