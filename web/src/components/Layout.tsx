import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Layout() {
  const { t } = useTranslation();
  const [navOpen, setNavOpen] = useState(false);

  const navLink = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : undefined);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__bar">
          <NavLink to="/" className="brand" onClick={() => setNavOpen(false)}>
            {t("meta.title")}
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
          <NavLink to="/" end className={navLink} onClick={() => setNavOpen(false)}>
            {t("nav.home")}
          </NavLink>
          <NavLink to="/services" className={navLink} onClick={() => setNavOpen(false)}>
            {t("nav.services")}
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
          <LanguageSwitcher />
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          {t("meta.title")} &copy; {new Date().getFullYear()} — {t("footer.rights")}
        </div>
      </footer>
    </div>
  );
}
