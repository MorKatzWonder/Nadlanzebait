import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Listing } from "../data/types";
import { localize } from "../data/localize";
import { formatPrice } from "../data/format";
import { ArrowUpRightIcon } from "./Icons";
import type { SupportedLanguage } from "../i18n";
import {
  AGENT_PHONE_DIAL,
  AGENT_WHATSAPP_DIGITS,
  CHARACTERISTIC_LABELS,
  TYPE_LABELS,
  listingWaMessage,
  waHref,
} from "../data/content";

export function PropertyCard({ listing }: { listing: Listing }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;

  const address = `${localize(listing.street, language)}, ${localize(listing.neighborhood, language)}`;
  const waMessage = listingWaMessage(language, address);
  const detailHref = `/listings/${listing.id}`;

  const facts = [
    `${listing.rooms} ${t("common.rooms")}`,
    `${listing.sizeSqm} ${t("common.sqm")}`,
    t("listings.floorOf", { floor: listing.floor, floors: listing.floors }),
    t("listings.exposureCount", { count: listing.exposureCount }),
  ];

  return (
    <article className="card">
      <Link to={detailHref} target="_blank" rel="noopener" className="ph">
        {listing.status ? (
          <span className="tag tag-status st">{localize(listing.status, language)}</span>
        ) : null}
        {t("listings.photoPlaceholder")}
      </Link>
      <div className="card-body">
        <Link
          to={detailHref}
          target="_blank"
          rel="noopener"
          style={{ color: "inherit", textDecoration: "none", display: "block" }}
        >
          <div className="type">{localize(TYPE_LABELS[listing.type], language)}</div>
          <div className="loc">
            {localize(listing.neighborhood, language)} ·{" "}
            {localize(listing.street, language)}
          </div>
        </Link>
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
          <Link to={detailHref} target="_blank" rel="noopener" className="more">
            {t("listings.allDetails")}
            <ArrowUpRightIcon className="more__icon" />
          </Link>
        </div>
      </div>
    </article>
  );
}
