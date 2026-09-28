import { useTranslation } from "react-i18next";
import { LEGAL_DOCS, LEGAL_LAST_UPDATED, type LegalDocKey } from "../data/legal";
import { localize } from "../data/localize";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import type { SupportedLanguage } from "../i18n";
import type { LocalizedText } from "../data/types";

const BULLET = "• ";

/** Groups consecutive "• " paragraphs into one list, so a section can mix prose and bullets. */
function SectionBody({ body, language }: { body: LocalizedText[]; language: SupportedLanguage }) {
  const blocks: (string | string[])[] = [];
  for (const text of body.map((p) => localize(p, language))) {
    const last = blocks[blocks.length - 1];
    if (text.startsWith(BULLET)) {
      const item = text.slice(BULLET.length);
      if (Array.isArray(last)) last.push(item);
      else blocks.push([item]);
    } else {
      blocks.push(text);
    }
  }
  return (
    <>
      {blocks.map((block, idx) =>
        Array.isArray(block) ? (
          <ul key={idx}>
            {block.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={idx}>{block}</p>
        ),
      )}
    </>
  );
}

export function LegalPage({ doc: key }: { doc: LegalDocKey }) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const doc = LEGAL_DOCS[key];
  const title = localize(doc.title, language);
  const updated = new Intl.DateTimeFormat(language, { dateStyle: "long", timeZone: "UTC" }).format(new Date(LEGAL_LAST_UPDATED));

  useDocumentMeta({ title: `${title} — ${t("meta.title")}`, description: localize(doc.intro, language) });

  return (
    <>
      <section className="band legal-hero">
        <div className="container">
          <div className="kick">{localize(doc.kick, language)}</div>
          <h1>{title}</h1>
          <p className="legal-hero__updated">
            {t("legal.lastUpdated")}: <time dateTime={LEGAL_LAST_UPDATED}>{updated}</time>
          </p>
        </div>
      </section>
      <div className="container sec">
        <article className="legal">
          <p className="legal__intro">{localize(doc.intro, language)}</p>
          {doc.sections.map((section) => (
            <section key={section.h.he}>
              <h2>{localize(section.h, language)}</h2>
              <SectionBody body={section.body} language={language} />
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
