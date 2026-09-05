import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enUS from "./locales/en-US.json";
import enGB from "./locales/en-GB.json";
import he from "./locales/he.json";
import fr from "./locales/fr.json";
import ru from "./locales/ru.json";
import es from "./locales/es.json";

export const SUPPORTED_LANGUAGES = ["en-US", "en-GB", "he", "fr", "ru", "es"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const RTL_LANGUAGES: SupportedLanguage[] = ["he"];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  "en-US": "English (US)",
  "en-GB": "English (UK)",
  he: "עברית",
  fr: "Français",
  ru: "Русский",
  es: "Español",
};

export function applyDocumentDirection(language: string) {
  const isRtl = RTL_LANGUAGES.includes(language as SupportedLanguage);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = language;
}

// Registered before init(): with all resources supplied inline (no async
// fetch), i18next resolves the initial language and fires "languageChanged"
// synchronously from within init() itself, before a listener added after
// init() would be attached. Attaching first — plus the explicit call below
// once init resolves — makes sure the very first language (not just later
// changeLanguage() calls) applies dir/lang.
i18n.on("languageChanged", applyDocumentDirection);

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
      es: { translation: es },
    },
    fallbackLng: "he",
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })
  .then(() => applyDocumentDirection(i18n.resolvedLanguage ?? i18n.language));

export default i18n;
