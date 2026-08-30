import { useTranslation } from "react-i18next";
import { testimonials } from "../data/testimonials";
import { localize } from "../data/localize";
import type { SupportedLanguage } from "../i18n";

export function Testimonials() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="container section">
      <h1 className="section__title">{t("testimonials.title")}</h1>
      <p className="section__intro">{t("testimonials.intro")}</p>

      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <p className="testimonial-card__quote">“{localize(testimonial.quote, language)}”</p>
            <p className="testimonial-card__author">{testimonial.authorName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
