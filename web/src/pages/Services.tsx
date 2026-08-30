import { useTranslation } from "react-i18next";

interface ServiceItem {
  title: string;
  desc: string;
}

export function Services() {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as ServiceItem[];

  return (
    <div className="container section">
      <h1 className="section__title">{t("services.title")}</h1>
      <p className="section__intro">{t("services.intro")}</p>

      <div className="card-grid">
        {items.map((item) => (
          <div className="card" key={item.title}>
            <div className="card__body">
              <span className="card__title">{item.title}</span>
              <span className="card__meta">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
