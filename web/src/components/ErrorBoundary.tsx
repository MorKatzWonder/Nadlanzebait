import { Component, type ReactNode } from "react";
import i18n from "../i18n";

/**
 * Last line of defense against a blank page: if anything below it throws
 * while rendering (bad sheet data, a stale cached bundle, a browser quirk),
 * show a short translated message with a reload button instead of
 * unmounting the whole app. Keyed by route in Layout so navigating away
 * clears the error.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Page failed to render:", error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const t = i18n.t.bind(i18n);
    return (
      <section className="band hero not-found">
        <div className="container">
          <h1>{t("pageError.title")}</h1>
          <p>{t("pageError.body")}</p>
          <div className="btn-row cta">
            <button type="button" className="btn btn-neon" onClick={() => window.location.reload()}>
              {t("pageError.reload")}
            </button>
            <a href={import.meta.env.BASE_URL} className="btn btn-outline not-found__outline">
              {t("notFound.home")}
            </a>
          </div>
        </div>
      </section>
    );
  }
}
