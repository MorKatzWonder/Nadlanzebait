import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { AGENT_HOURS, AGENT_NAME, AGENT_OFFICE_ADDRESS, AGENT_PHONE_DIAL, AGENT_PHONE_DISPLAY, AGENT_WHATSAPP_DIGITS, SOCIAL_LINKS, waHref } from "../data/content";
import { localize } from "../data/localize";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./SocialIcons";
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
          <div className="site-header__actions">
            <LanguageSwitcher />
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
        </div>
        <nav id="main-nav" className={`main-nav container${navOpen ? " is-open" : ""}`}>
          <div className="navlinks">
            <NavLink to="/" end className={navLink} onClick={() => setNavOpen(false)}>
              {t("nav.home")}
            </NavLink>
            <Link to="/#properties" className="navlink" onClick={() => setNavOpen(false)}>
              {t("nav.listings")}
            </Link>
            <Link to="/#testimonials" className="navlink" onClick={() => setNavOpen(false)}>
              {t("nav.testimonials")}
            </Link>
            <Link to="/#contact" className="navlink" onClick={() => setNavOpen(false)}>
              {t("nav.contact")}
            </Link>
          </div>
          <div className="main-nav__bottom">
            <a className="btn btn-primary" href={`tel:${AGENT_PHONE_DIAL}`}>
              {t("common.callNow")}
            </a>
            <div className="social-icons social-icons--header">
              <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" target="_blank" rel="noreferrer noopener">
                <InstagramIcon className="social-icons__icon" />
              </a>
              <a href={SOCIAL_LINKS.facebook} aria-label="Facebook" target="_blank" rel="noreferrer noopener">
                <FacebookIcon className="social-icons__icon" />
              </a>
              <a href={SOCIAL_LINKS.tiktok} aria-label="TikTok" target="_blank" rel="noreferrer noopener">
                <TikTokIcon className="social-icons__icon" />
              </a>
            </div>
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
            <div className="social-icons">
              <a href={SOCIAL_LINKS.instagram} aria-label="Instagram" target="_blank" rel="noreferrer noopener">
                <InstagramIcon className="social-icons__icon" />
              </a>
              <a href={SOCIAL_LINKS.facebook} aria-label="Facebook" target="_blank" rel="noreferrer noopener">
                <FacebookIcon className="social-icons__icon" />
              </a>
              <a href={SOCIAL_LINKS.tiktok} aria-label="TikTok" target="_blank" rel="noreferrer noopener">
                <TikTokIcon className="social-icons__icon" />
              </a>
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
