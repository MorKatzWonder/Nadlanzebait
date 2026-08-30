import { useTranslation } from "react-i18next";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from "../i18n";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          className={lang === current ? "active" : ""}
          onClick={() => i18n.changeLanguage(lang)}
          aria-pressed={lang === current}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
