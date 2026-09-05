import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PropertiesSection } from "../components/PropertiesSection";
import { ContactSection } from "../components/ContactSection";
import { Carousel } from "../components/Carousel";
import { useTestimonials } from "../data/useSheetData";
import { localize } from "../data/localize";
import { HOME_HERO, HOME_STATS, HOME_STEPS, HOME_STEPS_HEAD, TESTIMONIALS_HEAD } from "../data/content";
import type { SupportedLanguage } from "../i18n";

export function Home() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const testimonials = useTestimonials();

  return (
    <div>
      <div className="band">
        <div className="container hero">
          <div className="kick">{localize(HOME_HERO.kick, language)}</div>
          <h1>
            {localize(HOME_HERO.line1, language)}
            <br />
            <em>{localize(HOME_HERO.line2, language)}</em>
          </h1>
          <p>{localize(HOME_HERO.body, language)}</p>
          <div className="cta btn-row">
            <Link to="/#contact" className="btn btn-neon">
              {localize(HOME_HERO.ctaValuation, language)}
            </Link>
            <Link
              to="/#properties"
              className="btn btn-outline"
              style={{ borderColor: "rgba(92,255,122,.5)", color: "#c9f5cd" }}
            >
              {localize(HOME_HERO.ctaProperties, language)}
            </Link>
          </div>
          <div className="stats">
            {HOME_STATS.map((stat) => (
              <div className="stat" key={stat.n}>
                <div className="n tnum">{stat.n}</div>
                <div className="l">{localize(stat.l, language)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container sec">
        <div className="sec-head">
          <div>
            <div className="kick">{localize(HOME_STEPS_HEAD.kick, language)}</div>
            <h2>{localize(HOME_STEPS_HEAD.h, language)}</h2>
          </div>
        </div>
        <div className="steps">
          {HOME_STEPS.map((step) => (
            <div className="step" key={step.n}>
              <div className="n tnum">{step.n}</div>
              <h3>{localize(step.title, language)}</h3>
              <p>{localize(step.body, language)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="rule" />
      </div>

      <PropertiesSection />

      <div className="container">
        <div className="rule" />
      </div>

      <div className="container sec" id="testimonials">
        <div className="kick">{localize(TESTIMONIALS_HEAD.kick, language)}</div>
        <h2 className="sec-title">{localize(TESTIMONIALS_HEAD.h, language)}</h2>
        <Carousel className="quotes">
          {testimonials.map((testimonial) => (
            <figure className="quote" key={testimonial.id}>
              <p>{localize(testimonial.quote, language)}</p>
              <figcaption className="who">{localize(testimonial.attribution, language)}</figcaption>
            </figure>
          ))}
        </Carousel>
      </div>

      <div className="container">
        <div className="rule" />
      </div>

      <ContactSection />
    </div>
  );
}
