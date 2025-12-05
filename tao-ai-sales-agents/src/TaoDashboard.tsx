import React, { useState } from "react";

type Language = "es" | "en";

const copy: Record<Language, any> = {
  es: {
    dashboardTitle: "TAO Investor Dashboard",
    tabs: {
      model: "Modelo financiero",
      narrative: "Narrativa y estrategia",
    },
    model: {
      headerTitle: "Vista para Inversionistas — Modelo financiero",
      heroSubtitle:
        "AI-first sales engine converting international demand for TAO land and condos into high-margin commissions, launching in Riviera Maya and expanding to Baja California.",
      heroNote:
        "Ajusta cierres por año, supuestos comerciales, Brainium y equipo. El modelo recalcula GMV, comisiones, márgenes y caja en tiempo real.",
      glossaryTitle: "Justificación de valores iniciales.",
      glossaryItems: [
        "ASP (USD 225k): ticket medio histórico de ventas de tierra y condo en Riviera Maya (mix de unidades entre USD 180k–260k), consistente con el pipeline actual.",
        "Captura mezclada (3.65%): promedio ponderado entre proyectos con comisión del 3% y desarrollos con estructura 4–5%, asumiendo 70% inventario directo y 30% co-broker.",
        "Tasa de cierre (2%): ratio observado en campañas digitales pasadas (1.6%–2.2%) sobre leads calificados, conservador para un primer año con nuevos flujos de nurturing.",
        "CPL mezclado (USD 30): mezcla de canales orgánicos y pagados (SEM, sociales y referidos) que han oscilado entre USD 18–40 por lead en pruebas recientes.",
        "Cierres Y1/Y2/Y3 (180 / 400 / 650): deriva de la capacidad del equipo (2 analistas + brokers externos) y ramp-up trimestral: ~15 cierres mensuales promedio en Y1, duplicando productividad con mayor inventario y automatización en Y2–Y3.",
      ],
      metricsGlossary: [
        "ASP: ticket medio por unidad vendida (USD) sobre el cual se calcula el GMV.",
        "Captura mezclada: comisión promedio aplicada al GMV para estimar ingresos.",
        "Tasa de cierre: porcentaje de leads calificados que terminan en un cierre.",
        "CPL mezclado: costo promedio por lead considerando canales pagados y orgánicos.",
        "Cierres Y1/Y2/Y3: metas de transacciones anuales que impulsan el GMV.",
      ],
      howToReadTitle: "Cómo leer este modelo",
      howToReadPoints: [
        "Ajusta los supuestos comerciales, de cierres y de equipo en los controles para ver los impactos en GMV, ingresos y caja en tiempo real.",
        "Compara la tabla P&L base y la tabla de sensibilidad para ver cómo cambian márgenes, salarios y utilidades netas por escenario.",
        "El flujo de caja Y1 asume 3 meses sin ventas y 9 meses con cierres; la cifra de \"mes caja positiva\" refleja cuándo el acumulado vuelve a cero.",
      ],
      howToReadDisclaimer:
        "Este modelo es ilustrativo y depende de supuestos; no constituye una proyección garantizada ni una oferta vinculante.",
      controlsTitle: "Controles del modelo",
      controlsRealtimeNote: "Los cambios se aplican en tiempo real al P&L y a la caja.",
      resetButton: "Restablecer valores iniciales",
      controlGroups: {
        commercial: {
          title: "Supuestos comerciales",
          aspLabel: "ASP (USD)",
          aspHelp: "Ticket promedio por operación; USD 180k–260k es común para lotes y condos.",
          captureLabel: "Captura mezclada (%)",
          captureHelp:
            "Mezcla ponderada de comisiones para estimar ingresos; 3%–5% es típico según inventario y acuerdos.",
          closeRateLabel: "Tasa de cierre (%)",
          closeRateHelp:
            "Porcentaje de leads calificados que cierran; 1.5%–2.5% es coherente con funnels similares.",
          cplLabel: "CPL mezclado (USD)",
          cplHelp:
            "Costo por lead promedio considerando canales pagados y orgánicos; USD 20–40 es rango de referencia.",
          closingsLabel: "Cierres por año",
          closingsGroupTitle: "Cierres esperados por año",
          closingsHelp:
            "Metas anuales de cierres que impulsan el GMV; puedes simular ramp-up o escenarios conservadores.",
          closingHelpY1:
            "Meta de transacciones en el año; decenas de cierres generan GMV de {gmv} con el ASP indicado.",
          closingHelpY2: "Escala anual proyectada; con este ASP, el GMV de referencia es {gmv}.",
          closingHelpY3: "Proyección de cierres con madurez del funnel; el GMV estimado es {gmv}.",
        },
        team: {
          title: "Equipo (sueldos y hires por año)",
          intro:
            "Define el rol, sueldo mensual y año de contratación (Y0 = contratado antes de Y1).",
          salaryHelp:
            "Sueldos anuales según equipo activo: Y1 = {y1} · Y2 = {y2} · Y3 = {y3}.",
          srLabel: "Sr Analyst (hire por año)",
          jrLabel: "Jr Analyst (hire por año)",
          gmLabel: "Activar GM",
          gmHelp: "General Manager enfocado en estrategia y coordinación comercial.",
          defaultOption: "Seleccione año",
          srTitle: "Sr. Analyst",
          jrTitle: "Jr. Analyst",
          salaryLabel: "Sueldo (USD/mes)",
          salaryHelpSr: "Salario mensual bruto; perfiles senior en MX suelen estar en USD 3k–5k.",
          salaryHelpJr: "Salario mensual bruto; perfiles junior suelen estar en USD 1.8k–2.8k.",
          countLabel: "¿Cuántos contratas?",
          srCountHelp: "Define la cantidad de contrataciones para este rol; 0–2 suele ser realista en arranque.",
          jrCountHelp:
            "Ajusta el número de analistas junior; arrancar con 0–2 mantiene la estructura ligera.",
          yearLabel: "¿En qué año los contratas?",
        },
        brainium: {
          title: "Brainium (consultor externo)",
          monthlyLabel: "Fee mensual primeros {months} meses (USD)",
          monthlyHelp: "Retainer mensual inicial; suele estar entre USD 5k–10k según alcance.",
          successLabel: "Success fee mes 7 (USD)",
          successHelp: "Bono único por implementación exitosa; entre USD 5k–15k es típico.",
          revshareLabel: "% comisión sobre ingresos por comisiones (rev-share)",
          revshareHelp: "Porcentaje variable sobre ingresos de comisión; rangos de 5%–15% son comunes.",
          totalsHelp:
            "Asumimos que el % de comisión aplica a los primeros 3 años. Totales Brainium (retainer + success fee + rev-share): Y1 = {y1} · Y2 = {y2} · Y3 = {y3}.",
        },
      },
      keyStats: {
        closings: "Cierres Y1 (escenario base)",
        commissionRevenue: "Ingresos por comisiones Y1",
        netIncome: "Utilidad neta Y1",
        cashMonth: "Mes caja positiva",
        asp: "ASP",
        capture: "Captura mezclada",
        closeAndCpl: "Tasa de cierre / CPL",
        salaries: "Sueldos anuales Y1",
      },
      monthPositive: (month: number) =>
        month > 0 ? `Mes ${month}` : "No positivo en Y1",
      sectionTitles: {
        teamDashboard: "Dashboard de equipo (selección actual)",
        unitEconomics: "Unit economics Y1 (escenario base)",
        pnl: "P&L 36 meses (escenario base)",
        sensitivity: "Sensibilidad Y3 (Downside / Base / Upside)",
        cash: "Caja año 1 y necesidad de capital",
      },
      teamTableEmpty: "Activa al menos un miembro para ver la tabla.",
      unitEconomicsRows: {
        commission: "Ingreso promedio por comisión por cierre",
        acquisition: "Costo de adquisición por cierre",
        contribution: "Contribución neta por cierre",
      },
      teamTableHeaders: [
        "Nombre",
        "Rol",
        "Año de contratación",
        "Sueldo (USD/mes)",
        "Funciones principales",
      ],
      pnlHeaders: [
        "Año",
        "Cierres",
        "GMV",
        "Leads",
        "Medios (marketing)",
        "Ingresos comisión",
        "Broker (25%)",
        "Sueldos",
        "Overhead",
        "Neto",
        "Margen neto (sobre comisión)",
      ],
      sensitivityHeaders: [
        "Escenario",
        "Cierres",
        "Captura mezclada",
        "Tasa cierre / CPL",
        "GMV",
        "Leads / Medios (marketing)",
        "Ingresos comisión",
        "Broker (25%)",
        "Sueldos+OH",
        "Neto",
        "Margen neto (sobre comisión)",
      ],
      cashSummaryTitle: "Resumen de caja",
      cashSummary: {
        burn: "Burn mensual M1–M3 (sin ventas):",
        net: "Utilidad neta mensual promedio M4–M12:",
        deficit: "Déficit acumulado máximo:",
        turn: "Punto de caja positiva: alrededor de mes",
      },
      cashChartTitle: "Caja acumulada (meses 1–12)",
      howToReadMetricNote:
        "AI-first sales engine converting international demand for TAO land and condos into high-margin commissions, launching in Riviera Maya and expanding to Baja California.",
    },
    narrative: {
      headerTitle: "Vista para Inversionistas — Narrativa y estrategia comercial",
      investmentSummaryTitle: "Investment summary",
      investmentSummaryItems: [
        "Stage: internal venture within TAO / pre-seed.",
        "Focus: AI Sales Agents to sell and rent TAO inventory (Riviera Maya + Baja).",
        "Revenue model: commissions on closings + potential developer fees.",
        "Use of capital: fund 12–18 months of ops/product (keep text editable, no exact amounts).",
      ],
      helperText:
        "Narrativa y Estrategia → visión y modelo de negocio. Big Data → estrategia de 80k leads actuales + 300k–500k nuevos. AI Sales Agents → cómo operan los agentes en el día a día.",
      tabs: {
        narrative: "Narrativa y Estrategia",
        bigdata: "Big Data",
        agents: "AI Sales Agents",
      },
      descriptions: {
        narrative:
          "Estamos creando una operación comercial centrada en datos y agentes de IA que identifican, nutren y escalan a brokers sólo cuando hay alta probabilidad de cierre, reduciendo costos y acelerando conversiones.",
        bigdata:
          "El plan es limpiar y enriquecer la base de 80k contactos, reactivarlos con agentes de IA y crecerla a 500k+ prospectos cualificados mediante data partners, audiencias por intención y contenidos enfocados en Baja y Riviera Maya.",
      },
      sectionTitles: {
        summary: "Resumen en una línea",
        problem: "Problema y por qué ahora",
        product: "Producto y ventaja competitiva",
        nextSteps: "Próximos pasos",
        roadmap: "Roadmap 0–24 meses",
        bigData: "Estrategia para construir una base de datos de 500,000+ compradores extranjeros",
        howAgentsWork: "Cómo funciona el Agente de Ventas de IA",
        agentExamples: "Ejemplos de Agentes de Ventas de IA desplegados (experiencia del comprador)",
      },
      agentTabs: {
        narrative: "Narrativa y Estrategia",
        bigdata: "Big Data",
        agents: "AI Sales Agents",
      },
    },
  },
  en: {
    dashboardTitle: "TAO Investor Dashboard",
    tabs: {
      model: "Financial model",
      narrative: "Narrative & strategy",
    },
    model: {
      headerTitle: "Investor View — Financial model",
      heroSubtitle:
        "AI-first sales engine converting international demand for TAO land and condos into high-margin commissions, launching in Riviera Maya and expanding to Baja California.",
      heroNote:
        "Adjust annual closings, commercial assumptions, Brainium fees, and team. The model recalculates GMV, commissions, margins, and cash in real time.",
      glossaryTitle: "Rationale for initial values.",
      glossaryItems: [
        "ASP (USD 225k): historic average ticket for land and condos in Riviera Maya (mix between USD 180k–260k), consistent with the current pipeline.",
        "Blended capture (3.65%): weighted average between 3% projects and 4–5% structures, assuming 70% direct inventory and 30% co-broker.",
        "Close rate (2%): ratio seen in past digital campaigns (1.6%–2.2%) on qualified leads, conservative for a first year with new nurturing flows.",
        "Blended CPL (USD 30): mix of organic and paid channels (SEM, social, referrals) typically ranging USD 18–40 per lead in recent tests.",
        "Closings Y1/Y2/Y3 (180 / 400 / 650): tied to team capacity (2 analysts + external brokers) and quarterly ramp: ~15 monthly closes in Y1, doubling with more inventory and automation in Y2–Y3.",
      ],
      metricsGlossary: [
        "ASP: average selling price (USD) used to calculate GMV.",
        "Blended capture: average commission applied to GMV to estimate revenue.",
        "Close rate: percentage of qualified leads that end up closing.",
        "Blended CPL: average cost per lead across paid and organic.",
        "Closings Y1/Y2/Y3: annual transaction goals that drive GMV.",
      ],
      howToReadTitle: "How to read this model",
      howToReadPoints: [
        "Adjust commercial, closing, and team assumptions in the controls to see real-time impact on GMV, revenue, and cash.",
        "Compare the base P&L and sensitivity tables to see how margins, salaries, and net income change per scenario.",
        "Cash flow assumes 3 months with no sales and 9 months with closings; the \"positive cash month\" indicates when cumulative returns to zero.",
      ],
      howToReadDisclaimer:
        "This model is illustrative and assumption-driven; it is not a guaranteed projection or binding offer.",
      controlsTitle: "Model controls",
      controlsRealtimeNote: "Changes apply in real time to P&L and cash.",
      resetButton: "Reset to defaults",
      controlGroups: {
        commercial: {
          title: "Commercial assumptions",
          aspLabel: "ASP (USD)",
          aspHelp: "Average ticket per deal; USD 180k–260k is common for lots and condos.",
          captureLabel: "Blended capture (%)",
          captureHelp:
            "Weighted commission mix to estimate revenue; 3%–5% is typical depending on inventory and agreements.",
          closeRateLabel: "Close rate (%)",
          closeRateHelp:
            "Percentage of qualified leads that close; 1.5%–2.5% aligns with similar funnels.",
          cplLabel: "Blended CPL (USD)",
          cplHelp:
            "Average cost per lead across paid and organic channels; USD 20–40 is a reference range.",
          closingsLabel: "Closings per year",
          closingsGroupTitle: "Expected closings per year",
          closingsHelp:
            "Annual closing goals driving GMV; simulate ramp-up or conservative scenarios.",
          closingHelpY1:
            "Annual transaction goal; dozens of closings generate GMV of {gmv} with the stated ASP.",
          closingHelpY2: "Projected annual scale; at this ASP, reference GMV is {gmv}.",
          closingHelpY3: "Closing projection with a mature funnel; estimated GMV is {gmv}.",
        },
        team: {
          title: "Team (salaries and hiring per year)",
          intro:
            "Define role, monthly salary, and hire year (Y0 = hired before Y1).",
          salaryHelp:
            "Annual salaries by active team: Y1 = {y1} · Y2 = {y2} · Y3 = {y3}.",
          srLabel: "Sr Analyst (hire by year)",
          jrLabel: "Jr Analyst (hire by year)",
          gmLabel: "Activate GM",
          gmHelp: "General Manager focused on strategy and commercial coordination.",
          defaultOption: "Select year",
          srTitle: "Sr. Analyst",
          jrTitle: "Jr. Analyst",
          salaryLabel: "Salary (USD/mo)",
          salaryHelpSr: "Gross monthly salary; senior profiles in MX often range USD 3k–5k.",
          salaryHelpJr: "Gross monthly salary; junior profiles often range USD 1.8k–2.8k.",
          countLabel: "How many do you hire?",
          srCountHelp: "Define the number of hires for this role; 0–2 is realistic to start.",
          jrCountHelp: "Adjust junior analyst hires; starting with 0–2 keeps the org lean.",
          yearLabel: "In which year do you hire them?",
        },
        brainium: {
          title: "Brainium (external consultant)",
          monthlyLabel: "Monthly fee first {months} months (USD)",
          monthlyHelp: "Initial monthly retainer; often USD 5k–10k depending on scope.",
          successLabel: "Success fee month 7 (USD)",
          successHelp: "One-time bonus for successful implementation; USD 5k–15k is typical.",
          revshareLabel: "% commission on commission revenue (rev-share)",
          revshareHelp: "Variable percentage on commission revenue; 5%–15% is common.",
          totalsHelp:
            "Assumes % commission applies for the first 3 years. Brainium totals (retainer + success fee + rev-share): Y1 = {y1} · Y2 = {y2} · Y3 = {y3}.",
        },
      },
      keyStats: {
        closings: "Closings Y1 (base)",
        commissionRevenue: "Commission revenue Y1",
        netIncome: "Net income Y1",
        cashMonth: "Positive cash month",
        asp: "ASP",
        capture: "Blended capture",
        closeAndCpl: "Close rate / CPL",
        salaries: "Annual salaries Y1",
      },
      monthPositive: (month: number) => (month > 0 ? `Month ${month}` : "Not positive in Y1"),
      sectionTitles: {
        teamDashboard: "Team dashboard (current selection)",
        unitEconomics: "Unit economics Y1 (base scenario)",
        pnl: "P&L 36 months (base scenario)",
        sensitivity: "Y3 sensitivity (Downside / Base / Upside)",
        cash: "Year-1 cash and capital needs",
      },
      teamTableEmpty: "Activate at least one team member to view the table.",
      unitEconomicsRows: {
        commission: "Average commission revenue per closing",
        acquisition: "Acquisition cost per closing",
        contribution: "Net contribution per closing",
      },
      teamTableHeaders: [
        "Name",
        "Role",
        "Hire year",
        "Salary (USD/mo)",
        "Primary functions",
      ],
      pnlHeaders: [
        "Year",
        "Closings",
        "GMV",
        "Leads",
        "Media (marketing)",
        "Commission revenue",
        "Broker (25%)",
        "Salaries",
        "Overhead",
        "Net",
        "Net margin (on commission)",
      ],
      sensitivityHeaders: [
        "Scenario",
        "Closings",
        "Blended capture",
        "Close rate / CPL",
        "GMV",
        "Leads / Media (marketing)",
        "Commission revenue",
        "Broker (25%)",
        "Salaries+OH",
        "Net",
        "Net margin (on commission)",
      ],
      cashSummaryTitle: "Cash summary",
      cashSummary: {
        burn: "Monthly burn M1–M3 (no sales):",
        net: "Avg. net income per month M4–M12:",
        deficit: "Max cumulative deficit:",
        turn: "Positive cash point: around month",
      },
      cashChartTitle: "Cumulative cash (months 1–12)",
      howToReadMetricNote:
        "AI-first sales engine converting international demand for TAO land and condos into high-margin commissions, launching in Riviera Maya and expanding to Baja California.",
    },
    narrative: {
      headerTitle: "Investor View — Narrative and commercial strategy",
      investmentSummaryTitle: "Investment summary",
      investmentSummaryItems: [
        "Stage: internal venture within TAO / pre-seed.",
        "Focus: AI Sales Agents to sell and rent TAO inventory (Riviera Maya + Baja).",
        "Revenue model: commissions on closings + potential developer fees.",
        "Use of capital: fund 12–18 months of ops/product (keep text editable, no exact amounts).",
      ],
      helperText:
        "Narrative & Strategy → vision and business model. Big Data → strategy for 80k existing leads + 300k–500k new. AI Sales Agents → how agents operate day to day.",
      tabs: {
        narrative: "Narrative & Strategy",
        bigdata: "Big Data",
        agents: "AI Sales Agents",
      },
      descriptions: {
        narrative:
          "We are building a data-driven commercial operation with AI agents that identify, nurture, and only escalate to brokers when the probability of closing is high, reducing costs and accelerating conversions.",
        bigdata:
          "Plan: clean and enrich the 80k-contact base, reactivate via AI agents, and grow it to 500k+ qualified prospects through data partners, intent audiences, and content focused on Baja and Riviera Maya.",
      },
      sectionTitles: {
        summary: "One-line summary",
        problem: "Problem and why now",
        product: "Product and competitive advantage",
        nextSteps: "Next steps",
        roadmap: "Roadmap 0–24 months",
        bigData: "Strategy to build a database of 500,000+ foreign buyers",
        howAgentsWork: "How the AI Sales Agent works",
        agentExamples: "Examples of deployed AI Sales Agents (buyer experience)",
      },
      agentTabs: {
        narrative: "Narrative & Strategy",
        bigdata: "Big Data",
        agents: "AI Sales Agents",
      },
    },
  },
};

/**
 * TaoDashboard.tsx
 *
 * Unifica los dos "slides" en un solo componente/página React + TypeScript.
 * - Sección "Modelo financiero" = todo el Slide 1 (lógica y UI).
 * - Sección "Narrativa y estrategia" = todo el Slide 2 (contenido, tablas, texto).
 *
 * La UI está organizada en pestañas (tabs). Mantengo toda la lógica de cálculo sin cambios.
 */

/** ---------------------------
 *  UTILIDADES
 *  --------------------------- */
const usd0 = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const pct1 = (n: number) => `${(n * 100).toFixed(1)}%`;

type PnLYear = {
  year: number;
  closings: number;
  gmv: number;
  leads: number;
  media: number;
  commissionRevenue: number;
  brokerShare: number;
  salaries: number;
  overhead: number;
  net: number;
  netMarginOnRev: number;
};

type Sensitivity = {
  name: "Downside" | "Base" | "Upside";
  closings: number;
  blendedCapture: number;
  closeRate: number;
  cpl: number;
  gmv: number;
  leads: number;
  media: number;
  commissionRevenue: number;
  brokerShare: number;
  salariesPlusOH: number;
  net: number;
  netMarginOnRev: number;
};

type TeamRole = "GM" | "Sr Analyst" | "Jr Analyst";
type HireYear = "Y0" | "Y1" | "Y2" | "Y3";

type TeamMember = {
  id: string;
  name: string;
  title: string;
  role: TeamRole;
  monthlySalary: number;
  hireYear: HireYear;
  active: boolean;
};

/** ---------------------------
 *  CONSTANTES
 *  --------------------------- */
const BROKER_SHARE_RATE = 0.25;
// Sueldos base (Luis = 0; AI Sr + AI Spec sí cuentan)
const GM_MONTHLY_SALARY = 0;
const AI_SR_MONTHLY_SALARY = 4_000;
const AI_SPEC_MONTHLY_SALARY = 2_500;

// Overhead
const OVERHEAD_RENT = 36_000;
const OVERHEAD_TRAVEL = 24_000;
const OVERHEAD_LEGAL = 24_000;
const OVERHEAD_OTHER = 12_000;
const OVERHEAD_ANNUAL = OVERHEAD_RENT + OVERHEAD_TRAVEL + OVERHEAD_LEGAL + OVERHEAD_OTHER;

// Cierres base (para derivar GMV)
const BASE_CLOSINGS = [180, 400, 650];

// Brainium: solo meses, el monto va en la UI
const BRAINIUM_FEE_MONTHS = 6;

// Equipo
const HIRE_YEARS: HireYear[] = ["Y0", "Y1", "Y2", "Y3"];
const HIRE_YEAR_ORDER: Record<HireYear, number> = {
  Y0: 0,
  Y1: 1,
  Y2: 2,
  Y3: 3,
};

const GM_MEMBER: TeamMember = {
  id: "gm",
  name: "Luis (GM)",
  title: "General Manager",
  role: "GM",
  monthlySalary: GM_MONTHLY_SALARY,
  hireYear: "Y1",
  active: true,
};

const DEFAULT_SR_HIRES: HireYear[] = ["Y1"];
const DEFAULT_JR_HIRES: HireYear[] = ["Y1"];
const MAX_HIRES_PER_ROLE = 3;

const ROLE_DESCRIPTIONS: Record<TeamRole, string> = {
  GM: "Dirige estrategia, alianzas y coordinación con desarrolladores y brokers.",
  "Sr Analyst":
    "Lidera el motor de demanda y analítica, optimiza procesos y da seguimiento a cierres.",
  "Jr Analyst":
    "Opera seguimiento diario a leads, agenda visitas y apoya a los agentes de IA.",
};

// Caja
const MONTHS_PRE_SALES = 3;
const MONTHS_POST_SALES = 12 - MONTHS_PRE_SALES;

/** ---------------------------
 *  COMPONENTES UI REUSABLES
 *  --------------------------- */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section style={styles.section}>
    <h2 style={styles.h2}>{title}</h2>
    {children}
  </section>
);

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => <div style={{ ...styles.card, ...style }}>{children}</div>;

const KeyStat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={styles.keystat}>
    <div style={styles.keystatValue}>{value}</div>
    <div style={styles.keystatLabel}>{label}</div>
  </div>
);

const Table: React.FC<{ headers: string[]; rows: (string | number)[][] }> = ({
  headers,
  rows,
}) => (
  <div style={{ overflowX: "auto" }}>
    <table style={styles.table}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={styles.th}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} style={styles.td}>
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** ---------------------------
 *  GRÁFICA CAJA
 *  --------------------------- */
const CashChart: React.FC<{
  data: number[];
  height?: number;
  width?: number;
  title?: string;
}> = ({ data, height = 260, width = 720, title }) => {
  const pad = { top: 24, right: 24, bottom: 36, left: 64 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const minY = Math.min(0, Math.min(...data));
  const maxY = Math.max(0, Math.max(...data));
  const yPad = (maxY - minY) * 0.1 || 1;
  const y0 = minY - yPad;
  const y1 = maxY + yPad;

  const x = (i: number) => pad.left + (i / (data.length - 1)) * innerW;
  const y = (v: number) => pad.top + innerH - ((v - y0) / (y1 - y0)) * innerH;

  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`)
    .join(" ");

  const zeroY = y(0);
  const xTicks = data.map((_, i) => i + 1);
  const yTicks = 5;
  const yTickVals = Array.from({ length: yTicks }, (_, i) => y0 + (i * (y1 - y0)) / (yTicks - 1));
  const localMaxDeficit = Math.min(...data);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={styles.svg}>
      {title && (
        <text x={pad.left} y={18} fontSize={14} fontWeight={600} fill="#1f2937">
          {title}
        </text>
      )}
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={height - pad.bottom} stroke="#e5e7eb" />
      <line
        x1={pad.left}
        y1={height - pad.bottom}
        x2={width - pad.right}
        y2={height - pad.bottom}
        stroke="#e5e7eb"
      />
      <line
        x1={pad.left}
        y1={zeroY}
        x2={width - pad.right}
        y2={zeroY}
        stroke="#9ca3af"
        strokeDasharray="4 4"
      />
      {yTickVals.map((v, idx) => (
        <g key={idx}>
          <text x={pad.left - 8} y={y(v) + 4} fontSize={11} textAnchor="end" fill="#6b7280">
            {usd0(v)}
          </text>
          <line x1={pad.left} y1={y(v)} x2={width - pad.right} y2={y(v)} stroke="#f3f4f6" />
        </g>
      ))}
      {xTicks.map((m, idx) => (
        <g key={idx}>
          <text
            x={x(idx)}
            y={height - pad.bottom + 16}
            fontSize={11}
            textAnchor="middle"
            fill="#6b7280"
          >
            {m}
          </text>
        </g>
      ))}
      <path
        d={[
          `M ${pad.left} ${zeroY}`,
          ...data.map((v, i) => `L ${x(i)} ${Math.max(y(v), zeroY)}`),
          `L ${pad.left + innerW} ${zeroY}`,
          "Z",
        ].join(" ")}
        fill="#fee2e2"
      />
      <path d={path} fill="none" stroke="#2563eb" strokeWidth={2} />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} fill="#2563eb" />
      ))}
      <g>
        <circle cx={x(2)} cy={y(data[2])} r={4.5} fill="#ef4444" />
        <text x={x(2) + 8} y={y(data[2]) - 8} fontSize={12} fill="#ef4444">
          Déficit máximo {usd0(localMaxDeficit)}
        </text>
      </g>
    </svg>
  );
};

/** ---------------------------
 *  VISTA: MODELO FINANCIERO (Slide 1)
 *  --------------------------- */
const InvestorModelView: React.FC<{ language: Language }> = ({ language }) => {
  const t = copy[language].model;
  // Defaults comerciales
  const DEFAULT_ASP = 225_000;
  const DEFAULT_CAPTURE_PCT = 3.65;
  const DEFAULT_CLOSE_PCT = 2.0;
  const DEFAULT_CPL = 30;

  // Defaults cierres / GMV
  const DEFAULT_CLOSINGS_Y1 = BASE_CLOSINGS[0];
  const DEFAULT_CLOSINGS_Y2 = BASE_CLOSINGS[1];
  const DEFAULT_CLOSINGS_Y3 = BASE_CLOSINGS[2];

  // Brainium
  const DEFAULT_BRAINIUM_MONTHLY_FEE = 10_000;
  const DEFAULT_BRAINIUM_SUCCESS_FEE = 0;
  const DEFAULT_BRAINIUM_REVSHARE_PCT = 0;

  // Estado comercial
  const [asp, setAsp] = useState<number>(DEFAULT_ASP);
  const [capturePct, setCapturePct] = useState<number>(DEFAULT_CAPTURE_PCT);
  const [closePct, setClosePct] = useState<number>(DEFAULT_CLOSE_PCT);
  const [cpl, setCpl] = useState<number>(DEFAULT_CPL);

  // Estado cierres por año (controla GMV)
  const [closingsY1, setClosingsY1] = useState<number>(DEFAULT_CLOSINGS_Y1);
  const [closingsY2, setClosingsY2] = useState<number>(DEFAULT_CLOSINGS_Y2);
  const [closingsY3, setClosingsY3] = useState<number>(DEFAULT_CLOSINGS_Y3);

  // Brainium
  const [brainiumMonthlyFee, setBrainiumMonthlyFee] = useState<number>(
    DEFAULT_BRAINIUM_MONTHLY_FEE
  );
  const [brainiumSuccessFee, setBrainiumSuccessFee] = useState<number>(
    DEFAULT_BRAINIUM_SUCCESS_FEE
  );
  const [brainiumRevSharePct, setBrainiumRevSharePct] = useState<number>(
    DEFAULT_BRAINIUM_REVSHARE_PCT
  );

  // Equipo (GM fijo + analistas configurables)
  const [srAnalystHires, setSrAnalystHires] = useState<HireYear[]>([...DEFAULT_SR_HIRES]);
  const [jrAnalystHires, setJrAnalystHires] = useState<HireYear[]>([...DEFAULT_JR_HIRES]);
  const [srAnalystSalary, setSrAnalystSalary] = useState<number>(AI_SR_MONTHLY_SALARY);
  const [jrAnalystSalary, setJrAnalystSalary] = useState<number>(AI_SPEC_MONTHLY_SALARY);

  // Reset
  const handleReset = () => {
    setAsp(DEFAULT_ASP);
    setCapturePct(DEFAULT_CAPTURE_PCT);
    setClosePct(DEFAULT_CLOSE_PCT);
    setCpl(DEFAULT_CPL);

    setClosingsY1(DEFAULT_CLOSINGS_Y1);
    setClosingsY2(DEFAULT_CLOSINGS_Y2);
    setClosingsY3(DEFAULT_CLOSINGS_Y3);

    setBrainiumMonthlyFee(DEFAULT_BRAINIUM_MONTHLY_FEE);
    setBrainiumSuccessFee(DEFAULT_BRAINIUM_SUCCESS_FEE);
    setBrainiumRevSharePct(DEFAULT_BRAINIUM_REVSHARE_PCT);

    setSrAnalystHires([...DEFAULT_SR_HIRES]);
    setJrAnalystHires([...DEFAULT_JR_HIRES]);
    setSrAnalystSalary(AI_SR_MONTHLY_SALARY);
    setJrAnalystSalary(AI_SPEC_MONTHLY_SALARY);
  };

  const adjustHireCount = (hires: HireYear[], count: number) => {
    if (count < hires.length) return hires.slice(0, count);
    const lastYear = hires[hires.length - 1] || "Y1";
    return [...hires, ...Array.from({ length: count - hires.length }, () => lastYear)];
  };

  const buildTeamMembers = (): TeamMember[] => {
    const srMembers: TeamMember[] = srAnalystHires.map((year, idx) => ({
      id: `sr-analyst-${idx + 1}`,
      name: `Sr Analyst ${idx + 1}`,
      title: "Sr Analyst",
      role: "Sr Analyst",
      monthlySalary: srAnalystSalary,
      hireYear: year,
      active: true,
    }));

    const jrMembers: TeamMember[] = jrAnalystHires.map((year, idx) => ({
      id: `jr-analyst-${idx + 1}`,
      name: `Jr Analyst ${idx + 1}`,
      title: "Jr Analyst",
      role: "Jr Analyst",
      monthlySalary: jrAnalystSalary,
      hireYear: year,
      active: true,
    }));

    return [GM_MEMBER, ...srMembers, ...jrMembers];
  };

  // Derivados
  const capture = capturePct / 100;
  const closeRate = closePct / 100;
  const effectiveCloseRate = Math.max(closeRate, 0.0001);

  const brainiumRevShareRate = brainiumRevSharePct / 100;
  const brainiumFeeY1 = brainiumMonthlyFee * BRAINIUM_FEE_MONTHS;
  const overheadY1 = OVERHEAD_ANNUAL + brainiumFeeY1 + brainiumSuccessFee;

  const teamMembers = buildTeamMembers();
  const activeTeamMembers = teamMembers.filter((member) => member.active);

  const monthlySalariesByYear = [1, 2, 3].map((yearNumber) =>
    activeTeamMembers.reduce((sum, member) => {
      return HIRE_YEAR_ORDER[member.hireYear] <= yearNumber
        ? sum + member.monthlySalary
        : sum;
    }, 0)
  );

  const [monthlySalariesY1, monthlySalariesY2, monthlySalariesY3] =
    monthlySalariesByYear;

  const SALARIES_Y1 = monthlySalariesY1 * 12;
  const SALARIES_Y2 = monthlySalariesY2 * 12;
  const SALARIES_Y3 = monthlySalariesY3 * 12;

  const closingsByYear = [closingsY1, closingsY2, closingsY3];
  const salariesByYear = [SALARIES_Y1, SALARIES_Y2, SALARIES_Y3];

  /** ---- P&L 3 AÑOS (BASE) ---- */
  const basePnL: PnLYear[] = closingsByYear.map((closings, idx) => {
    const year = idx + 1;
    const gmv = closings * asp;
    const leads = Math.round(closings / effectiveCloseRate);
    const media = leads * cpl;

    const commissionRevenue = gmv * capture;
    const brokerShare = commissionRevenue * BROKER_SHARE_RATE;
    const salaries = salariesByYear[idx];
    const overhead = year === 1 ? overheadY1 : OVERHEAD_ANNUAL;
    const brainiumRevShare = commissionRevenue * brainiumRevShareRate;

    const net = commissionRevenue - media - brokerShare - salaries - overhead - brainiumRevShare;
    const netMarginOnRev = commissionRevenue === 0 ? 0 : net / commissionRevenue;

    return {
      year,
      closings,
      gmv,
      leads,
      media,
      commissionRevenue,
      brokerShare,
      salaries,
      overhead,
      net,
      netMarginOnRev,
    };
  });

  const [y1] = basePnL;

  const closingsSafe = y1.closings > 0 ? y1.closings : 1;
  const commissionPerClosing = y1.commissionRevenue / closingsSafe;
  const mediaPerClosing = y1.media / closingsSafe;
  const netPerClosing = y1.net / closingsSafe;

  const brainiumRevShareByYear = basePnL.map(
    (year) => year.commissionRevenue * brainiumRevShareRate
  );
  const [brainiumRevShareY1, brainiumRevShareY2, brainiumRevShareY3] =
    brainiumRevShareByYear;

  const brainiumTotalY1 = brainiumFeeY1 + brainiumSuccessFee + brainiumRevShareY1;
  const brainiumTotalY2 = brainiumRevShareY2;
  const brainiumTotalY3 = brainiumRevShareY3;

  const teamDashboardRows = activeTeamMembers.map((member) => [
    member.name,
    member.role,
    member.hireYear,
    usd0(member.monthlySalary),
    ROLE_DESCRIPTIONS[member.role],
  ]);

  /** ---- SENSIBILIDAD Y3 ---- */
  const sensitivity: Sensitivity[] = (
    [
      {
        name: "Downside",
        closings: 450,
        blendedCapture: 0.03,
        closeRate: 0.015,
        cpl: 50,
        gmv: 0,
        leads: 0,
        media: 0,
        commissionRevenue: 0,
        brokerShare: 0,
        salariesPlusOH: 0,
        net: 0,
        netMarginOnRev: 0,
      },
      {
        name: "Base",
        closings: closingsY3, // usamos los cierres de Y3 actuales
        blendedCapture: capture,
        closeRate: effectiveCloseRate,
        cpl,
        gmv: 0,
        leads: 0,
        media: 0,
        commissionRevenue: 0,
        brokerShare: 0,
        salariesPlusOH: 0,
        net: 0,
        netMarginOnRev: 0,
      },
      {
        name: "Upside",
        closings: 900,
        blendedCapture: 0.043,
        closeRate: 0.03,
        cpl: 25,
        gmv: 0,
        leads: 0,
        media: 0,
        commissionRevenue: 0,
        brokerShare: 0,
        salariesPlusOH: 0,
        net: 0,
        netMarginOnRev: 0,
      },
    ] as const
  ).map((s) => {
    const gmv = s.closings * asp;
    const leads = Math.round(s.closings / Math.max(s.closeRate, 0.0001));
    const media = Math.round(leads * s.cpl);
    const commissionRevenue = gmv * s.blendedCapture;
    const brokerShare = commissionRevenue * BROKER_SHARE_RATE;
    const salariesPlusOH = SALARIES_Y3 + OVERHEAD_ANNUAL;
    const brainiumRevShare = commissionRevenue * brainiumRevShareRate;
    const net = commissionRevenue - media - brokerShare - salariesPlusOH - brainiumRevShare;
    const netMarginOnRev = commissionRevenue === 0 ? 0 : net / commissionRevenue;
    return {
      ...s,
      gmv,
      leads,
      media,
      commissionRevenue,
      brokerShare,
      salariesPlusOH,
      net,
      netMarginOnRev,
    };
  });

  /** ---- CAJA AÑO 1 ---- */
  const MONTHLY_BURN_PRE_SALES = -Math.round(
    SALARIES_Y1 / 12 + y1.overhead / 12 + y1.media / 12
  );

  const MONTHLY_NET_POST_SALES = Math.round(
    (y1.net - MONTHS_PRE_SALES * MONTHLY_BURN_PRE_SALES) / MONTHS_POST_SALES
  );

  const monthlyNetY1 = [
    MONTHLY_BURN_PRE_SALES,
    MONTHLY_BURN_PRE_SALES,
    MONTHLY_BURN_PRE_SALES,
    ...Array.from({ length: MONTHS_POST_SALES }, () => MONTHLY_NET_POST_SALES),
  ];

  const cumulative = monthlyNetY1.reduce<number[]>((acc, val, i) => {
    const prev = i === 0 ? 0 : acc[i - 1];
    acc.push(prev + val);
    return acc;
  }, []);

  const maxDeficit = Math.min(...cumulative);
  const monthOfTurnPositive = cumulative.findIndex((v) => v > 0) + 1;

  /** ---- TABLAS ---- */
  const pnlHeaders = t.pnlHeaders;

  const pnlRows = basePnL.map((r) => [
    `Y${r.year}`,
    r.closings.toLocaleString(),
    usd0(r.gmv),
    r.leads.toLocaleString(),
    usd0(r.media),
    usd0(r.commissionRevenue),
    usd0(r.brokerShare),
    usd0(r.salaries),
    usd0(r.overhead),
    usd0(r.net),
    pct1(r.netMarginOnRev),
  ]);

  const sensHeaders = t.sensitivityHeaders;

  const sensRows = sensitivity.map((s) => [
    s.name,
    s.closings.toLocaleString(),
    pct1(s.blendedCapture),
    `${pct1(s.closeRate)} / ${usd0(s.cpl)}`,
    usd0(s.gmv),
    `${s.leads.toLocaleString()} / ${usd0(s.media)}`,
    usd0(s.commissionRevenue),
    usd0(s.brokerShare),
    usd0(s.salariesPlusOH),
    usd0(s.net),
    pct1(s.netMarginOnRev),
  ]);

  const teamDashboardHeaders = t.teamTableHeaders;

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.h1}>{t.headerTitle}</h1>
        <div style={styles.headStats}>
          <KeyStat label={t.keyStats.closings} value={y1.closings.toLocaleString()} />
          <KeyStat label={t.keyStats.commissionRevenue} value={usd0(y1.commissionRevenue)} />
          <KeyStat label={t.keyStats.netIncome} value={usd0(y1.net)} />
          <KeyStat
            label={t.keyStats.cashMonth}
            value={t.monthPositive(monthOfTurnPositive)}
          />
        </div>
        <div style={{ ...styles.headNote, marginTop: 6 }}>{t.heroSubtitle}</div>
        <div style={styles.headStats}>
          <KeyStat label={t.keyStats.asp} value={usd0(asp)} />
          <KeyStat label={t.keyStats.capture} value={pct1(capture)} />
          <KeyStat
            label={t.keyStats.closeAndCpl}
            value={`${pct1(closeRate)} / ${usd0(cpl)}`}
          />
          <KeyStat label={t.keyStats.salaries} value={usd0(SALARIES_Y1)} />
        </div>
        <div style={styles.headNote}>{t.heroNote}</div>
        <div style={{ ...styles.headNote, color: "#4b5563" }}>
          <ul className={styles.ul as unknown as string} style={styles.ul}>
            {t.metricsGlossary.map((item: string) => (
              <li key={item}>
                <strong>{item.split(":")[0]}:</strong> {item.split(":").slice(1).join(":").trim()}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ ...styles.headNote, color: "#111827", background: "#f9fafb", padding: 12 }}>
          <strong>{t.glossaryTitle}</strong>
          <ul style={{ margin: "8px 0 0 16px", lineHeight: 1.5 }}>
            {t.glossaryItems.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </header>

      <Section title={t.howToReadTitle}>
        <ul className={styles.ul as unknown as string} style={styles.ul}>
          {t.howToReadPoints.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.pSmall as unknown as string} style={styles.pSmall}>
          {t.howToReadDisclaimer}
        </p>
      </Section>

      {/* Controles */}
      <Section title={t.controlsTitle}>
        <Card>
          <div style={styles.controlsHeaderRow}>
            <div style={{ fontSize: 12, color: "#4b5563" }}>{t.controlsRealtimeNote}</div>
            <button type="button" onClick={handleReset} style={styles.resetButton}>
              {t.resetButton}
            </button>
          </div>

          <div style={styles.controlsGrid}>
            {/* Supuestos comerciales */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>{t.controlGroups.commercial.title}</div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>{t.controlGroups.commercial.aspLabel}</label>
                <input
                  type="number"
                  min={50_000}
                  step={10_000}
                  value={asp}
                  onChange={(e) => setAsp(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>{t.controlGroups.commercial.aspHelp}</div>
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>{t.controlGroups.commercial.captureLabel}</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={capturePct}
                  onChange={(e) => setCapturePct(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>{t.controlGroups.commercial.captureHelp}</div>
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>{t.controlGroups.commercial.closeRateLabel}</label>
                <input
                  type="number"
                  min={0.1}
                  max={20}
                  step={0.1}
                  value={closePct}
                  onChange={(e) => setClosePct(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>{t.controlGroups.commercial.closeRateHelp}</div>
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>{t.controlGroups.commercial.cplLabel}</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={cpl}
                  onChange={(e) => setCpl(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>{t.controlGroups.commercial.cplHelp}</div>
              </div>
            </div>

            {/* Cierres / GMV */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>{t.controlGroups.commercial.closingsGroupTitle}</div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>Cierres Y1</label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={closingsY1}
                  onChange={(e) => setClosingsY1(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>
                  {t.controlGroups.commercial.closingHelpY1.replace(
                    "{gmv}",
                    usd0(closingsY1 * asp)
                  )}
                </div>
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>Cierres Y2</label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={closingsY2}
                  onChange={(e) => setClosingsY2(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>
                  {t.controlGroups.commercial.closingHelpY2.replace(
                    "{gmv}",
                    usd0(closingsY2 * asp)
                  )}
                </div>
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>Cierres Y3</label>
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={closingsY3}
                  onChange={(e) => setClosingsY3(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>
                  {t.controlGroups.commercial.closingHelpY3.replace(
                    "{gmv}",
                    usd0(closingsY3 * asp)
                  )}
                </div>
              </div>
            </div>

            {/* Equipo */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>{t.controlGroups.team.title}</div>

              <div style={styles.controlHelp}>{t.controlGroups.team.intro}</div>

              <div style={styles.teamGrid}>
                <div style={styles.teamMemberCard}>
                  <div style={styles.teamMemberHeader}>
                    <div style={{ fontWeight: 600 }}>{t.controlGroups.team.srTitle}</div>
                  </div>

                  <div style={styles.teamFieldsGrid}>
                    <div style={styles.controlField}>
                      <label style={styles.controlFieldLabel}>
                        {t.controlGroups.team.salaryLabel}
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={250}
                        value={srAnalystSalary}
                        onChange={(e) => setSrAnalystSalary(Number(e.target.value) || 0)}
                        style={styles.controlInput}
                      />
                      <div style={styles.controlHelp}>{t.controlGroups.team.salaryHelpSr}</div>
                    </div>

                    <div style={styles.controlField}>
                      <label style={styles.controlFieldLabel}>{t.controlGroups.team.countLabel}</label>
                      <select
                        value={srAnalystHires.length}
                        onChange={(e) =>
                          setSrAnalystHires((prev) =>
                            adjustHireCount(prev, Number(e.target.value) || 0)
                          )
                        }
                        style={styles.controlInput}
                      >
                        {Array.from({ length: MAX_HIRES_PER_ROLE + 1 }, (_, i) => i).map((count) => (
                          <option key={count} value={count}>
                            {count}
                          </option>
                        ))}
                      </select>
                      <div style={styles.controlHelp}>
                        {t.controlGroups.team.srCountHelp}
                      </div>
                    </div>

                    {srAnalystHires.map((year, idx) => (
                      <div key={idx} style={styles.controlField}>
                        <label style={styles.controlFieldLabel}>{`${t.controlGroups.team.yearLabel} ${idx + 1}`}</label>
                        <select
                          value={year}
                          onChange={(e) =>
                            setSrAnalystHires((prev) => {
                              const next = [...prev];
                              next[idx] = e.target.value as HireYear;
                              return next;
                            })
                          }
                          style={styles.controlInput}
                        >
                          {HIRE_YEARS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.teamMemberCard}>
                  <div style={styles.teamMemberHeader}>
                    <div style={{ fontWeight: 600 }}>{t.controlGroups.team.jrTitle}</div>
                  </div>

                  <div style={styles.teamFieldsGrid}>
                    <div style={styles.controlField}>
                      <label style={styles.controlFieldLabel}>
                        {t.controlGroups.team.salaryLabel}
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={250}
                        value={jrAnalystSalary}
                        onChange={(e) => setJrAnalystSalary(Number(e.target.value) || 0)}
                        style={styles.controlInput}
                      />
                      <div style={styles.controlHelp}>{t.controlGroups.team.salaryHelpJr}</div>
                    </div>

                    <div style={styles.controlField}>
                      <label style={styles.controlFieldLabel}>{t.controlGroups.team.countLabel}</label>
                      <select
                        value={jrAnalystHires.length}
                        onChange={(e) =>
                          setJrAnalystHires((prev) =>
                            adjustHireCount(prev, Number(e.target.value) || 0)
                          )
                        }
                        style={styles.controlInput}
                      >
                        {Array.from({ length: MAX_HIRES_PER_ROLE + 1 }, (_, i) => i).map((count) => (
                          <option key={count} value={count}>
                            {count}
                          </option>
                        ))}
                      </select>
                      <div style={styles.controlHelp}>
                        {t.controlGroups.team.jrCountHelp}
                      </div>
                    </div>

                    {jrAnalystHires.map((year, idx) => (
                      <div key={idx} style={styles.controlField}>
                        <label style={styles.controlFieldLabel}>{`${t.controlGroups.team.yearLabel} ${idx + 1}`}</label>
                        <select
                          value={year}
                          onChange={(e) =>
                            setJrAnalystHires((prev) => {
                              const next = [...prev];
                              next[idx] = e.target.value as HireYear;
                              return next;
                            })
                          }
                          style={styles.controlInput}
                        >
                          {HIRE_YEARS.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.controlHelp}>
                Sueldos anuales según equipo activo: Y1 <strong>{usd0(SALARIES_Y1)}</strong> ·
                Y2 <strong>{usd0(SALARIES_Y2)}</strong> · Y3 <strong>{usd0(SALARIES_Y3)}</strong>.
              </div>
            </div>

            {/* Brainium */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>{t.controlGroups.brainium.title}</div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>
                  {t.controlGroups.brainium.monthlyLabel.replace("{months}", `${BRAINIUM_FEE_MONTHS}`)}
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={brainiumMonthlyFee}
                  onChange={(e) => setBrainiumMonthlyFee(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>{t.controlGroups.brainium.monthlyHelp}</div>
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>{t.controlGroups.brainium.successLabel}</label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={brainiumSuccessFee}
                  onChange={(e) => setBrainiumSuccessFee(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>{t.controlGroups.brainium.successHelp}</div>
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>
                  {t.controlGroups.brainium.revshareLabel}
                </label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  step={0.5}
                  value={brainiumRevSharePct}
                  onChange={(e) =>
                    setBrainiumRevSharePct(Number(e.target.value) || 0)
                  }
                  style={styles.controlInput}
                />
                <div style={styles.controlHelp}>{t.controlGroups.brainium.revshareHelp}</div>
              </div>

              <div style={styles.controlHelp}>
                {t.controlGroups.brainium.totalsHelp
                  .replace("{y1}", usd0(brainiumTotalY1))
                  .replace("{y2}", usd0(brainiumTotalY2))
                  .replace("{y3}", usd0(brainiumTotalY3))}
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section title={t.sectionTitles.teamDashboard}>
        <Card>
          {activeTeamMembers.length > 0 ? (
            <Table headers={teamDashboardHeaders} rows={teamDashboardRows} />
          ) : (
            <div style={styles.controlHelp}>{t.teamTableEmpty}</div>
          )}
        </Card>
      </Section>

      <Section title={t.sectionTitles.unitEconomics}>
        <Card>
          <h3 style={styles.h3}>{t.sectionTitles.unitEconomics}</h3>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.td}>{t.unitEconomicsRows.commission}</td>
                <td style={styles.td}>{usd0(commissionPerClosing)}</td>
              </tr>
              <tr>
                <td style={styles.td}>{t.unitEconomicsRows.acquisition}</td>
                <td style={styles.td}>{usd0(mediaPerClosing)}</td>
              </tr>
              <tr>
                <td style={styles.td}>{t.unitEconomicsRows.contribution}</td>
                <td style={styles.td}>{usd0(netPerClosing)}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Section>

      {/* P&L */}
      <Section title={t.sectionTitles.pnl}>
        <Card>
          <Table headers={pnlHeaders} rows={pnlRows} />
        </Card>
      </Section>

      {/* Sensibilidad */}
      <Section title={t.sectionTitles.sensitivity}>
        <Card>
          <Table headers={sensHeaders} rows={sensRows} />
        </Card>
      </Section>

      {/* Caja */}
      <Section title={t.sectionTitles.cash}>
        <div style={styles.grid2}>
          <Card>
            <CashChart data={cumulative} title={t.cashChartTitle} />
          </Card>
          <Card>
            <h3 style={styles.h3}>{t.cashSummaryTitle}</h3>
            <ul style={styles.ul}>
              <li>
                {t.cashSummary.burn} <strong>{usd0(-MONTHLY_BURN_PRE_SALES)}</strong>
              </li>
              <li>
                {t.cashSummary.net} <strong>{usd0(MONTHLY_NET_POST_SALES)}</strong>
              </li>
              <li>
                {t.cashSummary.deficit} <strong>{usd0(Math.abs(maxDeficit))}</strong>
              </li>
              <li>
                {t.cashSummary.turn} <strong>{monthOfTurnPositive}</strong>.
              </li>
            </ul>
          </Card>
        </div>
      </Section>
    </div>
  );
};

/** ---------------------------
 *  VISTA: NARRATIVA / STRATEGIA (Slide 2)
 *  --------------------------- */
const InvestorNarrativeView: React.FC<{ language: Language }> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<"narrativa" | "bigdata" | "agents">(
    "narrativa"
  );
  const t = copy[language].narrative;

  return (
    <div style={styles.wrap}>
      <header style={styles.header}>
        <h1 style={styles.h1}>{t.headerTitle}</h1>
      </header>

      <Card style={{ marginBottom: 12 }}>
        <h3 style={styles.h3}>{t.investmentSummaryTitle}</h3>
        <ul style={styles.ul}>
          {t.investmentSummaryItems.map((item: string) => (
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
            <p style={styles.p}>
              {t.descriptions.narrative}
            </p>
          </Card>

          {/* Resumen */}
          <Section title={t.sectionTitles.summary}>
            <Card>
              <p style={styles.p}>
                Construir una organización de ventas <strong>AI-first</strong>, ligera y enfocada en
                datos, que use agentes de IA especializados y escalamiento a brokers para convertir
                la demanda de compradores internacionales de tierra y condos TAO en{" "}
                <strong>comisiones de alto margen</strong>.
              </p>
            </Card>
          </Section>

          {/* Problema */}
          <Section title={t.sectionTitles.problem}>
            <Card>
              <p style={styles.p}>
                El problema principal a resolver es cambiar el modelo de adquisición de clientes de:
                «yo pongo publicidad para que me encuentren» a: «primero veo quién es un cliente
                potencial para TAO y luego le doy el producto perfecto».
              </p>
              <h3 style={styles.h3}>Por qué ahora</h3>
              <ul style={styles.ul}>
                <li>Los agentes de IA ya operan en WhatsApp, email y voz con suficiente madurez.</li>
                <li>
                  TAO tiene inventario listo en Riviera Maya y Baja, más un motor propio de demanda que
                  deja de depender de un master broker.
                </li>
                <li>
                  Crece el comprador extranjero que quiere retirarse, diversificar o pasar el invierno en
                  México.
                </li>
              </ul>
              <h4 style={{ ...styles.h3, marginTop: 12 }}>La empresa sigue la siguiente lógica:</h4>
              <ol style={styles.ol}>
                <li>¿Quién es mi comprador?</li>
                <li>¿Dónde está mi comprador?</li>
                <li>¿Cómo lo contacto?</li>
                <li>Match con mi producto perfecto.</li>
              </ol>
            </Card>
          </Section>

          {/* Producto y ventaja */}
          <Section title={t.sectionTitles.product}>
            <div style={styles.grid2}>
              <Card>
                <h3 style={styles.h3}>Qué hacen los agentes</h3>
                <ul style={styles.ul}>
                  <li>
                    Cambio en adquisición: dejamos de depender del master broker y construimos un
                    motor propio de demanda internacional.
                  </li>
                  <li>Concierge EN/ES en WhatsApp/email.</li>
                  <li>Matcher de inventario en tiempo real.</li>
                  <li>Agendado de tours virtuales/presenciales.</li>
                  <li>Agente de finanzas/documentos y prellenado de ofertas.</li>
                  <li>Handoff al broker con brief de 1 página.</li>
                </ul>
              </Card>
              <Card>
                <h3 style={styles.h3}>Por qué ganamos</h3>
                <ul style={styles.ul}>
                  <li>Inventario TAO + marca + historial de leads propio.</li>
                  <li>Cobertura 24/7 bilingüe en WhatsApp, email y teléfono.</li>
                  <li>Monetización por lanes (listing-led, co-broke, referidos).</li>
                  <li>Pipeline completamente instrumentado y medible.</li>
                  <li>
                    Brainium (Dr. Roger Long) como consultor externo con fee mensual más success fee
                    en mes 7, alineado a resultados.
                  </li>
                </ul>
              </Card>
            </div>
          </Section>

          {/* Próximos pasos */}
          <Section title={t.sectionTitles.nextSteps}>
            <Card>
              <ul style={styles.ul}>
                <li>Definir métricas clave de conversión.</li>
                <li>Diseñar experimento piloto con X leads.</li>
                <li>Integrar datos históricos de TAO en el modelo.</li>
                <li>Probar guiones y assets para WhatsApp/email.</li>
                <li>Documentar aprendizajes en playbook comercial.</li>
              </ul>
            </Card>
          </Section>

          <Section title={t.sectionTitles.roadmap}>
            <div style={styles.grid3}>
              <Card>
                <h3 style={styles.h3}>0–6 meses</h3>
                <ul style={styles.ul}>
                  <li>Piloto con leads existentes de TAO.</li>
                  <li>Primer AI Sales Agent en producción.</li>
                  <li>Integración básica con CRM y métricas diarias.</li>
                  <li>Cierre de los primeros deals influenciados por IA.</li>
                  <li>Playbook inicial de handoff a brokers aliados.</li>
                </ul>
              </Card>
              <Card>
                <h3 style={styles.h3}>6–12 meses</h3>
                <ul style={styles.ul}>
                  <li>Expansión a Baja con inventario priorizado.</li>
                  <li>Segundo vertical de producto (ej. ranchos sustentables).</li>
                  <li>Más automatización en scoring y nurturing multicanal.</li>
                  <li>Onboarding de más brokers con SLAs definidos.</li>
                  <li>Iteraciones en revenue-share según desempeño.</li>
                </ul>
              </Card>
              <Card>
                <h3 style={styles.h3}>12–24 meses</h3>
                <ul style={styles.ul}>
                  <li>Escalar a desarrolladores aliados fuera de TAO.</li>
                  <li>Refinar modelo de revenue-share y comisiones.</li>
                  <li>Productos de datos/insights para socios estratégicos.</li>
                  <li>Suite estándar de agentes para venta y postventa.</li>
                  <li>Canales recurrentes con comunidades de compradores.</li>
                </ul>
              </Card>
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
            <Card>
              <h3 style={styles.h3}>1. Reactivar y segmentar la base actual (80,000 registros)</h3>
              <ul style={styles.ul}>
                <li>
                  <strong>Limpieza y enriquecimiento de datos:</strong> normalizar correos, teléfonos
                  y países; eliminar rebotes duros; enriquecer con datos externos (edad, ciudad,
                  estado, idioma, tipo de propiedad de interés cuando exista).
                </li>
                <li>
                  <strong>Etiquetado por intención y antigüedad:</strong> segmentar en cohortes
                  2013–2016, 2017–2020, 2021–hoy; analizar aperturas de email, clics y visitas
                  recientes para detectar quién sigue activo.
                </li>
                <li>
                  <strong>Reactivación con agentes de IA:</strong> campañas de reactivación
                  automatizadas por email/WhatsApp que pregunten de forma conversacional si siguen
                  interesados en comprar en México, presupuesto, timing y producto preferido.
                </li>
                <li>
                  <strong>Match con productos futuros:</strong> mapear prospectos que mencionan Baja
                  California, invierno en EE. UU./Canadá o ticket 300–400k con productos como
                  MonteRocella y ranchos sustentables.
                </li>
              </ul>
            </Card>

            <Card style={{ marginTop: 12 }}>
              <h3 style={styles.h3}>
                2. Adquisición activa de 300,000–500,000 nuevos prospectos extranjeros
              </h3>
              <ul style={styles.ul}>
                <li>
                  <strong>Data partners y listas cualificadas:</strong> acuerdos con empresas que
                  venden datos de high-net-worth individuals y pre-retirados en EE. UU., Canadá y
                  Europa interesados en real estate internacional (similar a lo que hoy hace RETA,
                  pero desintermediado).
                </li>
                <li>
                  <strong>Audiencias por intención de compra:</strong> campañas pagadas segmentadas
                  por: búsqueda de “buy property in Mexico”, “Baja California ranch”, “condos in
                  Rosarito / Ensenada”, etc., cruzado con comportamientos de viaje en invierno.
                </li>
                <li>
                  <strong>Lookalikes de compradores TAO:</strong> usar la base de clientes actuales
                  para crear audiencias similares en Facebook/Instagram, Google y plataformas de
                  native ads, optimizando a leads con capacidad de pagar ~1,500 USD mensuales de
                  hipoteca.
                </li>
                <li>
                  <strong>Canales orgánicos y comunidades:</strong> alianzas con newsletters y medios
                  de retiro/inversión (internacionales) para captar leads a cambio de comisiones por
                  cierre, reemplazando gradualmente el rol del master broker.
                </li>
                <li>
                  <strong>Top of funnel enfocado en Baja California:</strong> contenido educativo
                  sobre vivir el invierno en México, fiscalidad, financiamiento a 20–30 años y
                  proyectos sustentables, con CTA directo hacia los agentes de IA.
                </li>
              </ul>
            </Card>

            <Card style={{ marginTop: 12 }}>
              <h3 style={styles.h3}>3. Segmentación por producto TAO y operación con equipo reducido</h3>
              <ul style={styles.ul}>
                <li>
                  <strong>Segmentos de producto:</strong> MonteRocella (condos 350–400k USD), ranchos
                  sustentables en Baja (2,500–10,000 m² con opción modular) y futuros desarrollos de
                  playa. Cada segmento tiene mensajes y flujos de agente distintos.
                </li>
                <li>
                  <strong>Segmentos de cliente:</strong> pre-jubilados de EE. UU./Canadá que huyen del
                  frío; inversores buscando cashflow en USD; nómadas digitales de alto ingreso;
                  europeos buscando residencia de invierno.
                </li>
                <li>
                  <strong>Operación con 3–5 personas:</strong> el equipo humano se enfoca en
                  estrategia, alianzas y cierres complejos; los agentes de IA hacen el 90% de
                  calificación, nurturing y agendado, permitiendo escalar a cientos de miles de leads
                  sin crecer headcount.
                </li>
                <li>
                  <strong>Scoreo continuo:</strong> los leads se re-scorean dinámicamente según
                  comportamiento (aperturas, clics, respuestas al chat, visitas a landing de Baja) y
                  se pasan a brokers sólo cuando hay alta probabilidad de cierre.
                </li>
              </ul>
            </Card>

            <Card style={{ marginTop: 12 }}>
              <h3 style={styles.h3}>Riesgos y mitigantes</h3>
              <ul style={styles.ul}>
                <li>
                  Dependencia en inventario TAO; mitigación: brokers humanos en el loop y acuerdos
                  adicionales con desarrolladores.
                </li>
                <li>
                  Adopción de agentes de IA; mitigación: A/B testing de canales, scripts y handoff a broker
                  cuando el lead prefiere hablar con una persona.
                </li>
                <li>Calidad de datos; mitigación: limpieza continua de la base y scoreo recurrente.</li>
                <li>Concentración geográfica; mitigación: diversificación gradual entre proyectos Riviera Maya y Baja.</li>
              </ul>
            </Card>
          </Section>
        </>
      )}

      {activeTab === "agents" && (
        <>
          <Card style={{ marginBottom: 12 }}>
            <p style={styles.p}>
              Los agentes de IA actúan como concierge bilingüe 24/7: capturan leads, los perfilan y
              recomiendan el inventario correcto, escalando a humanos sólo en momentos clave para
              cerrar con mayor velocidad y consistencia.
            </p>
          </Card>

          {/* Flujo del agente */}
          <Section title={t.sectionTitles.howAgentsWork}>
            <Card>
              <p style={styles.p}>
                Un agente de ventas de IA funciona como concierge bilingüe siempre disponible: recibe
                leads, los perfila y envía respuestas personalizadas en cuestión de segundos, sin
                depender de horarios.
              </p>
              <p style={styles.p}>
                Opera sobre canales de TAO (web, WhatsApp, email) y datos de inventario en vivo para
                priorizar qué producto sugerir y cuándo escalar a un humano.
              </p>
            </Card>

            <div style={{ ...styles.grid2, marginTop: 12 }}>
              <Card style={styles.agentCard}>
                <div style={styles.agentPill}>Agente 1</div>
                <h3 style={styles.agentTitle}>Captura y calificación 24/7</h3>
                <p style={styles.agentText}>
                  Monitorea canales, detecta idioma, valida identidad y clasifica la intención en
                  segundos.
                </p>
                <ul style={styles.ul}> 
                  <li>Hace preguntas dinámicas (presupuesto, fechas, ubicación de interés).</li>
                  <li>Scorea al lead según señales de compra y comportamiento previo.</li>
                  <li>Sincroniza con CRM para evitar duplicados y perder contexto.</li>
                </ul>
              </Card>

              <Card style={styles.agentCard}>
                <div style={styles.agentPill}>Agente 2</div>
                <h3 style={styles.agentTitle}>Experiencia y producto</h3>
                <p style={styles.agentText}>
                  Recomienda inventario y hace que el lead visualice la compra con recursos
                  interactivos.
                </p>
                <ul style={styles.ul}> 
                  <li>Entrega fichas técnicas, renders y mapas 3D con disponibilidad en tiempo real.</li>
                  <li>Propone 2–3 unidades relevantes y agenda tours virtuales o presenciales.</li>
                  <li>Responde dudas de HOA, financiamiento, impuestos y estilo de vida.</li>
                </ul>
              </Card>

              <Card style={styles.agentCard}>
                <div style={styles.agentPill}>Agente 3</div>
                <h3 style={styles.agentTitle}>Negociación y documentos</h3>
                <p style={styles.agentText}>
                  Reduce fricción: recoge evidencias, arma ofertas y muestra el plan financiero
                  completo.
                </p>
                <ul style={styles.ul}> 
                  <li>Recopila ID, proof-of-funds y preferencias para prellenar la oferta.</li>
                  <li>Genera calendario de pagos con HOA, impuestos y notas notariales.</li>
                  <li>Escala al broker adecuado con brief de 1 página listo para la llamada.</li>
                </ul>
              </Card>

              <Card style={styles.agentCard}>
                <div style={styles.agentPill}>Agente 4</div>
                <h3 style={styles.agentTitle}>Seguimiento y cierre asistido</h3>
                <p style={styles.agentText}>
                  Mantiene el ritmo hasta el cierre y actualiza a todos los involucrados en tiempo
                  real.
                </p>
                <ul style={styles.ul}> 
                  <li>Envia recordatorios, comparativas y nudges según actividad del lead.</li>
                  <li>Coordina agenda entre comprador, broker y notaría; confirma tours y firmas.</li>
                  <li>Reporta estado en el CRM y protege el crédito de venta para TAO.</li>
                </ul>
              </Card>
            </div>
          </Section>

          {/* Ejemplos */}
          <Section title={t.sectionTitles.agentExamples}>
            <div style={styles.grid3}>
              <Card style={styles.exampleCard}>
                <div style={styles.exampleStep}>Paso 1</div>
                <p style={styles.pSmall}>
                  <strong>Calibra presupuesto y fechas.</strong> «Hola Sarah, con base en tu
                  presupuesto y fechas, seleccioné dos condos en la playa y uno que te encajan bien.
                  ¿Te gusta ver el unit tour el jueves o viernes?»
                </p>
              </Card>
              <Card style={styles.exampleCard}>
                <div style={styles.exampleStep}>Paso 2</div>
                <p style={styles.pSmall}>
                  <strong>Mapa interactivo y tiempos.</strong> Envía un mapa 3D con la unidad marcada,
                  tiempos de caminata a playa/restaurantes y agenda una visita guiada con un clic.
                </p>
              </Card>
              <Card style={styles.exampleCard}>
                <div style={styles.exampleStep}>Paso 3</div>
                <p style={styles.pSmall}>
                  <strong>Explica costos y pagos.</strong> Comparte un breakdown en lenguaje simple
                  sobre HOA, reglas de uso y calendario de pagos mensuales/anuales para dar
                  previsibilidad.
                </p>
              </Card>
              <Card style={styles.exampleCard}>
                <div style={styles.exampleStep}>Paso 4</div>
                <p style={styles.pSmall}>
                  <strong>Reúne documentos y arma oferta.</strong> Solicita ID y proof-of-funds,
                  valida nombres legales y prellena la oferta con los datos del comprador y la unidad
                  preferida.
                </p>
              </Card>
              <Card style={styles.exampleCard}>
                <div style={styles.exampleStep}>Paso 5</div>
                <p style={styles.pSmall}>
                  <strong>Handoff con contexto.</strong> Cuando el lead está calificado, envía al
                  broker un brief de 1 página con historial de interacciones, intereses y objeciones
                  clave para acelerar el cierre.
                </p>
              </Card>
              <Card style={styles.exampleCard}>
                <div style={styles.exampleStep}>Paso 6</div>
                <p style={styles.pSmall}>
                  <strong>Nurturing y urgencia.</strong> Mantiene vivos a los prospectos con updates de
                  obra, alertas de «últimas 3 unidades» y recordatorios de expiración de ofertas,
                  activando el siguiente paso con un botón.
                </p>
              </Card>
            </div>
          </Section>
        </>
      )}
    </div>
  );
};

/** ---------------------------
 *  DASHBOARD: PESTAÑAS / LAYOUT
 *  --------------------------- */
const TaoDashboard: React.FC = () => {
  const [tab, setTab] = useState<"model" | "narrative">("model");
  const [language, setLanguage] = useState<Language>("es");
  const t = copy[language];

  return (
    <div style={{ padding: 18 }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>{t.dashboardTitle}</h2>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          {["es", "en"].map((lng) => (
            <button
              key={lng}
              onClick={() => setLanguage(lng as Language)}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: language === lng ? "1px solid #2563eb" : "1px solid #e5e7eb",
                background: language === lng ? "#eff6ff" : "#ffffff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
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

      <div>
        {tab === "model" && <InvestorModelView language={language} />}
        {tab === "narrative" && <InvestorNarrativeView language={language} />}
      </div>
    </div>
  );
};

/** ---------------------------
 *  ESTILOS (UNIFICADOS)
 *  --------------------------- */
const styles: Record<string, React.CSSProperties> = {
  wrap: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
    color: "#111827",
    lineHeight: 1.45,
    padding: "24px",
    background: "#f9fafb",
  },
  header: {
    marginBottom: 16,
  },
  h1: {
    fontSize: 24,
    margin: 0,
    fontWeight: 700,
  },
  headStats: {
    marginTop: 12,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  headNote: {
    marginTop: 8,
    fontSize: 12,
    color: "#4b5563",
    maxWidth: 900,
  },
  section: {
    margin: "16px 0 24px",
  },
  h2: {
    fontSize: 18,
    margin: "0 0 12px",
    fontWeight: 700,
    color: "#111827",
  },
  h3: {
    fontSize: 14,
    margin: "0 0 8px",
    fontWeight: 700,
    color: "#1f2937",
  },
  p: {
    margin: 0,
    fontSize: 14,
  },
  pSmall: {
    margin: 0,
    fontSize: 13,
  },
  ul: {
    margin: 0,
    paddingLeft: 18,
    fontSize: 13,
  },
  ol: {
    margin: 0,
    paddingLeft: 18,
    fontSize: 14,
  },
  grid2: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "1fr 1fr",
  },
  grid3: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  agentCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 16px rgba(0,0,0,0.04)",
  },
  agentPill: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.2,
    background: "#e0f2fe",
    color: "#075985",
    marginBottom: 6,
  },
  agentTitle: {
    fontSize: 15,
    margin: "0 0 6px",
    fontWeight: 700,
    color: "#0f172a",
  },
  agentText: {
    margin: "0 0 8px",
    fontSize: 13,
    color: "#334155",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  flowGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  },
  flowStep: {
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    padding: "14px 14px 16px",
    background: "#ffffff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 999,
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 4,
  },
  flowTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  keystat: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 12px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    minWidth: 160,
  },
  keystatValue: {
    fontSize: 16,
    fontWeight: 700,
  },
  keystatLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 13,
  },
  th: {
    textAlign: "left",
    padding: "8px 10px",
    borderBottom: "1px solid #e5e7eb",
    background: "#f3f4f6",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "8px 10px",
    borderBottom: "1px solid #f3f4f6",
    whiteSpace: "nowrap",
  },
  svg: {
    display: "block",
  },
  controlsHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  resetButton: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid #d1d5db",
    background: "#ffffff",
    cursor: "pointer",
  },
  controlsGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  },
  controlGroup: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 12,
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  controlLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  controlField: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginTop: 4,
  },
  controlFieldLabel: {
    fontSize: 11,
    color: "#4b5563",
  },
  controlInput: {
    padding: "6px 8px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 13,
  },
  controlHelp: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 2,
  },
  teamGrid: {
    display: "grid",
    gap: 10,
  },
  teamMemberCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#f9fafb",
  },
  teamMemberHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  teamToggleLabel: {
    fontSize: 11,
    color: "#111827",
    display: "flex",
    alignItems: "center",
  },
  teamFieldsGrid: {
    display: "grid",
    gap: 8,
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  },
  exampleCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  exampleStep: {
    alignSelf: "flex-start",
    padding: "4px 10px",
    borderRadius: 999,
    background: "#eef2ff",
    color: "#4338ca",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
};

/** ---------------------------
 *  EXPORT
 *  --------------------------- */
export default TaoDashboard;
