import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PropertiesSection } from "../components/PropertiesSection";
import { ContactSection } from "../components/ContactSection";
import { Carousel } from "../components/Carousel";
import { StepsAccordion } from "../components/StepsAccordion";
import { useTestimonials } from "../data/useSheetData";
import { localize } from "../data/localize";
import { HOME_HERO, HOME_STATS, HOME_STEPS_HEAD, TESTIMONIALS_HEAD } from "../data/content";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import type { SupportedLanguage } from "../i18n";
import type { Persona } from "../data/types";

const OUTLINE_STYLE = { borderColor: "rgba(92,255,122,.5)", color: "#c9f5cd" };

export function Home() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage as SupportedLanguage;
  const { items: testimonials, loading: testimonialsLoading } = useTestimonials();
  const [persona, setPersona] = useState<Persona | null>(null);
  const visibleTestimonials = persona
    ? testimonials.filter((testimonial) => !testimonial.audience || testimonial.audience === persona)
    : testimonials;

  useDocumentMeta({ title: t("meta.title"), description: t("meta.description") });

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
            <Link
              to="/#contact"
              className={`btn ${persona === "buyer" ? "btn-outline" : "btn-neon"}`}
              style={persona === "buyer" ? OUTLINE_STYLE : undefined}
              onClick={() => setPersona("seller")}
            >
              {localize(HOME_HERO.ctaValuation, language)}
            </Link>
            <Link
              to="/#properties"
              className={`btn ${persona === "buyer" ? "btn-neon" : "btn-outline"}`}
              style={persona === "buyer" ? undefined : OUTLINE_STYLE}
              onClick={() => setPersona("buyer")}
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

      {persona !== "buyer" ? (
        <>
          <div className="container sec">
            <div className="sec-head">
              <div>
                <div className="kick">{localize(HOME_STEPS_HEAD.kick, language)}</div>
                <h2>{localize(HOME_STEPS_HEAD.h, language)}</h2>
              </div>
            </div>
            <StepsAccordion language={language} />
          </div>

          <div className="container">
            <div className="rule" />
          </div>
        </>
      ) : null}

      {persona !== "seller" ? (
        <>
          <PropertiesSection />

          <div className="container">
            <div className="rule" />
          </div>
        </>
      ) : null}

      <div className="container sec" id="testimonials">
        <div className="kick">{localize(TESTIMONIALS_HEAD.kick, language)}</div>
        <h2 className="sec-title">{localize(TESTIMONIALS_HEAD.h, language)}</h2>
        <Carousel className="quotes">
          {testimonialsLoading
            ? [0, 1, 2].map((i) => (
                <figure className="quote" key={i} aria-hidden="true">
                  <div className="skeleton-bar" style={{ height: 14, width: "90%" }} />
                  <div className="skeleton-bar" style={{ height: 14, width: "75%", marginTop: 8 }} />
                  <figcaption className="who">
                    <div className="skeleton-bar" style={{ height: 12, width: "40%" }} />
                  </figcaption>
                </figure>
              ))
            : visibleTestimonials.map((testimonial) => (
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

      <ContactSection persona={persona} />
    </div>
  );
}
