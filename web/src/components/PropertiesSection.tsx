import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PropertyCard } from "./PropertyCard";
import { SkeletonPropertyCard } from "./SkeletonPropertyCard";
import { Carousel } from "./Carousel";
import { useListings } from "../data/useSheetData";
import { localize } from "../data/localize";
import { PRICE_BANDS, TYPE_LABELS } from "../data/content";
import type { SupportedLanguage } from "../i18n";
import type { LocalizedText, PropertyType } from "../data/types";

export function PropertiesSection() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const { items: listings, loading } = useListings();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [neighborhood, setNeighborhood] = useState("");
  const [priceBandKey, setPriceBandKey] = useState("");
  const [type, setType] = useState<PropertyType | "">("");

  // Neighborhood is free text (see data/types.ts), so "the same neighborhood" means
  // "the same Hebrew text" — dedupe by .he, keeping one LocalizedText per unique value.
  const availableNeighborhoods = useMemo(() => {
    const byHebrew = new Map<string, LocalizedText>();
    listings.forEach((l) => {
      if (!byHebrew.has(l.neighborhood.he)) byHebrew.set(l.neighborhood.he, l.neighborhood);
    });
    return [...byHebrew.values()];
  }, [listings]);
  const availableTypes = useMemo(() => [...new Set(listings.map((l) => l.type))], [listings]);

  const priceBand = PRICE_BANDS.find((b) => b.key === priceBandKey);
  const filtered = listings.filter((l) => {
    if (neighborhood && l.neighborhood.he !== neighborhood) return false;
    if (type && l.type !== type) return false;
    if (priceBand) {
      if (priceBand.min !== undefined && l.price < priceBand.min) return false;
      if (priceBand.max !== undefined && l.price > priceBand.max) return false;
    }
    return true;
  });

  return (
    <div className="container sec" id="properties">
      <div className="sec-head">
        <h2 className="sec-title" style={{ marginBottom: 0 }}>
          {t("listings.title")}
        </h2>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          aria-expanded={filtersOpen}
          aria-controls="properties-filters"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          {t("listings.filters.toggle")} {filtersOpen ? "▲" : "▼"}
        </button>
      </div>

      {loading ? (
        <div style={{ marginTop: "var(--s3)" }}>
          <div className="grid-cards">
            {[0, 1, 2].map((i) => (
              <SkeletonPropertyCard key={i} />
            ))}
          </div>
        </div>
      ) : filtersOpen ? (
        <div className="filters" id="properties-filters">
          <div className="field">
            <label htmlFor="filter-neighborhood">{t("listings.filters.neighborhood")}</label>
            <select
              id="filter-neighborhood"
              className="input"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            >
              <option value="">{t("listings.filters.any")}</option>
              {availableNeighborhoods.map((hood) => (
                <option value={hood.he} key={hood.he}>
                  {localize(hood, language)}
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
      ) : (
        <span className="count tnum" style={{ display: "block", marginTop: "var(--s2)" }}>
          {t("listings.filters.results", { count: filtered.length })}
        </span>
      )}

      {loading ? null : filtered.length === 0 ? (
        <p className="muted" style={{ marginTop: "var(--s3)" }}>
          {t("listings.filters.none")}
        </p>
      ) : (
        <div style={{ marginTop: "var(--s3)" }}>
          <Carousel className="grid-cards">
            {filtered.map((listing) => (
              <PropertyCard listing={listing} key={listing.id} />
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
