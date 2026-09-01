import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { localize } from "../data/localize";
import type { SupportedLanguage } from "../i18n";
import {
  ABOUT,
  AGENT_HOURS,
  AGENT_NAME,
  AGENT_OFFICE_ADDRESS,
  AGENT_PHONE_DIAL,
  AGENT_PHONE_DISPLAY,
  AGENT_WHATSAPP_DIGITS,
  TYPE_LABELS,
  VALUATION_FORM_HEAD,
  waHref,
} from "../data/content";
import type { PropertyType } from "../data/types";

const TYPE_KEYS = Object.keys(TYPE_LABELS) as PropertyType[];

function buildValuationMessage(
  language: SupportedLanguage,
  values: { name: string; phone: string; address: string; type: string; message: string },
) {
  const typeLabel = localize(TYPE_LABELS[values.type as PropertyType], language);
  if (language === "en-US" || language === "en-GB") {
    return [
      "Hello, I'd like a free valuation.",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Property address: ${values.address}`,
      `Property type: ${typeLabel}`,
      values.message ? `Note: ${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    "שלום, אשמח להערכת שווי.",
    `שם: ${values.name}`,
    `טלפון: ${values.phone}`,
    `כתובת הנכס: ${values.address}`,
    `סוג הנכס: ${typeLabel}`,
    values.message ? `הערה: ${values.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function ContactSection() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState<PropertyType>(TYPE_KEYS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({});
  const [sentHref, setSentHref] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = t("contact.form.errorName");
    if (!/^[0-9+\-\s()]{9,}$/.test(phone.trim())) nextErrors.phone = t("contact.form.errorPhone");
    if (address.trim().length < 3) nextErrors.address = t("contact.form.errorAddress");
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSentHref(null);
      return;
    }

    const waMessage = buildValuationMessage(language, { name, phone, address, type, message });
    const href = waHref(AGENT_WHATSAPP_DIGITS, waMessage);
    setSentHref(href);
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="container sec" id="contact">
      <div className="about">
        <div>
          <div className="kick">{localize(ABOUT.kick, language)}</div>
          <h2 className="sec-title">{localize(ABOUT.h, language)}</h2>
          {ABOUT.paragraphs.map((p, idx) => (
            <p className="muted" key={idx} style={{ maxWidth: "44ch", marginBottom: "var(--s2)" }}>
              {localize(p, language)}
            </p>
          ))}
          <div className="btn-row" style={{ marginTop: "var(--s3)" }}>
            <a className="btn btn-primary" href={`tel:${AGENT_PHONE_DIAL}`}>
              {t("common.callNow")} {AGENT_PHONE_DISPLAY}
            </a>
            <a
              className="btn btn-outline"
              href={waHref(AGENT_WHATSAPP_DIGITS, "")}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t("common.whatsapp")}
            </a>
          </div>
        </div>
        <div className="slot">{localize(ABOUT.slot, language)}</div>
      </div>

      <div className="contact-card" style={{ marginTop: "var(--s4)" }}>
        <p className="loc">{localize(AGENT_NAME, language)}</p>
        <ul className="contact-row">
          <li>
            <span className="contact-row__label">{t("common.callNow")}:</span> {AGENT_PHONE_DISPLAY}
          </li>
          <li>
            <span className="contact-row__label">{t("contact.office")}:</span>{" "}
            {localize(AGENT_OFFICE_ADDRESS, language)}
          </li>
          <li>
            <span className="contact-row__label">{t("contact.hours")}:</span>{" "}
            {localize(AGENT_HOURS, language)}
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "var(--s5)" }}>
        <div className="kick">{localize(VALUATION_FORM_HEAD.kick, language)}</div>
        <h2 className="sec-title">{localize(VALUATION_FORM_HEAD.h, language)}</h2>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="vf-name">{t("contact.form.name")}</label>
            <input
              className="input"
              id="vf-name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="err">{errors.name}</div>
          </div>
          <div className="field">
            <label htmlFor="vf-phone">{t("contact.form.phone")}</label>
            <input
              className="input"
              id="vf-phone"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="err">{errors.phone}</div>
          </div>
          <div className="field full">
            <label htmlFor="vf-address">{t("contact.form.address")}</label>
            <input
              className="input"
              id="vf-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="err">{errors.address}</div>
          </div>
          <div className="field">
            <label htmlFor="vf-type">{t("contact.form.propertyType")}</label>
            <select
              className="input"
              id="vf-type"
              value={type}
              onChange={(e) => setType(e.target.value as PropertyType)}
            >
              {TYPE_KEYS.map((key) => (
                <option value={key} key={key}>
                  {localize(TYPE_LABELS[key], language)}
                </option>
              ))}
            </select>
          </div>
          <div className="field full">
            <label htmlFor="vf-message">{t("contact.form.message")}</label>
            <input className="input" id="vf-message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
          <div className="full">
            <button type="submit" className="btn btn-primary">
              {t("contact.form.send")}
            </button>
          </div>
          {sentHref ? (
            <div className="full ok">
              {t("contact.form.sent")}{" "}
              <a href={sentHref} target="_blank" rel="noreferrer noopener">
                {t("common.whatsapp")}
              </a>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
