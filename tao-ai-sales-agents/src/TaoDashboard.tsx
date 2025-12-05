import React, { useState } from "react";
import InvestorModelView from "./views/InvestorModelView";
import InvestorNarrativeView from "./views/InvestorNarrativeView";
import { copy, Language } from "./copy";
import { styles } from "./styles";

const TaoDashboard: React.FC = () => {
  const [tab, setTab] = useState<"model" | "narrative">("model");
  const [language, setLanguage] = useState<Language>("es");
  const t = copy[language];

  return (
    <div style={{ padding: 18 }}>
      <div
        style={{ marginBottom: 12, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}
      >
        <h2 style={{ margin: 0, fontSize: 16 }}>{t.dashboardTitle}</h2>
        <div
          style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}
        >
          <div role="group" aria-label="Seleccionar idioma" style={styles.languageToggle}>
            {(["es", "en"] as const).map((lang) => {
              const isActive = language === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-pressed={isActive}
                  aria-label={lang === "es" ? "Cambiar a Español" : "Switch to English"}
                  style={{
                    ...styles.languageButton,
                    ...(isActive ? styles.languageButtonActive : {}),
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setTab("model")}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: tab === "model" ? "1px solid #2563eb" : "1px solid #e5e7eb",
                background: tab === "model" ? "#eff6ff" : "#ffffff",
                cursor: "pointer",
              }}
            >
              {t.tabs.model}
            </button>
            <button
              type="button"
              onClick={() => setTab("narrative")}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: tab === "narrative" ? "1px solid #2563eb" : "1px solid #e5e7eb",
                background: tab === "narrative" ? "#eff6ff" : "#ffffff",
                cursor: "pointer",
              }}
            >
              {t.tabs.narrative}
            </button>
          </div>
        </div>
      </div>

      <div>
        {tab === "model" && <InvestorModelView language={language} />}
        {tab === "narrative" && <InvestorNarrativeView language={language} />}
      </div>
    </div>
  );
};

export default TaoDashboard;
