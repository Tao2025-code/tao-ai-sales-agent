export type Language = "es" | "en";

export const copy: Record<Language, any> = {
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
