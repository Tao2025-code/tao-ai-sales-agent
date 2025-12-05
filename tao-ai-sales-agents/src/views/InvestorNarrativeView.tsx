import React, { useState } from "react";
import { Card, Section } from "../components/Layout";
import { copy, Language } from "../copy";
import { styles } from "../styles";

/** ---------------------------
 *  VISTA: NARRATIVA / STRATEGIA (Slide 2)
 *  --------------------------- */
const InvestorNarrativeView: React.FC<{ language: Language }> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<"narrativa" | "bigdata" | "agents">(
    "narrativa"
  );
  const t = copy[language].narrative;

  return (
    <div data-language={language} style={styles.wrap}>
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

export default InvestorNarrativeView;
