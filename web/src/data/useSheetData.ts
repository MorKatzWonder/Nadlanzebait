import { useEffect, useState } from "react";
import { listings as fallbackListings } from "./listings";
import { testimonials as fallbackTestimonials } from "./testimonials";
import { parseListingsCsv, parseTestimonialsCsv } from "./sheetParse";
import { LISTINGS_CSV_URL, TESTIMONIALS_CSV_URL } from "./sheetConfig";
import type { Listing, Testimonial } from "./types";

/**
 * Fetches the published Google Sheet CSV and parses it into Listing[],
 * starting from (and falling back to, on any failure) the bundled sample
 * data — so the site always has something to show and a bad/unpublished
 * sheet never breaks the page.
 */
export function useListings(): Listing[] {
  const [listings, setListings] = useState<Listing[]>(fallbackListings);

  useEffect(() => {
    if (!LISTINGS_CSV_URL) return;
    let cancelled = false;
    fetch(LISTINGS_CSV_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((csv) => {
        const parsed = parseListingsCsv(csv);
        if (!cancelled && parsed.length > 0) setListings(parsed);
      })
      .catch((err) => {
        console.warn("Could not load listings from the Google Sheet, using sample data.", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return listings;
}

export function useTestimonials(): Testimonial[] {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    if (!TESTIMONIALS_CSV_URL) return;
    let cancelled = false;
    fetch(TESTIMONIALS_CSV_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((csv) => {
        const parsed = parseTestimonialsCsv(csv);
        if (!cancelled && parsed.length > 0) setTestimonials(parsed);
      })
      .catch((err) => {
        console.warn("Could not load testimonials from the Google Sheet, using sample data.", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return testimonials;
}
