import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function NotFound() {
  const { t } = useTranslation();
  useDocumentMeta({ title: `${t("notFound.title")} — ${t("meta.title")}`, description: t("notFound.body") });

  return (
    <section className="band hero not-found">
      <div className="container">
        <div className="not-found__code tnum" aria-hidden="true">
          404
        </div>
        <h1>{t("notFound.title")}</h1>
        <p>{t("notFound.body")}</p>
        <div className="btn-row cta">
          <Link to="/" className="btn btn-neon">
            {t("notFound.home")}
          </Link>
          <Link to="/#properties" className="btn btn-outline not-found__outline">
            {t("nav.listings")}
          </Link>
        </div>
      </div>
    </section>
  );
}
