import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PropertyCard } from "./PropertyCard";
import { listings } from "../data/listings";
import { localize } from "../data/localize";
import { NEIGHBORHOOD_LABELS, PRICE_BANDS, TYPE_LABELS } from "../data/content";
import type { SupportedLanguage } from "../i18n";
import type { Neighborhood, PropertyType } from "../data/types";

export function PropertiesSection() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const [neighborhood, setNeighborhood] = useState<Neighborhood | "">("");
  const [priceBandKey, setPriceBandKey] = useState("");
  const [type, setType] = useState<PropertyType | "">("");

  const availableNeighborhoods = useMemo(
    () => [...new Set(listings.map((l) => l.neighborhood))],
    [],
  );
  const availableTypes = useMemo(() => [...new Set(listings.map((l) => l.type))], []);

  const priceBand = PRICE_BANDS.find((b) => b.key === priceBandKey);
  const filtered = listings.filter((l) => {
    if (neighborhood && l.neighborhood !== neighborhood) return false;
    if (type && l.type !== type) return false;
    if (priceBand) {
      if (priceBand.min !== undefined && l.price < priceBand.min) return false;
      if (priceBand.max !== undefined && l.price > priceBand.max) return false;
    }
    return true;
  });

  return (
    <div className="container sec" id="properties">
      <h2 className="sec-title">{t("listings.title")}</h2>

      <div className="filters">
        <div className="field">
          <label htmlFor="filter-neighborhood">{t("listings.filters.neighborhood")}</label>
          <select
            id="filter-neighborhood"
            className="input"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value as Neighborhood | "")}
          >
            <option value="">{t("listings.filters.any")}</option>
            {availableNeighborhoods.map((hood) => (
              <option value={hood} key={hood}>
                {localize(NEIGHBORHOOD_LABELS[hood], language)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="filter-price">{t("listings.filters.priceRange")}</label>
          <select
            id="filter-price"
            className="input"
            value={priceBandKey}
            onChange={(e) => setPriceBandKey(e.target.value)}
          >
            <option value="">{t("listings.filters.any")}</option>
            {PRICE_BANDS.map((band) => (
              <option value={band.key} key={band.key}>
                {localize(band.label, language)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="filter-type">{t("listings.filters.type")}</label>
          <select
            id="filter-type"
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | "")}
          >
            <option value="">{t("listings.filters.any")}</option>
            {availableTypes.map((propertyType) => (
              <option value={propertyType} key={propertyType}>
                {localize(TYPE_LABELS[propertyType], language)}
              </option>
            ))}
          </select>
        </div>
        <span className="count tnum">{t("listings.filters.results", { count: filtered.length })}</span>
      </div>

      {filtered.length === 0 ? (
        <p className="muted" style={{ marginTop: "var(--s3)" }}>
          {t("listings.filters.none")}
        </p>
      ) : (
        <div className="grid-cards" style={{ marginTop: "var(--s3)" }}>
          {filtered.map((listing) => (
            <PropertyCard listing={listing} key={listing.id} />
          ))}
        </div>
      )}
    </div>
  );
}
