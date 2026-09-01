import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { AGENT_HOURS, AGENT_NAME, AGENT_OFFICE_ADDRESS, AGENT_PHONE_DIAL, AGENT_PHONE_DISPLAY, AGENT_WHATSAPP_DIGITS, waHref } from "../data/content";
import { localize } from "../data/localize";
import type { SupportedLanguage } from "../i18n";

export function Layout() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const [navOpen, setNavOpen] = useState(false);

  const navLink = ({ isActive }: { isActive: boolean }) => `navlink${isActive ? " active" : ""}`;

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__bar">
          <NavLink to="/" className="brand" onClick={() => setNavOpen(false)}>
            <Logo className="brand__mark" />
            <b>{t("meta.title")}</b>
          </NavLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={navOpen}
            aria-controls="main-nav"
            onClick={() => setNavOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
        <nav id="main-nav" className={`main-nav container${navOpen ? " is-open" : ""}`}>
          <div className="navlinks">
            <NavLink to="/" end className={navLink} onClick={() => setNavOpen(false)}>
              {t("nav.home")}
            </NavLink>
            <NavLink to="/listings" className={navLink} onClick={() => setNavOpen(false)}>
              {t("nav.listings")}
            </NavLink>
            <NavLink to="/testimonials" className={navLink} onClick={() => setNavOpen(false)}>
              {t("nav.testimonials")}
            </NavLink>
            <NavLink to="/contact" className={navLink} onClick={() => setNavOpen(false)}>
              {t("nav.contact")}
            </NavLink>
          </div>
          <div className="navright">
            <LanguageSwitcher />
            <a className="btn btn-primary btn-sm" href={`tel:${AGENT_PHONE_DIAL}`}>
              {t("common.callNow")}
            </a>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer__cols">
          <div>
            <div className="site-footer__brand">
              <Logo className="brand__mark" />
              <b>{t("meta.title")}</b>
            </div>
          </div>
          <div>
            <div className="kick">{t("nav.contact")}</div>
            <div className="site-footer__col-body">
              {localize(AGENT_NAME, language)}
              <br />
              <a href={`tel:${AGENT_PHONE_DIAL}`}>{AGENT_PHONE_DISPLAY}</a>
              <br />
              <a href={waHref(AGENT_WHATSAPP_DIGITS, "")} target="_blank" rel="noreferrer noopener">
                {t("common.whatsapp")}
              </a>
            </div>
          </div>
          <div>
            <div className="kick">{t("contact.office")}</div>
            <div className="site-footer__col-body">
              {localize(AGENT_OFFICE_ADDRESS, language)}
              <br />
              {localize(AGENT_HOURS, language)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
