export const LANGUAGES = ['es', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export const copy = {
  es: {
    investorModelView: {
      headerTitle: "Modelo de inversión",
      heroSubtitle: "Supuestos y rendimientos estimados",
      heroNote: "Ajusta las variables para ver el impacto en tiempo real.",
      monthPositive: (month: number) => `Mes ${month}`,
      keyStats: {
        closings: "Cierres Y1",
        commissionRevenue: "Ingreso comisión Y1",
        netIncome: "Utilidad neta Y1",
        cashMonth: "Mes de caja positiva",
        asp: "ASP",
        capture: "Captura",
        closeAndCpl: "Cierre / CPL",
        salaries: "Nómina Y1",
      },
      metricsGlossary: [
        "GMV: Valor bruto de mercancía",
        "CPL: Costo por lead",
        "ASP: Precio promedio por cierre",
      ],
      glossaryTitle: "Glosario",
      glossaryItems: [
        "GMV: Valor de propiedades transaccionadas",
        "Capture: Porcentaje de comisión retenida",
        "ASP: Precio promedio por propiedad",
      ],
      howToReadTitle: "Cómo leer",
      howToReadPoints: [
        "Modifica los controles para recalcular las tablas.",
        "Las tablas muestran los resultados con los supuestos actuales.",
        "Puedes restablecer los valores con el botón Reset.",
      ],
      howToReadDisclaimer: "Montos expresados en USD.",
      controlsTitle: "Controles",
      controlsRealtimeNote: "Los cambios se reflejan en tiempo real.",
      resetButton: "Reset",
      controlGroups: {
        commercial: {
          title: "Supuestos comerciales",
          aspLabel: "ASP (USD)",
          aspHelp: "Precio promedio por cierre.",
          captureLabel: "% Captura",
          captureHelp: "Porcentaje de comisión que retiene TAO.",
          closeRateLabel: "% Cierre",
          closeRateHelp: "Porcentaje de leads que convierten en venta.",
          cplLabel: "CPL (USD)",
          cplHelp: "Costo por lead generado.",
          closingsGroupTitle: "Cierres / GMV",
          closingLabelY1: "Cierres Y1",
          closingLabelY2: "Cierres Y2",
          closingLabelY3: "Cierres Y3",
          closingHelpY1: "GMV Y1 estimado: {gmv} con el ASP actual.",
          closingHelpY2: "GMV Y2 estimado: {gmv} con el ASP actual.",
          closingHelpY3: "GMV Y3 estimado: {gmv} con el ASP actual.",
        },
        team: {
          title: "Equipo",
          intro: "Configura sueldos y contrataciones por año.",
          srTitle: "AI Sr Analyst",
          jrTitle: "AI Jr Analyst",
          salaryLabel: "Sueldo mensual (USD)",
          salaryHelpSr: "Sueldos de analistas senior (contrataciones escalonadas).",
          salaryHelpJr: "Sueldos de analistas junior (contrataciones escalonadas).",
          countLabel: "Contrataciones",
          srCountHelp: "Cantidad de hires senior distribuidos por año.",
          jrCountHelp: "Cantidad de hires junior distribuidos por año.",
          yearLabel: "Año",
        },
        brainium: {
          title: "Brainium",
          monthlyLabel: "Fee mensual Brainium ({months} meses)",
          monthlyHelp: "Monto fijo mensual durante los primeros meses.",
          successLabel: "Success fee",
          successHelp: "Monto a pagar contra éxito.",
          revshareLabel: "% Revshare",
          revshareHelp: "Porcentaje de revenue compartido.",
          totalsHelp: "Total por año: Y1 {y1}, Y2 {y2}, Y3 {y3}.",
        },
      },
      sectionTitles: {
        teamDashboard: "Dashboard de equipo",
        unitEconomics: "Unit economics",
        pnl: "P&L",
        sensitivity: "Sensibilidad",
        cash: "Caja",
      },
      teamTableHeaders: ["Rol", "Salario mensual", "Contratación"],
      teamTableEmpty: "Agrega contrataciones para ver el costo por año.",
      unitEconomicsRows: {
        commission: "Comisión por cierre",
        acquisition: "Adquisición por cierre",
        contribution: "Contribución por cierre",
      },
      pnlHeaders: [
        "Año",
        "Cierres",
        "GMV",
        "Leads",
        "Media",
        "Ingreso comisión",
        "% Broker",
        "Nómina",
        "Overhead",
        "Utilidad neta",
        "Margen neto",
      ],
      sensitivityHeaders: [
        "Escenario",
        "Cierres",
        "% Captura",
        "% Cierre / CPL",
        "GMV",
        "Leads / Media",
        "Ingreso comisión",
        "% Broker",
        "Nómina + OH",
        "Utilidad neta",
        "Margen neto",
      ],
      cashChartTitle: "Flujo de caja Y1",
      cashSummaryTitle: "Resumen de caja",
      cashSummary: {
        burn: "Burn mensual pre-ventas:",
        net: "Ingreso neto mensual post-ventas:",
        deficit: "Déficit máximo:",
        turn: "Mes de cruce a positivo:",
      },
    },
    investorNarrativeView: {
      headerTitle: "Narrativa / Estrategia",
      investmentSummaryTitle: "Resumen de inversión",
      investmentSummaryItems: [
        "Organización de ventas AI-first con datos propios.",
        "Agentes de IA 24/7 que perfilan y escalan a brokers.",
        "Motor de demanda internacional con comisiones de alto margen.",
      ],
      tabs: {
        narrative: "Narrativa",
        bigdata: "Big Data",
        agents: "Agentes",
      },
      helperText:
        "Explora la narrativa, la estrategia de base de datos y cómo operan los agentes de IA.",
      descriptions: {
        narrative:
          "Construimos una organización de ventas AI-first, ligera y enfocada en datos para capturar demanda internacional.",
        bigdata:
          "Estrategia de datos para reactivar la base actual y adquirir cientos de miles de prospectos nuevos.",
      },
      sectionTitles: {
        summary: "Resumen",
        problem: "Problema",
        product: "Producto y ventaja",
        nextSteps: "Próximos pasos",
        roadmap: "Roadmap",
        bigData: "Estrategia base de datos 500K+",
        howAgentsWork: "Cómo operan los agentes",
        agentExamples: "Ejemplos de interacción",
      },
      summary:
        "Construir una organización de ventas AI-first, ligera y enfocada en datos, que use agentes de IA especializados y escalamiento a brokers para convertir la demanda de compradores internacionales de tierra y condos TAO en comisiones de alto margen.",
      problem: {
        intro:
          "El problema principal a resolver es cambiar el modelo de adquisición de clientes de: «yo pongo publicidad para que me encuentren» a: «primero veo quién es un cliente potencial para TAO y luego le doy el producto perfecto».",
        whyNowTitle: "Por qué ahora",
        whyNowItems: [
          "Los agentes de IA ya operan en WhatsApp, email y voz con suficiente madurez.",
          "TAO tiene inventario listo en Riviera Maya y Baja, más un motor propio de demanda que deja de depender de un master broker.",
          "Crece el comprador extranjero que quiere retirarse, diversificar o pasar el invierno en México.",
        ],
        logicTitle: "La empresa sigue la siguiente lógica:",
        logicSteps: [
          "¿Quién es mi comprador?",
          "¿Dónde está mi comprador?",
          "¿Cómo lo contacto?",
          "Match con mi producto perfecto.",
        ],
      },
      productAndAdvantage: {
        whatAgentsDo: {
          title: "Qué hacen los agentes",
          items: [
            "Cambio en adquisición: dejamos de depender del master broker y construimos un motor propio de demanda internacional.",
            "Concierge EN/ES en WhatsApp/email.",
            "Matcher de inventario en tiempo real.",
            "Agendado de tours virtuales/presenciales.",
            "Agente de finanzas/documentos y prellenado de ofertas.",
            "Handoff al broker con brief de 1 página.",
          ],
        },
        whyWin: {
          title: "Por qué ganamos",
          items: [
            "Inventario TAO + marca + historial de leads propio.",
            "Cobertura 24/7 bilingüe en WhatsApp, email y teléfono.",
            "Monetización por lanes (listing-led, co-broke, referidos).",
            "Pipeline completamente instrumentado y medible.",
            "Brainium (Dr. Roger Long) como consultor externo con fee mensual más success fee en mes 7, alineado a resultados.",
          ],
        },
      },
      nextSteps: [
        "Definir métricas clave de conversión.",
        "Diseñar experimento piloto con X leads.",
        "Integrar datos históricos de TAO en el modelo.",
        "Probar guiones y assets para WhatsApp/email.",
        "Documentar aprendizajes en playbook comercial.",
      ],
      roadmap: [
        {
          title: "0–6 meses",
          items: [
            "Piloto con leads existentes de TAO.",
            "Primer AI Sales Agent en producción.",
            "Integración básica con CRM y métricas diarias.",
            "Cierre de los primeros deals influenciados por IA.",
            "Playbook inicial de handoff a brokers aliados.",
          ],
        },
        {
          title: "6–12 meses",
          items: [
            "Expansión a Baja con inventario priorizado.",
            "Segundo vertical de producto (ej. ranchos sustentables).",
            "Más automatización en scoring y nurturing multicanal.",
            "Onboarding de más brokers con SLAs definidos.",
            "Iteraciones en revenue-share según desempeño.",
          ],
        },
        {
          title: "12–24 meses",
          items: [
            "Escalar a desarrolladores aliados fuera de TAO.",
            "Refinar modelo de revenue-share y comisiones.",
            "Productos de datos/insights para socios estratégicos.",
            "Suite estándar de agentes para venta y postventa.",
            "Canales recurrentes con comunidades de compradores.",
          ],
        },
      ],
      bigDataStrategy: {
        cards: [
          {
            title: "1. Reactivar y segmentar la base actual (80,000 registros)",
            items: [
              "Limpieza y enriquecimiento de datos: normalizar correos, teléfonos y países; eliminar rebotes duros; enriquecer con datos externos (edad, ciudad, estado, idioma, tipo de propiedad de interés cuando exista).",
              "Etiquetado por intención y antigüedad: segmentar en cohortes 2013–2016, 2017–2020, 2021–hoy; analizar aperturas de email, clics y visitas recientes para detectar quién sigue activo.",
              "Reactivación con agentes de IA: campañas de reactivación automatizadas por email/WhatsApp que pregunten de forma conversacional si siguen interesados en comprar en México, presupuesto, timing y producto preferido.",
              "Match con productos futuros: mapear prospectos que mencionan Baja California, invierno en EE. UU./Canadá o ticket 300–400k con productos como MonteRocella y ranchos sustentables.",
            ],
          },
          {
            title: "2. Adquisición activa de 300,000–500,000 nuevos prospectos extranjeros",
            items: [
              "Data partners y listas cualificadas: acuerdos con empresas que venden datos de high-net-worth individuals y pre-retirados en EE. UU., Canadá y Europa interesados en real estate internacional (similar a lo que hoy hace RETA, pero desintermediado).",
              "Audiencias por intención de compra: campañas pagadas segmentadas por: búsqueda de “buy property in Mexico”, “Baja California ranch”, “condos in Rosarito / Ensenada”, etc., cruzado con comportamientos de viaje en invierno.",
              "Lookalikes de compradores TAO: usar la base de clientes actuales para crear audiencias similares en Facebook/Instagram, Google y plataformas de native ads, optimizando a leads con capacidad de pagar ~1,500 USD mensuales de hipoteca.",
              "Canales orgánicos y comunidades: alianzas con newsletters y medios de retiro/inversión (internacionales) para captar leads a cambio de comisiones por cierre, reemplazando gradualmente el rol del master broker.",
              "Top of funnel enfocado en Baja California: contenido educativo sobre vivir el invierno en México, fiscalidad, financiamiento a 20–30 años y proyectos sustentables, con CTA directo hacia los agentes de IA.",
            ],
          },
          {
            title: "3. Segmentación por producto TAO y operación con equipo reducido",
            items: [
              "Segmentos de producto: MonteRocella (condos 350–400k USD), ranchos sustentables en Baja (2,500–10,000 m² con opción modular) y futuros desarrollos de playa. Cada segmento tiene mensajes y flujos de agente distintos.",
              "Segmentos de cliente: pre-jubilados de EE. UU./Canadá que huyen del frío; inversores buscando cashflow en USD; nómadas digitales de alto ingreso; europeos buscando residencia de invierno.",
              "Operación con 3–5 personas: el equipo humano se enfoca en estrategia, alianzas y cierres complejos; los agentes de IA hacen el 90% de calificación, nurturing y agendado, permitiendo escalar a cientos de miles de leads sin crecer headcount.",
              "Scoreo continuo: los leads se re-scorean dinámicamente según comportamiento (aperturas, clics, respuestas al chat, visitas a landing de Baja) y se pasan a brokers sólo cuando hay alta probabilidad de cierre.",
            ],
          },
        ],
        risks: {
          title: "Riesgos y mitigantes",
          items: [
            "Dependencia en inventario TAO; mitigación: brokers humanos en el loop y acuerdos adicionales con desarrolladores.",
            "Adopción de agentes de IA; mitigación: A/B testing de canales, scripts y handoff a broker cuando el lead prefiere hablar con una persona.",
            "Calidad de datos; mitigación: limpieza continua de la base y scoreo recurrente.",
            "Concentración geográfica; mitigación: diversificación gradual entre proyectos Riviera Maya y Baja.",
          ],
        },
      },
      agentsIntro:
        "Los agentes de IA actúan como concierge bilingüe 24/7: capturan leads, los perfilan y recomiendan el inventario correcto, escalando a humanos sólo en momentos clave para cerrar con mayor velocidad y consistencia.",
      howAgentsWork: {
        intro: [
          "Un agente de ventas de IA funciona como concierge bilingüe siempre disponible: recibe leads, los perfila y envía respuestas personalizadas en cuestión de segundos, sin depender de horarios.",
          "Opera sobre canales de TAO (web, WhatsApp, email) y datos de inventario en vivo para priorizar qué producto sugerir y cuándo escalar a un humano.",
        ],
        agents: [
          {
            pill: "Agente 1",
            title: "Captura y calificación 24/7",
            description: "Monitorea canales, detecta idioma, valida identidad y clasifica la intención en segundos.",
            items: [
              "Hace preguntas dinámicas (presupuesto, fechas, ubicación de interés).",
              "Scorea al lead según señales de compra y comportamiento previo.",
              "Sincroniza con CRM para evitar duplicados y perder contexto.",
            ],
          },
          {
            pill: "Agente 2",
            title: "Experiencia y producto",
            description: "Recomienda inventario y hace que el lead visualice la compra con recursos interactivos.",
            items: [
              "Entrega fichas técnicas, renders y mapas 3D con disponibilidad en tiempo real.",
              "Propone 2–3 unidades relevantes y agenda tours virtuales o presenciales.",
              "Responde dudas de HOA, financiamiento, impuestos y estilo de vida.",
            ],
          },
          {
            pill: "Agente 3",
            title: "Negociación y documentos",
            description: "Reduce fricción: recoge evidencias, arma ofertas y muestra el plan financiero completo.",
            items: [
              "Recopila ID, proof-of-funds y preferencias para prellenar la oferta.",
              "Genera calendario de pagos con HOA, impuestos y notas notariales.",
              "Escala al broker adecuado con brief de 1 página listo para la llamada.",
            ],
          },
          {
            pill: "Agente 4",
            title: "Seguimiento y cierre asistido",
            description: "Mantiene el ritmo hasta el cierre y actualiza a todos los involucrados en tiempo real.",
            items: [
              "Envia recordatorios, comparativas y nudges según actividad del lead.",
              "Coordina agenda entre comprador, broker y notaría; confirma tours y firmas.",
              "Reporta estado en el CRM y protege el crédito de venta para TAO.",
            ],
          },
        ],
      },
      agentExamples: [
        {
          step: "Paso 1",
          description:
            "Calibra presupuesto y fechas. «Hola Sarah, con base en tu presupuesto y fechas, seleccioné dos condos en la playa y uno que te encajan bien. ¿Te gusta ver el unit tour el jueves o viernes?»",
        },
        {
          step: "Paso 2",
          description:
            "Mapa interactivo y tiempos. Envía un mapa 3D con la unidad marcada, tiempos de caminata a playa/restaurantes y agenda una visita guiada con un clic.",
        },
        {
          step: "Paso 3",
          description:
            "Explica costos y pagos. Comparte un breakdown en lenguaje simple sobre HOA, reglas de uso y calendario de pagos mensuales/anuales para dar previsibilidad.",
        },
        {
          step: "Paso 4",
          description:
            "Reúne documentos y arma oferta. Solicita ID y proof-of-funds, valida nombres legales y prellena la oferta con los datos del comprador y la unidad preferida.",
        },
        {
          step: "Paso 5",
          description:
            "Handoff con contexto. Cuando el lead está calificado, envía al broker un brief de 1 página con historial de interacciones, intereses y objeciones clave para acelerar el cierre.",
        },
        {
          step: "Paso 6",
          description:
            "Nurturing y urgencia. Mantiene vivos a los prospectos con updates de obra, alertas de «últimas 3 unidades» y recordatorios de expiración de ofertas, activando el siguiente paso con un botón.",
        },
      ],
    },
  },
  en: {
    investorModelView: {
      headerTitle: "Investment model",
      heroSubtitle: "Assumptions and estimated returns",
      heroNote: "Tweak the inputs to see the real-time impact.",
      monthPositive: (month: number) => `Month ${month}`,
      keyStats: {
        closings: "Closings Y1",
        commissionRevenue: "Commission revenue Y1",
        netIncome: "Net income Y1",
        cashMonth: "Positive cash month",
        asp: "ASP",
        capture: "Capture",
        closeAndCpl: "Close / CPL",
        salaries: "Payroll Y1",
      },
      metricsGlossary: [
        "GMV: Gross merchandise value",
        "CPL: Cost per lead",
        "ASP: Average selling price",
      ],
      glossaryTitle: "Glossary",
      glossaryItems: [
        "GMV: Value of transacted properties",
        "Capture: Commission kept by TAO",
        "ASP: Average property price",
      ],
      howToReadTitle: "How to read",
      howToReadPoints: [
        "Adjust the controls to recalculate the model.",
        "Tables reflect the results with the current assumptions.",
        "Use Reset to restore the defaults.",
      ],
      howToReadDisclaimer: "Amounts in USD.",
      controlsTitle: "Controls",
      controlsRealtimeNote: "Changes update the model instantly.",
      resetButton: "Reset",
      controlGroups: {
        commercial: {
          title: "Commercial assumptions",
          aspLabel: "ASP (USD)",
          aspHelp: "Average selling price per closing.",
          captureLabel: "% Capture",
          captureHelp: "Commission percentage retained by TAO.",
          closeRateLabel: "% Close",
          closeRateHelp: "Share of leads that convert to sales.",
          cplLabel: "CPL (USD)",
          cplHelp: "Cost per lead generated.",
          closingsGroupTitle: "Closings / GMV",
          closingLabelY1: "Closings Y1",
          closingLabelY2: "Closings Y2",
          closingLabelY3: "Closings Y3",
          closingHelpY1: "Estimated GMV Y1: {gmv} with current ASP.",
          closingHelpY2: "Estimated GMV Y2: {gmv} with current ASP.",
          closingHelpY3: "Estimated GMV Y3: {gmv} with current ASP.",
        },
        team: {
          title: "Team",
          intro: "Configure salaries and hires by year.",
          srTitle: "AI Sr Analyst",
          jrTitle: "AI Jr Analyst",
          salaryLabel: "Monthly salary (USD)",
          salaryHelpSr: "Senior analyst salaries across hiring waves.",
          salaryHelpJr: "Junior analyst salaries across hiring waves.",
          countLabel: "Hires",
          srCountHelp: "Number of senior hires spread over years.",
          jrCountHelp: "Number of junior hires spread over years.",
          yearLabel: "Year",
        },
        brainium: {
          title: "Brainium",
          monthlyLabel: "Brainium monthly fee ({months} months)",
          monthlyHelp: "Fixed monthly fee during the initial months.",
          successLabel: "Success fee",
          successHelp: "Payment triggered on success.",
          revshareLabel: "% Revshare",
          revshareHelp: "Revenue share percentage.",
          totalsHelp: "Total per year: Y1 {y1}, Y2 {y2}, Y3 {y3}.",
        },
      },
      sectionTitles: {
        teamDashboard: "Team dashboard",
        unitEconomics: "Unit economics",
        pnl: "P&L",
        sensitivity: "Sensitivity",
        cash: "Cash",
      },
      teamTableHeaders: ["Role", "Monthly salary", "Start"],
      teamTableEmpty: "Add hires to see yearly costs.",
      unitEconomicsRows: {
        commission: "Commission per closing",
        acquisition: "Acquisition per closing",
        contribution: "Contribution per closing",
      },
      pnlHeaders: [
        "Year",
        "Closings",
        "GMV",
        "Leads",
        "Media",
        "Commission revenue",
        "% Broker",
        "Payroll",
        "Overhead",
        "Net income",
        "Net margin",
      ],
      sensitivityHeaders: [
        "Scenario",
        "Closings",
        "% Capture",
        "% Close / CPL",
        "GMV",
        "Leads / Media",
        "Commission revenue",
        "% Broker",
        "Payroll + OH",
        "Net income",
        "Net margin",
      ],
      cashChartTitle: "Cash flow Y1",
      cashSummaryTitle: "Cash summary",
      cashSummary: {
        burn: "Monthly burn pre-sales:",
        net: "Monthly net income post-sales:",
        deficit: "Max deficit:",
        turn: "Month turns positive:",
      },
    },
    investorNarrativeView: {
      headerTitle: "Narrative / Strategy",
      investmentSummaryTitle: "Investment summary",
      investmentSummaryItems: [
        "AI-first sales organization built on TAO’s own data.",
        "24/7 AI agents that profile leads and escalate to brokers.",
        "International demand engine with high-margin commissions.",
      ],
      tabs: {
        narrative: "Narrative",
        bigdata: "Big Data",
        agents: "Agents",
      },
      helperText:
        "Explore the narrative, the data strategy, and how the AI agents operate.",
      descriptions: {
        narrative:
          "We are building an AI-first sales organization, lean and data-driven, to capture international demand.",
        bigdata:
          "Data strategy to reactivate the current base and acquire hundreds of thousands of new prospects.",
      },
      sectionTitles: {
        summary: "Summary",
        problem: "Problem",
        product: "Product and advantage",
        nextSteps: "Next steps",
        roadmap: "Roadmap",
        bigData: "500K+ database strategy",
        howAgentsWork: "How agents operate",
        agentExamples: "Interaction examples",
      },
      summary:
        "Build an AI-first sales organization, lean and data-focused, using specialized AI agents and broker handoff to convert demand from international buyers of TAO land and condos into high-margin commissions.",
      problem: {
        intro:
          "The main challenge is to shift the acquisition model from: “I run ads so they find me” to: “I first identify who is a TAO-fit customer and then give them the perfect product.”",
        whyNowTitle: "Why now",
        whyNowItems: [
          "AI agents already work in WhatsApp, email, and voice with enough maturity.",
          "TAO has ready inventory in Riviera Maya and Baja plus its own demand engine, reducing dependence on a master broker.",
          "There is growing foreign buyer interest for retirement, diversification, or wintering in Mexico.",
        ],
        logicTitle: "The company follows this logic:",
        logicSteps: [
          "Who is my buyer?",
          "Where is my buyer?",
          "How do I reach them?",
          "Match with my perfect product.",
        ],
      },
      productAndAdvantage: {
        whatAgentsDo: {
          title: "What the agents do",
          items: [
            "Acquisition shift: stop relying on the master broker and build our own international demand engine.",
            "EN/ES concierge across WhatsApp/email.",
            "Real-time inventory matcher.",
            "Scheduling of virtual/on-site tours.",
            "Finance/documents agent with prefilled offers.",
            "Broker handoff with a one-page brief.",
          ],
        },
        whyWin: {
          title: "Why we win",
          items: [
            "TAO inventory + brand + proprietary lead history.",
            "24/7 bilingual coverage on WhatsApp, email, and phone.",
            "Monetization by lanes (listing-led, co-broke, referrals).",
            "Fully instrumented and measurable pipeline.",
            "Brainium (Dr. Roger Long) as an external advisor with a monthly fee plus success fee in month 7, aligned to results.",
          ],
        },
      },
      nextSteps: [
        "Define key conversion metrics.",
        "Design a pilot experiment with X leads.",
        "Integrate TAO historical data into the model.",
        "Test scripts and assets for WhatsApp/email.",
        "Document learnings in the commercial playbook.",
      ],
      roadmap: [
        {
          title: "0–6 months",
          items: [
            "Pilot with TAO’s existing leads.",
            "First AI Sales Agent in production.",
            "Basic CRM integration with daily metrics.",
            "First deals influenced by AI close.",
            "Initial handoff playbook for partner brokers.",
          ],
        },
        {
          title: "6–12 months",
          items: [
            "Expansion to Baja with prioritized inventory.",
            "Second product vertical (e.g., sustainable ranches).",
            "More automation in scoring and multichannel nurturing.",
            "Onboarding more brokers with defined SLAs.",
            "Revenue-share iterations based on performance.",
          ],
        },
        {
          title: "12–24 months",
          items: [
            "Scale to allied developers beyond TAO.",
            "Refine revenue-share and commission models.",
            "Data/insight products for strategic partners.",
            "Standard AI agent suite for sales and post-sales.",
            "Recurring channels with buyer communities.",
          ],
        },
      ],
      bigDataStrategy: {
        cards: [
          {
            title: "1. Reactivate and segment the current base (80,000 records)",
            items: [
              "Data cleaning and enrichment: normalize emails, phones, and countries; remove hard bounces; enrich with external data (age, city, state, language, property type of interest when available).",
              "Intention/recency tagging: cohorts 2013–2016, 2017–2020, 2021–today; analyze email opens, clicks, and recent visits to see who is still active.",
              "AI-agent reactivation: automated email/WhatsApp campaigns asking conversationally if they remain interested in buying in Mexico, budget, timing, and preferred product.",
              "Match with future products: map prospects mentioning Baja California, wintering in the U.S./Canada, or 300–400k tickets with products like MonteRocella and sustainable ranches.",
            ],
          },
          {
            title: "2. Active acquisition of 300,000–500,000 new foreign prospects",
            items: [
              "Data partners and qualified lists: agreements with firms selling data on high-net-worth individuals and pre-retirees in the U.S., Canada, and Europe interested in international real estate (similar to what RETA does today but disintermediated).",
              "Purchase-intent audiences: paid campaigns targeting “buy property in Mexico,” “Baja California ranch,” “condos in Rosarito / Ensenada,” etc., crossed with winter travel behaviors.",
              "TAO buyer lookalikes: use the current customer base to create lookalike audiences on Facebook/Instagram, Google, and native ad platforms, optimizing for leads able to pay roughly 1,500 USD monthly mortgages.",
              "Organic channels and communities: partnerships with retirement/investment newsletters and media (international) to capture leads in exchange for deal commissions, gradually replacing the master broker role.",
              "Top of funnel focused on Baja California: educational content about wintering in Mexico, taxes, 20–30 year financing, and sustainable projects, with direct CTAs to the AI agents.",
            ],
          },
          {
            title: "3. Segmentation by TAO product and lean operation",
            items: [
              "Product segments: MonteRocella (350–400k USD condos), sustainable ranches in Baja (2,500–10,000 m² with modular options), and future beach developments. Each segment has distinct agent scripts and flows.",
              "Customer segments: U.S./Canada pre-retirees escaping winter; investors seeking USD cashflow; high-income digital nomads; Europeans seeking winter residency.",
              "Operation with 3–5 people: the human team focuses on strategy, partnerships, and complex closes; AI agents handle 90% of qualification, nurturing, and scheduling, enabling scale to hundreds of thousands of leads without headcount growth.",
              "Continuous scoring: leads are dynamically rescored by behavior (opens, clicks, chat replies, visits to the Baja landing) and routed to brokers only when closing probability is high.",
            ],
          },
        ],
        risks: {
          title: "Risks and mitigations",
          items: [
            "Dependence on TAO inventory; mitigation: human brokers in the loop and additional developer agreements.",
            "AI agent adoption; mitigation: channel/script A/B tests and broker handoff when a lead prefers a person.",
            "Data quality; mitigation: continuous database cleaning and recurring scoring.",
            "Geographic concentration; mitigation: gradual diversification across Riviera Maya and Baja projects.",
          ],
        },
      },
      agentsIntro:
        "AI agents act as a 24/7 bilingual concierge: they capture leads, profile them, and recommend the right inventory, escalating to humans only at key moments to close faster and more consistently.",
      howAgentsWork: {
        intro: [
          "An AI sales agent works as an always-on bilingual concierge: it receives leads, profiles them, and sends personalized responses within seconds, without schedule constraints.",
          "It runs on TAO channels (web, WhatsApp, email) and live inventory data to prioritize which product to suggest and when to escalate to a human.",
        ],
        agents: [
          {
            pill: "Agent 1",
            title: "24/7 capture and qualification",
            description: "Monitors channels, detects language, validates identity, and classifies intent in seconds.",
            items: [
              "Asks dynamic questions (budget, dates, location of interest).",
              "Scores the lead based on buying signals and prior behavior.",
              "Syncs with the CRM to avoid duplicates and losing context.",
            ],
          },
          {
            pill: "Agent 2",
            title: "Experience and product",
            description: "Recommends inventory and helps the lead visualize the purchase with interactive resources.",
            items: [
              "Delivers spec sheets, renders, and 3D maps with real-time availability.",
              "Proposes 2–3 relevant units and schedules virtual or on-site tours.",
              "Answers HOA, financing, tax, and lifestyle questions.",
            ],
          },
          {
            pill: "Agent 3",
            title: "Negotiation and documents",
            description: "Reduces friction: gathers evidence, drafts offers, and shows the full financial plan.",
            items: [
              "Collects ID, proof-of-funds, and preferences to prefill the offer.",
              "Generates payment schedules with HOA, taxes, and notary notes.",
              "Escalates to the right broker with a one-page brief ready for the call.",
            ],
          },
          {
            pill: "Agent 4",
            title: "Follow-up and assisted closing",
            description: "Keeps momentum to the closing and updates every stakeholder in real time.",
            items: [
              "Sends reminders, comparisons, and nudges based on lead activity.",
              "Coordinates calendars between buyer, broker, and notary; confirms tours and signatures.",
              "Reports status in the CRM and protects TAO’s sales credit.",
            ],
          },
        ],
      },
      agentExamples: [
        {
          step: "Step 1",
          description:
            "Calibrate budget and dates. “Hi Sarah, based on your budget and dates, I selected two beach condos and one that fit well. Do you prefer to see the unit tour Thursday or Friday?”",
        },
        {
          step: "Step 2",
          description:
            "Interactive map and timing. Sends a 3D map with the unit highlighted, walking times to the beach/restaurants, and schedules a guided visit with one click.",
        },
        {
          step: "Step 3",
          description:
            "Explain costs and payments. Shares a simple breakdown of HOA, usage rules, and monthly/annual payment calendar to provide predictability.",
        },
        {
          step: "Step 4",
          description:
            "Gather documents and draft the offer. Requests ID and proof-of-funds, validates legal names, and prefills the offer with buyer details and preferred unit.",
        },
        {
          step: "Step 5",
          description:
            "Contextual handoff. Once qualified, sends the broker a one-page brief with interaction history, interests, and key objections to speed up the close.",
        },
        {
          step: "Step 6",
          description:
            "Nurturing and urgency. Keeps prospects warm with construction updates, “last 3 units” alerts, and offer-expiration reminders, triggering the next step with a button.",
        },
      ],
    },
  },
} as const;
