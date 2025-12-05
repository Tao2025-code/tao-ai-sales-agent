import React, { useState } from "react";
import { Card, Section } from "../components/Layout";
import { CashChart } from "../components/CashChart";
import { KeyStat } from "../components/KeyStat";
import { Table } from "../components/Table";
import { copy, Language } from "../copy";
import { useIsMobile } from "../hooks/useIsMobile";
import { styles } from "../styles";
import { pct1, usd0 } from "../utils";

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
  const isMobile = useIsMobile();
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
  const wrapStyle = { ...styles.wrap, padding: isMobile ? "12px" : styles.wrap.padding };

  return (
    <div data-language={language} style={wrapStyle}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.h1}>{t.headerTitle}</h1>
        <div className="head-stats" style={styles.headStats}>
          <KeyStat label={t.keyStats.closings} value={y1.closings.toLocaleString()} />
          <KeyStat label={t.keyStats.commissionRevenue} value={usd0(y1.commissionRevenue)} />
          <KeyStat label={t.keyStats.netIncome} value={usd0(y1.net)} />
          <KeyStat
            label={t.keyStats.cashMonth}
            value={t.monthPositive(monthOfTurnPositive)}
          />
        </div>
        <div style={{ ...styles.headNote, marginTop: 6 }}>{t.heroSubtitle}</div>
        <div className="head-stats" style={styles.headStats}>
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

          <div className="controls-grid" style={styles.controlsGrid}>
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
          <div className="table-wrapper" style={{ overflowX: "auto" }}>
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
          </div>
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

export default InvestorModelView;
