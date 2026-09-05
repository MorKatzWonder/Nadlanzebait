import { useState } from "react";
import { localize } from "../data/localize";
import { HOME_STEPS } from "../data/content";
import { CameraIcon, ChevronDownIcon, ClipboardCheckIcon, DocumentSignIcon } from "./Icons";
import type { SupportedLanguage } from "../i18n";

/** One icon per HOME_STEPS entry, in order: valuation, marketing, negotiation & closing. */
const STEP_ICONS = [ClipboardCheckIcon, CameraIcon, DocumentSignIcon];

export function StepsAccordion({ language }: { language: SupportedLanguage }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="steps">
      {HOME_STEPS.map((step, index) => {
        const Icon = STEP_ICONS[index] ?? ClipboardCheckIcon;
        const isOpen = openIndex === index;
        return (
          <div className="step" key={step.n} data-open={isOpen}>
            <button
              type="button"
              className="step__trigger"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="step__icon">
                <Icon />
              </span>
              <span className="step__title">{localize(step.title, language)}</span>
              <ChevronDownIcon className="step__chevron" />
            </button>
            {isOpen ? <p className="step__body">{localize(step.body, language)}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
