import type { SupportedLanguage } from "../i18n";
import type { LocalizedText } from "./types";

/** Falls back to Hebrew (the source language Arik types) if a translation is missing. */
export function localize(text: LocalizedText, language: SupportedLanguage): string {
  return text[language] ?? text.he;
}
