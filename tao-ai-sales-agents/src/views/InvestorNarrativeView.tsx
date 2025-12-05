import React, { useState } from "react";
import { Card, Section } from "../components/Layout";
import { copy, Language } from "../copy";
import { useIsMobile } from "../hooks/useIsMobile";
import { styles } from "../styles";

/** ---------------------------
 *  VISTA: NARRATIVA / STRATEGIA (Slide 2)
 *  --------------------------- */
const InvestorNarrativeView: React.FC<{ language: Language }> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<"narrativa" | "bigdata" | "agents">(
    "narrativa"
  );
  const t = copy[language].investorNarrativeView;
  const isMobile = useIsMobile();
  const wrapStyle = { ...styles.wrap, padding: isMobile ? "12px" : styles.wrap.padding };

  return (
    <div data-language={language} style={wrapStyle}>
      <header style={styles.header}>
        <h1 style={styles.h1}>{t.headerTitle}</h1>
      </header>

      <Card style={{ marginBottom: 12 }}>
        <h3 style={styles.h3}>{t.investmentSummaryTitle}</h3>
        <ul style={styles.ul}>
          {t.investmentSummaryItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {([
          { id: "narrativa", label: t.tabs.narrative },
          { id: "bigdata", label: t.tabs.bigdata },
          { id: "agents", label: t.tabs.agents },
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: activeTab === tab.id ? "1px solid #2563eb" : "1px solid #e5e7eb",
              background: activeTab === tab.id ? "#eff6ff" : "#ffffff",
              color: activeTab === tab.id ? "#1d4ed8" : "#111827",
              cursor: "pointer",
              fontWeight: activeTab === tab.id ? 600 : 500,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p style={{ ...styles.pSmall, marginBottom: 12 }}>
        {t.helperText}
      </p>

      {activeTab === "narrativa" && (
        <>
          <Card style={{ marginBottom: 12 }}>
            <p style={styles.p}>{t.descriptions.narrative}</p>
          </Card>

          {/* Resumen */}
          <Section title={t.sectionTitles.summary}>
            <Card>
              <p style={styles.p}>{t.summary}</p>
            </Card>
          </Section>

          {/* Problema */}
          <Section title={t.sectionTitles.problem}>
            <Card>
              <p style={styles.p}>{t.problem.intro}</p>
              <h3 style={styles.h3}>{t.problem.whyNowTitle}</h3>
              <ul style={styles.ul}>
                {t.problem.whyNowItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h4 style={{ ...styles.h3, marginTop: 12 }}>{t.problem.logicTitle}</h4>
              <ol style={styles.ol}>
                {t.problem.logicSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </Card>
          </Section>

          {/* Producto y ventaja */}
          <Section title={t.sectionTitles.product}>
            <div style={styles.grid2}>
              <Card>
                <h3 style={styles.h3}>{t.productAndAdvantage.whatAgentsDo.title}</h3>
                <ul style={styles.ul}>
                  {t.productAndAdvantage.whatAgentsDo.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 style={styles.h3}>{t.productAndAdvantage.whyWin.title}</h3>
                <ul style={styles.ul}>
                  {t.productAndAdvantage.whyWin.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </Section>

          {/* Próximos pasos */}
          <Section title={t.sectionTitles.nextSteps}>
            <Card>
              <ul style={styles.ul}>
                {t.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </Card>
          </Section>

          <Section title={t.sectionTitles.roadmap}>
            <div style={styles.grid3}>
              {t.roadmap.map((bucket) => (
                <Card key={bucket.title}>
                  <h3 style={styles.h3}>{bucket.title}</h3>
                  <ul style={styles.ul}>
                    {bucket.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Section>
        </>
      )}

      {activeTab === "bigdata" && (
        <>
          <Card style={{ marginBottom: 12 }}>
            <p style={styles.p}>{t.descriptions.bigdata}</p>
          </Card>

          {/* ESTRATEGIA BASE DE DATOS 500K+ */}
          <Section title={t.sectionTitles.bigData}>
            {t.bigDataStrategy.cards.map((card, index) => (
              <Card key={card.title} style={index === 0 ? undefined : { marginTop: 12 }}>
                <h3 style={styles.h3}>{card.title}</h3>
                <ul style={styles.ul}>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}

            <Card style={{ marginTop: 12 }}>
              <h3 style={styles.h3}>{t.bigDataStrategy.risks.title}</h3>
              <ul style={styles.ul}>
                {t.bigDataStrategy.risks.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </Section>
        </>
      )}

      {activeTab === "agents" && (
        <>
          <Card style={{ marginBottom: 12 }}>
            <p style={styles.p}>{t.agentsIntro}</p>
          </Card>

          {/* Flujo del agente */}
          <Section title={t.sectionTitles.howAgentsWork}>
            <Card>
              {t.howAgentsWork.intro.map((paragraph) => (
                <p style={styles.p} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </Card>

            <div style={{ ...styles.grid2, marginTop: 12 }}>
              {t.howAgentsWork.agents.map((agent) => (
                <Card key={agent.title} style={styles.agentCard}>
                  <div style={styles.agentPill}>{agent.pill}</div>
                  <h3 style={styles.agentTitle}>{agent.title}</h3>
                  <p style={styles.agentText}>{agent.description}</p>
                  <ul style={styles.ul}>
                    {agent.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Section>

          {/* Ejemplos */}
          <Section title={t.sectionTitles.agentExamples}>
            <div style={styles.grid3}>
              {t.agentExamples.map((example) => (
                <Card style={styles.exampleCard} key={example.step}>
                  <div style={styles.exampleStep}>{example.step}</div>
                  <p style={styles.pSmall}>{example.description}</p>
                </Card>
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  );
};

export default InvestorNarrativeView;
