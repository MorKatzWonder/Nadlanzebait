import { useEffect, useState } from "react";
import { listings as fallbackListings } from "./listings";
import { testimonials as fallbackTestimonials } from "./testimonials";
import { parseListingsCsv, parseTestimonialsCsv } from "./sheetParse";
import { LISTINGS_CSV_URL, TESTIMONIALS_CSV_URL } from "./sheetConfig";
import type { Listing, Testimonial } from "./types";

export interface SheetData<T> {
  items: T[];
  /** True only while a configured sheet's first fetch is still in flight — lets callers
   *  show a loading state instead of the sample data, which would otherwise flash and
   *  then get replaced once the real sheet loads a moment later. */
  loading: boolean;
}

/**
 * Fetches the published Google Sheet CSV and parses it into Listing[],
 * starting from (and falling back to, on any failure) the bundled sample
 * data — so the site always has something to show and a bad/unpublished
 * sheet never breaks the page. While a configured sheet's first fetch is
 * still pending, `loading` is true so callers can avoid rendering (and
 * then reflowing away from) the sample data.
 */
export function useListings(): SheetData<Listing> {
  const [state, setState] = useState<SheetData<Listing>>({
    items: fallbackListings,
    loading: Boolean(LISTINGS_CSV_URL),
  });

  useEffect(() => {
    if (!LISTINGS_CSV_URL) return;
    let cancelled = false;
    fetch(LISTINGS_CSV_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((csv) => {
        const parsed = parseListingsCsv(csv);
        if (!cancelled) setState({ items: parsed.length > 0 ? parsed : fallbackListings, loading: false });
      })
      .catch((err) => {
        console.warn("Could not load listings from the Google Sheet, using sample data.", err);
        if (!cancelled) setState({ items: fallbackListings, loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useTestimonials(): SheetData<Testimonial> {
  const [state, setState] = useState<SheetData<Testimonial>>({
    items: fallbackTestimonials,
    loading: Boolean(TESTIMONIALS_CSV_URL),
  });

  useEffect(() => {
    if (!TESTIMONIALS_CSV_URL) return;
    let cancelled = false;
    fetch(TESTIMONIALS_CSV_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((csv) => {
        const parsed = parseTestimonialsCsv(csv);
        if (!cancelled) setState({ items: parsed.length > 0 ? parsed : fallbackTestimonials, loading: false });
      })
      .catch((err) => {
        console.warn("Could not load testimonials from the Google Sheet, using sample data.", err);
        if (!cancelled) setState({ items: fallbackTestimonials, loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
