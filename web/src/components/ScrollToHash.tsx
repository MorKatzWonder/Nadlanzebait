import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't scroll to an in-page anchor on navigation by default.
 * This scrolls to the element matching the URL hash whenever it changes —
 * used so nav items like "Testimonials" can link to a section on Home
 * (`/#testimonials`) instead of a standalone page.
 */
export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
}
