import { useTranslation } from "react-i18next";
import { testimonials } from "../data/testimonials";
import { localize } from "../data/localize";
import { TESTIMONIALS_HEAD } from "../data/content";
import type { SupportedLanguage } from "../i18n";

export function Testimonials() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;

  return (
    <div className="container sec">
      <div className="kick">{localize(TESTIMONIALS_HEAD.kick, language)}</div>
      <h1 className="sec-title">{localize(TESTIMONIALS_HEAD.h, language)}</h1>

      <div className="quotes">
        {testimonials.map((testimonial) => (
          <figure className="quote" key={testimonial.id}>
            <p>{localize(testimonial.quote, language)}</p>
            <figcaption className="who">{localize(testimonial.attribution, language)}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
