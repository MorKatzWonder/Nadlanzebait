import { useTranslation } from "react-i18next";

export type Persona = "buyer" | "seller";

export function PersonaSwitch({
  value,
  onChange,
}: {
  value: Persona | null;
  onChange: (value: Persona | null) => void;
}) {
  const { t } = useTranslation();

  function toggle(next: Persona) {
    onChange(value === next ? null : next);
  }

  return (
    <div className="persona-switch" role="group" aria-label={t("persona.groupLabel")}>
      <button
        type="button"
        className={`persona-switch__btn${value === "buyer" ? " active" : ""}`}
        aria-pressed={value === "buyer"}
        onClick={() => toggle("buyer")}
      >
        {t("persona.buyer")}
      </button>
      <button
        type="button"
        className={`persona-switch__btn${value === "seller" ? " active" : ""}`}
        aria-pressed={value === "seller"}
        onClick={() => toggle("seller")}
      >
        {t("persona.seller")}
      </button>
    </div>
  );
}
