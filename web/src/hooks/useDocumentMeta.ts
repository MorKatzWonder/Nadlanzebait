import { useEffect } from "react";

/**
 * Sets the document title/description (and optionally a page-specific
 * JSON-LD block) for the current route. index.html carries the
 * site-wide defaults for non-JS crawlers; this keeps the browser tab and
 * any crawler that does execute JS in sync with the page actually shown.
 */
export function useDocumentMeta(options: { title: string; description: string; jsonLd?: object }) {
  const { title, description, jsonLd } = options;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute("content") ?? null;
    descriptionTag?.setAttribute("content", description);

    let jsonLdScript: HTMLScriptElement | null = null;
    if (jsonLd) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.text = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdScript);
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) descriptionTag?.setAttribute("content", previousDescription);
      jsonLdScript?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, JSON.stringify(jsonLd)]);
}
