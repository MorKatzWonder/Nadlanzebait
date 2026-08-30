import { useTranslation } from "react-i18next";

const PLACEHOLDER_PHONE = "+972-50-000-0000";
const PLACEHOLDER_PHONE_DIAL = "+972500000000";
const PLACEHOLDER_EMAIL = "arik@nadlanzebait.example";

export function Contact() {
  const { t } = useTranslation();

  return (
    <div className="container section">
      <h1 className="section__title">{t("contact.title")}</h1>
      <p className="section__intro">{t("contact.intro")}</p>

      <div className="contact-grid">
        <div className="contact-card">
          <p className="card__title">Arik</p>
          <dl>
            <dt>{t("contact.officeOwner")}</dt>
            <dd>Arik — Nadlanzebait</dd>
            <dt>{t("contact.phone")}</dt>
            <dd>{PLACEHOLDER_PHONE}</dd>
            <dt>{t("contact.email")}</dt>
            <dd>{PLACEHOLDER_EMAIL}</dd>
          </dl>
          <div className="btn-row">
            <a className="btn btn-primary" href={`tel:${PLACEHOLDER_PHONE_DIAL}`}>
              {t("common.callNow")}
            </a>
            <a
              className="btn btn-outline"
              href={`https://wa.me/${PLACEHOLDER_PHONE_DIAL.replace("+", "")}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t("common.whatsapp")}
            </a>
          </div>
        </div>

        <form className="contact-form contact-card" action={`mailto:${PLACEHOLDER_EMAIL}`} method="post">
          <label>
            {t("contact.nameLabel")}
            <input type="text" name="name" required />
          </label>
          <label>
            {t("contact.phoneLabel")}
            <input type="tel" name="phone" />
          </label>
          <label>
            {t("contact.messageLabel")}
            <textarea name="message" required />
          </label>
          <button type="submit" className="btn btn-primary">
            {t("contact.send")}
          </button>
        </form>
      </div>
    </div>
  );
}
