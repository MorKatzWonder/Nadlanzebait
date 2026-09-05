import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES, type SupportedLanguage } from "../i18n";
import { GlobeIcon } from "./GlobeIcon";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage as SupportedLanguage;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lang-menu" ref={rootRef}>
      <button
        type="button"
        className="lang-menu__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((o) => !o)}
      >
        <GlobeIcon className="lang-menu__icon" />
      </button>
      {open ? (
        <ul className="lang-menu__list" role="listbox">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang}>
              <button
                type="button"
                role="option"
                aria-selected={lang === current}
                className={`lang-menu__item${lang === current ? " active" : ""}`}
                onClick={() => {
                  i18n.changeLanguage(lang);
                  setOpen(false);
                }}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
