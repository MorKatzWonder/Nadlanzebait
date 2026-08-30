import { useTranslation } from "react-i18next";
import { listings } from "../data/listings";
import { localize } from "../data/localize";
import type { Listing } from "../data/types";
import type { SupportedLanguage } from "../i18n";

function formatPrice(listing: Listing, language: SupportedLanguage) {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(listing.price);
}

function ListingCard({ listing }: { listing: Listing }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className={`card${listing.status === "previous" ? " card--previous" : ""}`}>
      <img src={listing.photoUrl} alt={localize(listing.title, language)} />
      <div className="card__body">
        <span className="badge">{listing.city}</span>
        <span className="card__title">{localize(listing.title, language)}</span>
        <span className="card__meta">{localize(listing.description, language)}</span>
        <span className="card__meta">
          {t("common.rooms")}: {listing.rooms} · {t("common.size")}: {listing.sizeSqm} m²
        </span>
        <span className="card__price">{formatPrice(listing, language)}</span>
        <a
          className="btn btn-outline"
          href={listing.yad2Url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {t("common.viewOnYad2")}
        </a>
      </div>
    </div>
  );
}

export function Listings() {
  const { t } = useTranslation();
  const current = listings.filter((listing) => listing.status === "current");
  const previous = listings.filter((listing) => listing.status === "previous");

  return (
    <div className="container section">
      <h1 className="section__title">{t("listings.title")}</h1>
      <p className="section__intro">{t("listings.intro")}</p>

      <h2 className="section__title">{t("listings.currentTitle")}</h2>
      {current.length === 0 ? (
        <p className="section__intro">{t("listings.emptyCurrent")}</p>
      ) : (
        <div className="card-grid">
          {current.map((listing) => (
            <ListingCard listing={listing} key={listing.id} />
          ))}
        </div>
      )}

      <h2 className="section__title" style={{ marginTop: "2.5rem" }}>
        {t("listings.previousTitle")}
      </h2>
      {previous.length === 0 ? (
        <p className="section__intro">{t("listings.emptyPrevious")}</p>
      ) : (
        <div className="card-grid">
          {previous.map((listing) => (
            <ListingCard listing={listing} key={listing.id} />
          ))}
        </div>
      )}
    </div>
  );
}
