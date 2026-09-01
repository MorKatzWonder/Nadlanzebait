import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { listings } from "../data/listings";
import { localize } from "../data/localize";
import { formatPrice } from "../data/format";
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
import type { Listing } from "../data/types";

function Gallery({ listing, language }: { listing: Listing; language: SupportedLanguage }) {
  const { t } = useTranslation();
  const photos = listing.photos ?? [];
  const [selected, setSelected] = useState(0);

  if (photos.length === 0) {
    return <div className="gallery-main gallery-main--empty">{t("listings.photoPlaceholder")}</div>;
  }

  return (
    <div className="gallery">
      <img
        className="gallery-main"
        src={photos[selected]}
        alt={localize(listing.street, language)}
      />
      {photos.length > 1 ? (
        <div className="gallery-thumbs">
          {photos.map((photo, idx) => (
            <button
              type="button"
              key={photo}
              className={`gallery-thumb${idx === selected ? " active" : ""}`}
              onClick={() => setSelected(idx)}
              aria-label={`${idx + 1}/${photos.length}`}
            >
              <img src={photo} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function PropertyDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="container sec">
        <p>{t("listings.notFound")}</p>
        <Link to="/#properties" className="btn btn-outline">
          {t("listings.title")}
        </Link>
      </div>
    );
  }

  const address = `${localize(listing.street, language)}, ${localize(NEIGHBORHOOD_LABELS[listing.neighborhood], language)}`;
  const waMessage = listingWaMessage(language, address);
  const yes = t("listings.yes");
  const no = t("listings.no");
  const F = (key: string) => t(`listings.fields.${key}`);

  const rows: [string, string | number][] = [
    [F("type"), localize(TYPE_LABELS[listing.type], language)],
    [F("city"), localize(CITY, language)],
    [F("neighborhood"), localize(NEIGHBORHOOD_LABELS[listing.neighborhood], language)],
    [F("street"), localize(listing.street, language)],
    [F("rooms"), listing.rooms],
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
    <div className="container sec">
      <Link to="/#properties" className="muted" style={{ fontSize: 14 }}>
        ← {t("listings.title")}
      </Link>

      <div className="property-detail">
        <aside className="property-detail__aside">
          <div className="type">{localize(TYPE_LABELS[listing.type], language)}</div>
          <h1 className="sec-title" style={{ marginBlockEnd: "var(--s1)" }}>
            {localize(NEIGHBORHOOD_LABELS[listing.neighborhood], language)} ·{" "}
            {localize(listing.street, language)}
          </h1>
          <div className="price tnum" style={{ fontSize: 28 }}>
            {formatPrice(listing.price, language)}
          </div>
          <div className="btn-row" style={{ marginTop: "var(--s3)" }}>
            <a className="btn btn-primary" href={`tel:${AGENT_PHONE_DIAL}`}>
              {t("common.callNow")}
            </a>
            <a
              className="btn btn-outline"
              href={waHref(AGENT_WHATSAPP_DIGITS, waMessage)}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t("common.whatsapp")}
            </a>
          </div>
        </aside>

        <div className="property-detail__main">
          <Gallery listing={listing} language={language} />

          <p className="desc" style={{ marginTop: "var(--s4)", fontSize: 16, maxWidth: "68ch" }}>
            {localize(listing.description, language)}
          </p>

          <div className="dl" style={{ marginTop: "var(--s4)", maxWidth: 560 }}>
            {rows.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--s4)" }}>
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

          <div style={{ marginTop: "var(--s4)" }}>
            <div className="kick" style={{ marginBottom: 8 }}>
              {F("nearby")}
            </div>
            <div className="poi">
              {listing.pointsOfInterest.map((p) => (
                <span key={p}>{localize(POI_LABELS[p], language)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
