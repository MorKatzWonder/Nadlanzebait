import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <section className="hero">
        <h1>{t("home.heroTitle")}</h1>
        <p>{t("home.heroSubtitle")}</p>
        <div className="btn-row">
          <Link to="/listings" className="btn btn-primary">
            {t("home.ctaListings")}
          </Link>
          <Link to="/contact" className="btn btn-outline">
            {t("home.ctaContact")}
          </Link>
        </div>
      </section>

      <section className="section section--muted">
        <h2 className="section__title">{t("home.introTitle")}</h2>
        <p className="section__intro">{t("home.introBody")}</p>
      </section>
    </div>
  );
}
