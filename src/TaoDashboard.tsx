
import React, { useState } from "react";

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

type FlowStep = {
  step: string;
  title: string;
  text: string;
};

/** ---------------------------
 *  CONSTANTES
 *  --------------------------- */
const BROKER_SHARE_RATE = 0.25;
const SEED_TARGET = 150_000;

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

// Caja
const MONTHS_PRE_SALES = 3;
const MONTHS_POST_SALES = 12 - MONTHS_PRE_SALES;

/** ---------------------------
 *  DATOS NARRATIVA (Slide 2)
 *  --------------------------- */
const flowSteps: FlowStep[] = [
  {
    step: "0",
    title: "Cambio en la forma de obtener clientes",
    text:
      "Pasamos de depender del master broker (RETA / International Living) a un modelo activo que identifica millones de estadounidenses potenciales usando múltiples fuentes de datos para luego segmentarlos y perfilar el mejor momento y canal de contacto.",
  },
  {
    step: "1",
    title: "Lead capturado",
    text:
      "El lead llega desde web, WhatsApp, email, portales o brokers y se ingesta en tiempo real.",
  },
  {
    step: "2",
    title: "Perfil creado",
    text:
      "El sistema enriquece el lead con presupuesto, timing, preferencias, idioma e historial con TAO.",
  },
  {
    step: "3",
    title: "Scoreo y segmentación",
    text:
      "La IA puntúa intención y ventana de compra, segmenta por producto (condo vs tierra) y prioriza seguimiento.",
  },
  {
    step: "4",
    title: "Chat concierge",
    text:
      "Agente concierge bilingüe responde en WhatsApp/email y comparte media, mapas y FAQs.",
  },
  {
    step: "5",
    title: "Match de unidades",
    text:
      "Agente matcher propone 2–3 unidades de inventario en tiempo real y ajusta según la reacción del cliente.",
  },
  {
    step: "6",
    title: "Agendado de visitas",
    text:
      "Agente de tours agenda visitas virtuales o presenciales y envía invitaciones, direcciones y recordatorios.",
  },
  {
    step: "7",
    title: "Finanzas y documentos",
    text:
      "Agente de finanzas/documentos explica esquemas de pago, recopila proof-of-funds y prellena la oferta.",
  },
  {
    step: "8",
    title: "Handoff a broker y cierre",
    text:
      "Cuando hay alta intención, el agente arma un brief de 1 página y deriva al broker correcto, mientras sigue nutriendo.",
  },
];

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
const InvestorModelView: React.FC = () => {
  // Defaults comerciales
  const DEFAULT_ASP = 225_000;
  const DEFAULT_CAPTURE_PCT = 3.65;
  const DEFAULT_CLOSE_PCT = 2.0;
  const DEFAULT_CPL = 30;

  // Defaults cierres / GMV
  const DEFAULT_CLOSINGS_Y1 = BASE_CLOSINGS[0];
  const DEFAULT_CLOSINGS_Y2 = BASE_CLOSINGS[1];
  const DEFAULT_CLOSINGS_Y3 = BASE_CLOSINGS[2];

  // Equipo
  const DEFAULT_EXTRA_ENABLED = false;
  const DEFAULT_EXTRA_MONTHLY = 2_500;
  const DEFAULT_FIFTH_ENABLED = false;
  const DEFAULT_FIFTH_MONTHLY = 2_500;

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

  // 4º y 5º empleado
  const [extraEnabled, setExtraEnabled] = useState<boolean>(DEFAULT_EXTRA_ENABLED);
  const [extraMonthly, setExtraMonthly] = useState<number>(DEFAULT_EXTRA_MONTHLY);
  const [fifthEnabled, setFifthEnabled] = useState<boolean>(DEFAULT_FIFTH_ENABLED);
  const [fifthMonthly, setFifthMonthly] = useState<number>(DEFAULT_FIFTH_MONTHLY);

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

    setExtraEnabled(DEFAULT_EXTRA_ENABLED);
    setExtraMonthly(DEFAULT_EXTRA_MONTHLY);
    setFifthEnabled(DEFAULT_FIFTH_ENABLED);
    setFifthMonthly(DEFAULT_FIFTH_MONTHLY);
  };

  // Derivados
  const capture = capturePct / 100;
  const closeRate = closePct / 100;
  const effectiveCloseRate = Math.max(closeRate, 0.0001);

  const brainiumRevShareRate = brainiumRevSharePct / 100;
  const brainiumFeeY1 = brainiumMonthlyFee * BRAINIUM_FEE_MONTHS;
  const overheadY1 = OVERHEAD_ANNUAL + brainiumFeeY1 + brainiumSuccessFee;

  const extraMonthlyEffective = extraEnabled ? extraMonthly : 0;
  const fifthMonthlyEffective = fifthEnabled ? fifthMonthly : 0;

  const totalMonthlySalaries =
    GM_MONTHLY_SALARY +
    AI_SR_MONTHLY_SALARY +
    AI_SPEC_MONTHLY_SALARY +
    extraMonthlyEffective +
    fifthMonthlyEffective;

  const SALARIES_Y1 = totalMonthlySalaries * 12;
  const SALARIES_Y2Y3 = totalMonthlySalaries * 12;

  const closingsByYear = [closingsY1, closingsY2, closingsY3];

  /** ---- P&L 3 AÑOS (BASE) ---- */
  const basePnL: PnLYear[] = closingsByYear.map((closings, idx) => {
    const year = idx + 1;
    const gmv = closings * asp;
    const leads = Math.round(closings / effectiveCloseRate);
    const media = leads * cpl;

    const commissionRevenue = gmv * capture;
    const brokerShare = commissionRevenue * BROKER_SHARE_RATE;
    const salaries = year === 1 ? SALARIES_Y1 : SALARIES_Y2Y3;
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

  const [y1, y2, y3] = basePnL;

  /** ---- SENSIBILIDAD Y3 ---- */
  const sensitivity: Sensitivity[] = [
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
  ].map((s) => {
    const gmv = s.closings * asp;
    const leads = Math.round(s.closings / Math.max(s.closeRate, 0.0001));
    const media = Math.round(leads * s.cpl);
    const commissionRevenue = gmv * s.blendedCapture;
    const brokerShare = commissionRevenue * BROKER_SHARE_RATE;
    const salariesPlusOH = SALARIES_Y2Y3 + OVERHEAD_ANNUAL;
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
  const pnlHeaders = [
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
  ];

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

  const sensHeaders = [
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
  ];

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

  return (
    <div style={styles.wrap}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.h1}>Vista para Inversionistas — Modelo financiero</h1>
        <div style={styles.headStats}>
          <KeyStat label="ASP" value={usd0(asp)} />
          <KeyStat label="Captura mezclada" value={pct1(capture)} />
          <KeyStat
            label="Tasa de cierre / CPL"
            value={`${pct1(closeRate)} / ${usd0(cpl)}`}
          />
          <KeyStat label="Sueldos anuales Y1" value={usd0(SALARIES_Y1)} />
        </div>
        <div style={styles.headNote}>
          Ajusta cierres por año, supuestos comerciales, Brainium y equipo. El modelo recalcula GMV,
          comisiones, márgenes y caja en tiempo real.
        </div>
      </header>

      {/* Controles */}
      <Section title="Controles del modelo">
        <Card>
          <div style={styles.controlsHeaderRow}>
            <div style={{ fontSize: 12, color: "#4b5563" }}>
              Los cambios se aplican en tiempo real al P&L y a la caja.
            </div>
            <button type="button" onClick={handleReset} style={styles.resetButton}>
              Restablecer valores iniciales
            </button>
          </div>

          <div style={styles.controlsGrid}>
            {/* Supuestos comerciales */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>Supuestos comerciales</div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>ASP (USD)</label>
                <input
                  type="number"
                  min={50_000}
                  step={10_000}
                  value={asp}
                  onChange={(e) => setAsp(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>Captura mezclada (%)</label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  value={capturePct}
                  onChange={(e) => setCapturePct(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>Tasa de cierre (%)</label>
                <input
                  type="number"
                  min={0.1}
                  max={20}
                  step={0.1}
                  value={closePct}
                  onChange={(e) => setClosePct(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>CPL mezclado (USD)</label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={cpl}
                  onChange={(e) => setCpl(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>
            </div>

            {/* Cierres / GMV */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>Cierres esperados por año</div>

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
                  GMV estimado Y1: <strong>{usd0(closingsY1 * asp)}</strong>
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
                  GMV estimado Y2: <strong>{usd0(closingsY2 * asp)}</strong>
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
                  GMV estimado Y3: <strong>{usd0(closingsY3 * asp)}</strong>
                </div>
              </div>
            </div>

            {/* Equipo */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>Equipo (4º y 5º empleado)</div>

              <div style={styles.toggleRow}>
                <input
                  type="checkbox"
                  checked={extraEnabled}
                  onChange={(e) => setExtraEnabled(e.target.checked)}
                />
                <span style={{ fontSize: 12, color: "#111827" }}>Incluir 4º empleado</span>
              </div>
              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>
                  Sueldo 4º empleado (USD/mes)
                </label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={extraMonthly}
                  onChange={(e) => setExtraMonthly(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>

              <div style={styles.toggleRow}>
                <input
                  type="checkbox"
                  checked={fifthEnabled}
                  onChange={(e) => setFifthEnabled(e.target.checked)}
                />
                <span style={{ fontSize: 12, color: "#111827" }}>Incluir 5º empleado</span>
              </div>
              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>
                  Sueldo 5º empleado (USD/mes)
                </label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={fifthMonthly}
                  onChange={(e) => setFifthMonthly(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>

              <div style={styles.controlHelp}>
                Sueldos anuales actuales (incluyendo 4º/5º empleado si aplican):{" "}
                <strong>{usd0(SALARIES_Y1)}</strong>.
              </div>
            </div>

            {/* Brainium */}
            <div style={styles.controlGroup}>
              <div style={styles.controlLabel}>Brainium (consultor externo)</div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>
                  Fee mensual primeros {BRAINIUM_FEE_MONTHS} meses (USD)
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={brainiumMonthlyFee}
                  onChange={(e) => setBrainiumMonthlyFee(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>Success fee mes 7 (USD)</label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={brainiumSuccessFee}
                  onChange={(e) => setBrainiumSuccessFee(Number(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>

              <div style={styles.controlField}>
                <label style={styles.controlFieldLabel}>
                  % comisión sobre ingresos por comisiones (rev-share)
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
              </div>

              <div style={styles.controlHelp}>
                Total Y1 Brainium (retainer + success fee):{" "}
                <strong>{usd0(brainiumFeeY1 + brainiumSuccessFee)}</strong>.
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* P&L */}
      <Section title="P&L 36 meses (escenario base)">
        <div style={styles.grid2}>
          <Card>
            <h3 style={styles.h3}>Resumen rápido</h3>
            <ul style={styles.ul}>
              <li>GMV Y1: {usd0(y1.gmv)}</li>
              <li>GMV Y2: {usd0(y2.gmv)}</li>
              <li>GMV Y3: {usd0(y3.gmv)}</li>
              <li>Utilidad neta Y3: {usd0(y3.net)}</li>
            </ul>
          </Card>
          <Card>
            <Table headers={pnlHeaders} rows={pnlRows} />
          </Card>
        </div>
      </Section>

      {/* Sensibilidad */}
      <Section title="Sensibilidad Y3 (Downside / Base / Upside)">
        <Card>
          <Table headers={sensHeaders} rows={sensRows} />
        </Card>
      </Section>

      {/* Caja */}
      <Section title="Caja año 1 y necesidad de capital">
        <div style={styles.grid2}>
          <Card>
            <CashChart data={cumulative} title="Caja acumulada (meses 1–12)" />
          </Card>
          <Card>
            <h3 style={styles.h3}>Resumen de caja</h3>
            <ul style={styles.ul}>
              <li>
                Burn mensual M1–M3 (sin ventas):{" "}
                <strong>{usd0(-MONTHLY_BURN_PRE_SALES)}</strong> por mes.
              </li>
              <li>
                Utilidad neta mensual promedio M4–M12:{" "}
                <strong>{usd0(MONTHLY_NET_POST_SALES)}</strong>.
              </li>
              <li>
                Déficit acumulado máximo:{" "}
                <strong>{usd0(Math.abs(maxDeficit))}</strong>.
              </li>
              <li>
                Punto de caja positiva: alrededor de mes{" "}
                <strong>{monthOfTurnPositive}</strong>.
              </li>
              <li>
                Meta prudente de seed de referencia:{" "}
                <strong>{usd0(SEED_TARGET)}</strong>.
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
const InvestorNarrativeView: React.FC = () => {
  return (
    <div style={styles.wrap}>
      <header style={styles.header}>
        <h1 style={styles.h1}>
          Vista para Inversionistas — Narrativa y estrategia comercial
        </h1>
      </header>

      {/* Resumen */}
      <Section title="Resumen en una línea">
        <Card>
          <p style={styles.p}>
            Construir una organización de ventas <strong>AI-first</strong>, ligera y enfocada en
            datos, que use agentes de IA especializados y escalamiento a brokers para convertir la
            demanda de compradores internacionales de tierra y condos TAO en{" "}
            <strong>comisiones de alto margen</strong>.
          </p>
        </Card>
      </Section>

      {/* Problema */}
      <Section title="Problema y por qué ahora">
        <Card>
          <ul style={styles.ul}>
            <li>
              Los compradores internacionales hacen muchas preguntas, en distintos husos horarios y
              esperan respuestas instantáneas (WhatsApp, email, teléfono).
            </li>
            <li>
              TAO tiene inventario, marca e interés entrante, pero necesita un motor de ventas
              siempre encendido para subir conversión y acortar el tiempo de cierre.
            </li>
            <li>
              La IA moderna puede calificar, nutrir y agendar visitas 24/7, escalando a humanos solo
              cuando realmente se necesita para cerrar.
            </li>
          </ul>
        </Card>
      </Section>

      {/* Producto y ventaja */}
      <Section title="Producto y ventaja competitiva">
        <div style={styles.grid2}>
          <Card>
            <h3 style={styles.h3}>Qué hacen los agentes</h3>
            <ul style={styles.ul}>
              <li>
                Cambio en adquisición: dejamos de depender del master broker y construimos un motor
                propio de demanda internacional.
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
                Brainium (Dr. Roger Long) como consultor externo con fee mensual más success fee en
                mes 7, alineado a resultados.
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* ESTRATEGIA BASE DE DATOS 500K+ */}
      <Section title="Estrategia para construir una base de datos de 500,000+ compradores extranjeros">
        <Card>
          <h3 style={styles.h3}>1. Reactivar y segmentar la base actual (80,000 registros)</h3>
          <ul style={styles.ul}>
            <li>
              <strong>Limpieza y enriquecimiento de datos:</strong> normalizar correos, teléfonos y
              países; eliminar rebotes duros; enriquecer con datos externos (edad, ciudad, estado,
              idioma, tipo de propiedad de interés cuando exista).
            </li>
            <li>
              <strong>Etiquetado por intención y antigüedad:</strong> segmentar en cohortes 2013–
              2016, 2017–2020, 2021–hoy; analizar aperturas de email, clics y visitas recientes para
              detectar quién sigue activo.
            </li>
            <li>
              <strong>Reactivación con agentes de IA:</strong> campañas de reactivación automatizadas
              por email/WhatsApp que pregunten de forma conversacional si siguen interesados en
              comprar en México, presupuesto, timing y producto preferido.
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
              <strong>Data partners y listas cualificadas:</strong> acuerdos con empresas que venden
              datos de high-net-worth individuals y pre-retirados en EE. UU., Canadá y Europa
              interesados en real estate internacional (similar a lo que hoy hace RETA, pero
              desintermediado).
            </li>
            <li>
              <strong>Audiencias por intención de compra:</strong> campañas pagadas segmentadas por:
              búsqueda de “buy property in Mexico”, “Baja California ranch”, “condos in Rosarito /
              Ensenada”, etc., cruzado con comportamientos de viaje en invierno.
            </li>
            <li>
              <strong>Lookalikes de compradores TAO:</strong> usar la base de clientes actuales para
              crear audiencias similares en Facebook/Instagram, Google y plataformas de native ads,
              optimizando a leads con capacidad de pagar ~1,500 USD mensuales de hipoteca.
            </li>
            <li>
              <strong>Canales orgánicos y comunidades:</strong> alianzas con newsletters y medios de
              retiro/inversión (internacionales) para captar leads a cambio de comisiones por cierre,
              reemplazando gradualmente el rol del master broker.
            </li>
            <li>
              <strong>Top of funnel enfocado en Baja California:</strong> contenido educativo sobre
              vivir el invierno en México, fiscalidad, financiamiento a 20–30 años y proyectos
              sustentables, con CTA directo hacia los agentes de IA.
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
              frío; inversores buscando cashflow en USD; nómadas digitales de alto ingreso; europeos
              buscando residencia de invierno.
            </li>
            <li>
              <strong>Operación con 3–5 personas:</strong> el equipo humano se enfoca en estrategia,
              alianzas y cierres complejos; los agentes de IA hacen el 90% de calificación, nurturing
              y agendado, permitiendo escalar a cientos de miles de leads sin crecer headcount.
            </li>
            <li>
              <strong>Scoreo continuo:</strong> los leads se re-scorean dinámicamente según
              comportamiento (aperturas, clics, respuestas al chat, visitas a landing de Baja) y se
              pasan a brokers sólo cuando hay alta probabilidad de cierre.
            </li>
          </ul>
        </Card>
      </Section>

      {/* Flujo del agente */}
      <Section title="Cómo funciona el Agente de Ventas de IA">
        <Card>
          <div style={styles.flowGrid}>
            {flowSteps.map((s) => (
              <div key={s.step} style={styles.flowStep}>
                <div style={styles.stepBadge}>{s.step}</div>
                <div style={styles.flowTitle}>{s.title}</div>
                <p style={styles.pSmall}>{s.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Ejemplos */}
      <Section title="Ejemplos de Agentes de Ventas de IA desplegados (experiencia del comprador)">
        <div style={styles.grid3}>
          <Card>
            <p style={styles.pSmall}>
              "Hola Sarah, con base en tu presupuesto y fechas, seleccioné{" "}
              <strong>dos condos</strong> y <strong>un lote</strong> que encajan bien. ¿Te gustaría
              un tour virtual el <strong>jueves o viernes</strong>?"
            </p>
          </Card>
          <Card>
            <p style={styles.pSmall}>
              Envía un <strong>mapa 3D interactivo</strong> con la unidad marcada, tiempo caminando a
              la playa y amenidades cercanas.
            </p>
          </Card>
          <Card>
            <p style={styles.pSmall}>
              Comparte una explicación en lenguaje simple sobre{" "}
              <strong>calendario de pagos</strong>, HOA, yields de renta y escenarios de inversión.
            </p>
          </Card>
          <Card>
            <p style={styles.pSmall}>
              Recopila documentos (ID, proof-of-funds) vía un enlace seguro y{" "}
              <strong>prellena la oferta</strong>.
            </p>
          </Card>
          <Card>
            <p style={styles.pSmall}>
              Cuando el lead está calificado, el agente avisa al broker con un{" "}
              <strong>brief de 1 página</strong> y agenda una llamada humana.
            </p>
          </Card>
          <Card>
            <p style={styles.pSmall}>
              Mantiene a los prospectos calientes con <strong>updates de obra</strong>, cambios de
              precio y alertas de "últimas unidades" de forma automática.
            </p>
          </Card>
        </div>
      </Section>

      {/* Próximos pasos */}
      <Section title="Próximos pasos">
        <Card>
          <ol style={styles.ol}>
            <li>
              Congelar un escenario Base en el slide de modelo financiero (cierres Y1–Y3, ASP, CPL y
              parámetros de Brainium).
            </li>
            <li>
              Definir objetivos concretos para la base de datos: por ejemplo, 100k leads reactivados
              + 300k nuevos en 24 meses, con cobertura mayoritaria en EE. UU. y Canadá.
            </li>
            <li>
              Diseñar el plan de adquisición de datos (partners, campañas, contenido) y asignar
              responsabilidades específicas al equipo de 3–5 personas.
            </li>
            <li>
              Lanzar un piloto de 60–90 días en Baja California con agentes de IA activos en
              WhatsApp/web y medir costo por lead, tasa de calificación y comisiones generadas.
            </li>
            <li>
              Ajustar los agentes y la segmentación según resultados del piloto y documentar la
              máquina para replicarla en otros desarrollos TAO.
            </li>
          </ol>
        </Card>
      </Section>
    </div>
  );
};

/** ---------------------------
 *  DASHBOARD: PESTAÑAS / LAYOUT
 *  --------------------------- */
const TaoDashboard: React.FC = () => {
  const [tab, setTab] = useState<"model" | "narrative">("model");

  return (
    <div style={{ padding: 18 }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 16 }}>TAO Investor Dashboard</h2>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
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
            Modelo financiero
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
            Narrativa y estrategia
          </button>
        </div>
      </div>

      <div>
        {tab === "model" && <InvestorModelView />}
        {tab === "narrative" && <InvestorNarrativeView />}
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
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
};

/** ---------------------------
 *  EXPORT
 *  --------------------------- */
export default TaoDashboard;
