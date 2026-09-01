import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Listing } from "../data/types";
import { localize } from "../data/localize";
import type { SupportedLanguage } from "../i18n";
import {
  AGENT_PHONE_DIAL,
  AGENT_WHATSAPP_DIGITS,
  CHARACTERISTIC_LABELS,
  CITY,
  CONDITION_LABELS,
  NEIGHBORHOOD_LABELS,
  POI_LABELS,
  TYPE_LABELS,
  listingWaMessage,
  waHref,
} from "../data/content";

function formatPrice(price: number, language: SupportedLanguage) {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(price);
}

function PropertyDetail({ listing, language }: { listing: Listing; language: SupportedLanguage }) {
  const { t } = useTranslation();
  const yes = t("listings.yes");
  const no = t("listings.no");
  const F = (key: string) => t(`listings.fields.${key}`);

  const rows: [string, string | number][] = [
    [F("type"), localize(TYPE_LABELS[listing.type], language)],
    [F("city"), localize(CITY, language)],
    [F("neighborhood"), localize(NEIGHBORHOOD_LABELS[listing.neighborhood], language)],
    [F("street"), localize(listing.street, language)],
    [t("common.rooms"), listing.rooms],
    [F("size"), `${listing.sizeSqm} ${t("common.sqm")}`],
    [F("balcony"), listing.balconySqm ? `${listing.balconySqm} ${t("common.sqm")}` : no],
    [F("floor"), listing.floor],
    [F("floors"), listing.floors],
    [F("exposure"), `${listing.exposureCount} · ${localize(listing.exposureDesc, language)}`],
    [F("parking"), listing.parking || no],
    [F("storage"), listing.storage ? yes : no],
    [F("basement"), listing.basement ? yes : no],
    [F("shabbatElevator"), listing.shabbatElevator ? yes : no],
    [F("accessible"), listing.accessible ? yes : no],
    [F("yearBuilt"), listing.yearBuilt],
    [F("condition"), localize(CONDITION_LABELS[listing.condition], language)],
  ];

  return (
    <div className="detail">
      <div className="dl">
        {rows.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="kick" style={{ marginBottom: 8 }}>
          {F("characteristics")}
        </div>
        <div className="tags">
          {listing.characteristics.map((c) => (
            <span className="tag" key={c}>
              {localize(CHARACTERISTIC_LABELS[c], language)}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="kick" style={{ marginBottom: 8 }}>
          {F("nearby")}
        </div>
        <div className="poi">
          {listing.pointsOfInterest.map((p) => (
            <span key={p}>{localize(POI_LABELS[p], language)}</span>
          ))}
        </div>
      </div>
      <div>
        <div className="kick" style={{ marginBottom: 8 }}>
          {F("description")}
        </div>
        <p className="desc">{localize(listing.description, language)}</p>
      </div>
    </div>
  );
}

export function PropertyCard({ listing }: { listing: Listing }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const [open, setOpen] = useState(false);

  const address = `${localize(listing.street, language)}, ${localize(NEIGHBORHOOD_LABELS[listing.neighborhood], language)}`;
  const waMessage = listingWaMessage(language, address);

  const facts = [
    `${listing.rooms} ${t("common.rooms")}`,
    `${listing.sizeSqm} ${t("common.sqm")}`,
    t("listings.floorOf", { floor: listing.floor, floors: listing.floors }),
    t("listings.exposureCount", { count: listing.exposureCount }),
  ];

  return (
    <article className={`card${open ? " open" : ""}`}>
      <div className="ph">
        {listing.status ? (
          <span className="tag tag-status st">{localize(listing.status, language)}</span>
        ) : null}
        {t("listings.photoPlaceholder")}
      </div>
      <div className="card-body">
        <div>
          <div className="type">{localize(TYPE_LABELS[listing.type], language)}</div>
          <div className="loc">
            {localize(NEIGHBORHOOD_LABELS[listing.neighborhood], language)} ·{" "}
            {localize(listing.street, language)}
          </div>
        </div>
        <div className="price tnum">{formatPrice(listing.price, language)}</div>
        <div className="facts">
          {facts.map((fact, idx) => (
            <span key={idx}>{fact}</span>
          ))}
        </div>
        <p className="teaser">{localize(listing.teaser, language)}</p>
        <div className="tags">
          {listing.characteristics.slice(0, 3).map((c) => (
            <span className="tag" key={c}>
              {localize(CHARACTERISTIC_LABELS[c], language)}
            </span>
          ))}
        </div>
        <div className="cta-row">
          <a className="btn btn-primary btn-sm" href={`tel:${AGENT_PHONE_DIAL}`}>
            {t("common.callNow")}
          </a>
          <a
            className="btn btn-outline btn-sm"
            href={waHref(AGENT_WHATSAPP_DIGITS, waMessage)}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t("common.whatsapp")}
          </a>
          <button type="button" className="more" onClick={() => setOpen((o) => !o)}>
            {open ? t("listings.fewerDetails") : t("listings.allDetails")} {open ? "↑" : "↓"}
          </button>
        </div>
      </div>
      {open ? <PropertyDetail listing={listing} language={language} /> : null}
    </article>
  );
}
