/* global React */

const INTEREST_ENDPOINT = "https://jeno-energy-e92646de1825.herokuapp.com/api/public/interest";

async function submitInterest(fields) {
  const res = await fetch(INTEREST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ website: "", ...fields }),
  });
  if (!res.ok) throw new Error("submit failed: " + res.status);
}

function jenoAsset(path) {
  // When bundled standalone, resources are lifted into window.__resources.
  const map = (typeof window !== "undefined" && window.__resources) || {};
  if (path.indexOf("logo_primary_wordmark") !== -1 && map.logoPrimaryWordmark) return map.logoPrimaryWordmark;
  if (path.indexOf("logo_reversed_wordmark") !== -1 && map.logoReversedWordmark) return map.logoReversedWordmark;
  if (path.indexOf("logo_primary") !== -1 && map.logoPrimary) return map.logoPrimary;
  if (path.indexOf("logo_reversed") !== -1 && map.logoReversed) return map.logoReversed;
  return path;
}

function Logo({ src, height = 28, alt = "Jeno Energy" }) {
  return (
    <img
      src={jenoAsset(src)}
      alt={alt}
      style={{
        height,
        width: "auto",
        display: "block",
        flexShrink: 0,
        maxWidth: "none",
        objectFit: "contain",
      }}
    />
  );
}

function ArrowRight({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M2.5 1.5v8l7-4-7-4Z" fill="currentColor" />
    </svg>
  );
}

function Eyebrow({ children, mobile, color, style }) {
  return (
    <span
      className={mobile ? "eyebrow-mobile" : "eyebrow"}
      style={{ color: color || "var(--aubergine)", ...(style || {}) }}
    >
      {children}
    </span>
  );
}

// ----- Nav -----
function Nav({ mobile }) {
  if (mobile) {
    return (
      <nav style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--n-200)",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Logo src="assets/logo_primary_wordmark.png" height={26} />
        <button style={{
          background: "var(--mint)",
          color: "var(--aubergine)",
          border: "none",
          borderRadius: 6,
          padding: "9px 14px",
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "var(--font-sans)",
          whiteSpace: "nowrap",
        }}>Get Early Access</button>
      </nav>
    );
  }
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 10,
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--n-200)",
      padding: "18px 56px",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "center",
      gap: 40,
    }}>
      <Logo src="assets/logo_primary_wordmark.png" height={38} />
      <div style={{ display: "flex", gap: 28, justifyContent: "center", fontSize: 13.5, color: "var(--aubergine)" }}>
        <a href="#why" style={navLinkStyle}>Why Jeno</a>
        <a href="#platform" style={navLinkStyle}>Platform & Features</a>
        <a href="#built-for" style={navLinkStyle}>Built For</a>
      </div>
      <a href="#trial" className="btn btn-mint" style={{ padding: "10px 16px", fontSize: 13 }}>
        Get Free Early Access
      </a>
    </nav>
  );
}
const navLinkStyle = { color: "var(--aubergine)", textDecoration: "none", fontWeight: 500 };

// ----- Section frame -----
function Section({ id, children, dark, mint, light, peach, lime, engine, pad = "narrow", mobile, bgStyle }) {
  const base = mobile ? "60px 20px" : (pad === "wide" ? "120px 56px" : pad === "tight" ? "72px 56px" : "96px 56px");
  let bg = "#fff", color = "var(--aubergine)";
  if (dark) { bg = "var(--aubergine)"; color = "#fff"; }
  if (mint) { bg = "var(--mint-bg)"; }
  if (light) { bg = "var(--n-50)"; }
  if (peach) { bg = "var(--peach-50)"; }
  if (lime) { bg = "var(--lime-50)"; }
  if (engine) { bg = "var(--engine-bg)"; }
  return (
    <section id={id} style={{ background: bg, color, padding: base, position: "relative", overflow: "hidden", ...(bgStyle || {}) }}>
      <div style={{ maxWidth: mobile ? "100%" : 1180, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

// ----- HERO -----
function Hero({ mobile }) {
  return (
    <Section mobile={mobile} pad="wide" dark bgStyle={{
      background: "radial-gradient(115% 85% at 82% 8%, #4A2E96 0%, #341F7C 42%, #2C1B5C 68%, #211444 100%)",
    }}>
      {/* mint accent glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: mobile ? -120 : -160,
        right: mobile ? -140 : -120,
        width: 520,
        height: 520,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,200,150,0.22) 0%, rgba(0,200,150,0) 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1.05fr 1fr",
        gap: mobile ? 36 : 72,
        alignItems: "center",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 20 : 28 }}>
          <Eyebrow mobile={mobile} color="var(--mint)" style={{ lineHeight: 1.4 }}>
            The AI-Powered Solar Structuring Engine for bankable C&amp;I projects
          </Eyebrow>
          <h1 style={{
            fontSize: mobile ? 36 : 60,
            letterSpacing: "-0.028em",
            lineHeight: 1.02,
            fontWeight: 700,
            color: "#fff",
          }}>
            Engineer bankable C&amp;I solar from day one.
          </h1>
          <p style={{
            fontSize: mobile ? 15 : 17,
            lineHeight: 1.55,
            color: "rgba(255,255,255,0.74)",
            maxWidth: 540,
            textWrap: "pretty",
          }}>
            Jeno elevates commercial and industrial (C&amp;I) solar sizing into a unified
            structuring process, so teams can size, simulate, validate, and structure systems
            that withstand technical and financial diligence, and reliably meet each client's
            commercial energy objectives.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btn-mint" style={{ padding: "12px 18px", fontSize: 14 }}>
              Get Free Early Access <ArrowRight />
            </a>
          </div>
        </div>

        {/* Visuals column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <window.ScreenshotFrame
            src="assets/images/projects-screen.png"
            alt="Jeno project portfolio, five commercial solar projects with PV, inverter, and battery sizing"
            breadcrumb="jeno / solar-projects"
          />
        </div>
      </div>
    </Section>
  );
}

function PlaceholderTag({ label }) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      color: "var(--n-500)",
      padding: "5px 9px",
      border: "1px dashed var(--n-300)",
      borderRadius: 3,
      background: "var(--n-50)",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: "var(--n-300)",
      }} />
      Placeholder, {label.replace("PLACEHOLDER, ", "")}
    </div>
  );
}

// ----- WHY -----
function WhySection({ mobile }) {
  return (
    <Section id="why" mobile={mobile} light pad="wide">
      <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 28 : 44 }}>
        <Eyebrow mobile={mobile}>Why Jeno</Eyebrow>
        <h2 style={{
          fontSize: mobile ? 34 : 64,
          lineHeight: 1.02,
          letterSpacing: "-0.028em",
          maxWidth: mobile ? "100%" : 1100,
          textWrap: "balance",
        }}>
          Engineering-grade structuring for C&amp;I solar.
        </h2>
        <p style={{
          fontSize: mobile ? 16 : 19,
          lineHeight: 1.55,
          color: "var(--n-700)",
          textWrap: "pretty",
          maxWidth: 820,
        }}>
          Jeno is built for teams who need engineering-led C&amp;I solar designs that are
          technically defensible, commercially aligned, grounded in real data, and bankable.
          Jeno replaces fragmented data across multiple channels and workflows with a single
          engineering-grade structuring process that brings clarity, consistency, and rigor
          to every project.
        </p>
        <WhyPillars mobile={mobile} />
      </div>
    </Section>
  );
}

function WhyPillars({ mobile }) {
  const pillars = [
    {
      title: "Technically defensible",
      body: "Traceable assumptions and explicit pass-or-fail checks that hold up under diligence.",
      bg: "var(--engine-bg)",
      accent: "var(--aubergine)",
    },
    {
      title: "Commercially aligned",
      body: "Sizing tied to consumption, peak demand, and each client's energy objectives.",
      bg: "var(--peach-50)",
      accent: "var(--peach)",
    },
    {
      title: "Grounded in real data",
      body: "Real consumption, sun-hour, and site inputs, never rules of thumb.",
      bg: "var(--lime-50)",
      accent: "var(--lime-olive)",
    },
    {
      title: "Bankable",
      body: "Structured to withstand technical and financial review from day one.",
      bg: "var(--mint-bg)",
      accent: "var(--mint)",
    },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)",
      gap: mobile ? 12 : 16,
      paddingTop: mobile ? 4 : 12,
    }}>
      {pillars.map((p) => (
        <div key={p.title} style={{
          background: p.bg,
          borderRadius: 12,
          padding: mobile ? "22px 20px" : "26px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          minHeight: mobile ? "auto" : 190,
        }}>
          <span style={{
            width: 30,
            height: 4,
            borderRadius: 2,
            background: p.accent,
          }} />
          <h3 style={{ fontSize: mobile ? 18 : 20, lineHeight: 1.12, letterSpacing: "-0.02em" }}>
            {p.title}
          </h3>
          <p style={{ fontSize: mobile ? 13.5 : 14, lineHeight: 1.5, color: "var(--n-600)", textWrap: "pretty" }}>
            {p.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// ----- PLATFORM & FEATURES -----
function PlatformSection({ mobile }) {
  const stages = [
    {
      n: "01",
      title: "Energy Structuring",
      body: <>Real-world inputs go in: consumption, future loads, peak demand, tariff, operating hours, coordinates, sun-hour data. A load builder models consumption at asset level. A 15-minute simulation finds true peak demand, reconciles it with the billed peak, and drives sizing and battery validation with full traceability and clear pass or fail checks. <strong style={{ fontWeight: 700, color: "var(--aubergine)" }}>Ask Jeno AI</strong> assists throughout, sense-checking your inputs, flagging anomalies, and guiding sizing decisions in real time.</>,
      shots: {
        primary: {
          src: "assets/images/load-distribution-ai.png",
          alt: "Load distribution over a typical day with Ask Jeno AI panel",
          breadcrumb: "energy-structuring / load-profile",
          stage: "Ask Jeno AI",
        },
        outputs: [
          {
            src: "assets/images/energy-charts.png",
            alt: "Validated system performance summary with annual production, solar contribution, and CO2 reduction",
            breadcrumb: "energy-structuring / results",
          },
          {
            src: "assets/images/system-performance-summary.png",
            alt: "Monthly energy balance, production versus consumption, seasonal PSH, and battery state of charge",
            breadcrumb: "energy-structuring / analytics",
          },
        ],
      },
      Screen: window.Stage01Screen,
    },
    {
      n: "02",
      title: "System Equipment Selection",
      body: "The validated design becomes a bill of materials from a curated Tier-1 catalog. Ask Jeno AI auto-selects components based on the recommended sizing from your validated design. Datasheets are required before any component is committed, keeping the list defensible. The system is re-checked against the selected equipment to confirm the design still holds.",
      Screen: window.Stage02Screen,
    },
    {
      n: "03",
      title: "Site Feasibility",
      body: "Feasibility confirms the design holds on the ground. Needed versus available roof or ground area is checked so the engineered system is the buildable system. Site-visit photos and the engineer's assessment feed directly into feasibility.",
      Screen: window.Stage03Screen,
    },
  ];

  return (
    <Section id="platform" mobile={mobile}>
      <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 32 : 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
          <Eyebrow mobile={mobile}>Platform &amp; Features</Eyebrow>
          <h2 style={{ fontSize: mobile ? 30 : 44, lineHeight: 1.06 }}>
            One structuring engine, three gated stages.
          </h2>
          <p style={{ fontSize: mobile ? 15 : 17, lineHeight: 1.55, color: "var(--n-600)", textWrap: "pretty" }}>
            Jeno moves every project through three gated stages. A stage advances only when the
            engineering behind it genuinely holds.
          </p>
        </div>

        {/* Stage tracker */}
        <StageTracker mobile={mobile} />

        {/* Stages */}
        <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 56 : 96 }}>
          {stages.map((s, i) => (
            <StageBlock key={s.n} {...s} flipped={i % 2 === 1} mobile={mobile} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function StageTracker({ mobile }) {
  if (mobile) return null;
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 1,
      background: "var(--n-200)",
      border: "1px solid var(--n-200)",
      borderRadius: 6,
      overflow: "hidden",
    }}>
      {[
        ["01", "Energy Structuring"],
        ["02", "System Equipment"],
        ["03", "Site Feasibility"],
      ].map(([n, l], i) => (
        <div key={n} style={{
          background: "#fff",
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "relative",
        }}>
          <span className="mono" style={{
            fontSize: 11,
            color: "var(--mint)",
            fontWeight: 600,
            letterSpacing: 0.6,
          }}>{n}</span>
          <span style={{ fontSize: 14, fontWeight: 500, color: "var(--aubergine)" }}>{l}</span>
          {i < 2 && (
            <span style={{
              position: "absolute",
              right: -7,
              top: "50%",
              transform: "translateY(-50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid var(--n-200)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--mint)" }} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function StageBlock({ n, title, body, placeholder, shots, Screen, flipped, mobile }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "1fr 1.05fr",
      gap: mobile ? 24 : 56,
      alignItems: "center",
      direction: !mobile && flipped ? "rtl" : "ltr",
    }}>
      <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span className="mono" style={{
            fontSize: 11,
            color: "var(--mint)",
            fontWeight: 600,
            letterSpacing: 1,
            border: "1px solid rgba(0, 200, 150, 0.4)",
            padding: "3px 8px",
            borderRadius: 3,
            background: "rgba(0, 200, 150, 0.06)",
          }}>GATE {n}</span>
          <span style={{ height: 1, flex: 1, background: "var(--n-200)", maxWidth: 80 }} />
        </div>
        <h3 style={{ fontSize: mobile ? 26 : 32, lineHeight: 1.08 }}>{title}</h3>
        <p style={{ fontSize: mobile ? 14.5 : 16, lineHeight: 1.6, color: "var(--n-600)", textWrap: "pretty" }}>
          {body}
        </p>
      </div>
      <div style={{ direction: "ltr", display: "flex", flexDirection: "column", gap: shots ? 18 : 10 }}>
        {shots ? (
          <>
            <window.ScreenshotFrame {...shots.primary} />
            <div style={{
              display: "grid",
              gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
              gap: 16,
            }}>
              {shots.outputs.map((o) => (
                <window.ScreenshotFrame key={o.src} {...o} />
              ))}
            </div>
          </>
        ) : (
          <>
            {placeholder && <PlaceholderTag label={placeholder} />}
            <Screen />
          </>
        )}
      </div>
    </div>
  );
}

function InsideEngine({ mobile }) {
  const items = [
    {
      title: "Asset-level load builder",
      body: "15-minute simulation, true peak demand, reconciliation against billed peak.",
      icon: <IconLoad />,
    },
    {
      title: "Formula-driven sizing modules",
      body: "PV, battery, and inverter sizing with full traceability.",
      icon: <IconSizing />,
    },
    {
      title: "Simulation-based battery validation",
      body: "Iterative convergence with explicit pass or fail checks.",
      icon: <IconBattery />,
    },
    {
      title: "Analytics",
      body: "Energy-flow diagrams, monthly balance, typical-day curves, seasonal sun hours, battery state of charge.",
      icon: <IconAnalytics />,
    },
    {
      title: "Curated equipment catalog",
      body: "Tier-1 modules, inverters, batteries, and balance-of-system with datasheet-backed selection.",
      icon: <IconCatalog />,
    },
    {
      title: "Ask Jeno AI",
      body: "Real-time AI assistance throughout the structuring process, sense-checking inputs in the load builder and auto-selecting equipment during system selection.",
      icon: <IconAI />,
    },
  ];
  return (
    <Section mobile={mobile} engine pad="narrow">
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: mobile ? 24 : 36,
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Eyebrow mobile={mobile}>What's inside the engine</Eyebrow>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
          gap: 1,
          background: "var(--n-200)",
          border: "1px solid var(--n-200)",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          {items.map((it) => (
            <div key={it.title} style={{
              background: "#fff",
              padding: mobile ? "22px 20px" : "26px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              minHeight: mobile ? "auto" : 180,
            }}>
              <div style={{ color: "var(--aubergine)" }}>{it.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--aubergine)" }}>{it.title}</div>
              <div style={{ fontSize: 14, color: "var(--n-600)", lineHeight: 1.55 }}>{it.body}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ----- Engine icons (geometric, restrained) -----
function IconLoad() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3.5" y="3.5" width="21" height="21" rx="1" stroke="currentColor" strokeOpacity="0.4"/>
      <path d="M3.5 19 L8 16 L11 18 L14 12 L17 14 L20 7 L24.5 10" stroke="var(--mint)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="7" r="2" fill="var(--mint)"/>
    </svg>
  );
}
function IconSizing() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 4h20v20H4z" stroke="currentColor" strokeOpacity="0.4"/>
      <path d="M4 4l20 20M14 4v20M4 14h20" stroke="currentColor" strokeOpacity="0.25"/>
      <circle cx="14" cy="14" r="3" fill="var(--peach)"/>
    </svg>
  );
}
function IconBattery() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="8" width="20" height="12" rx="1.5" stroke="currentColor" strokeOpacity="0.4"/>
      <rect x="23" y="11" width="2.5" height="6" rx="0.5" stroke="currentColor" strokeOpacity="0.4"/>
      <rect x="5" y="10" width="11" height="8" rx="0.5" fill="var(--mint)"/>
    </svg>
  );
}
function IconArea() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 5 L24 5 L24 23 L4 23 Z" stroke="currentColor" strokeOpacity="0.4"/>
      <path d="M7 9 L18 9 L18 19 L7 19 Z" fill="var(--lime-olive)" fillOpacity="0.4" stroke="var(--aubergine)" strokeWidth="1.4"/>
    </svg>
  );
}
function IconAnalytics() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 24V4M4 24h20" stroke="currentColor" strokeOpacity="0.4"/>
      <rect x="8" y="14" width="3" height="8" fill="var(--peach)"/>
      <rect x="13" y="9" width="3" height="13" fill="var(--lime-olive)"/>
      <rect x="18" y="11" width="3" height="11" fill="var(--mint)"/>
    </svg>
  );
}
function IconCatalog() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3.5" y="5.5" width="9" height="9" stroke="currentColor" strokeOpacity="0.4"/>
      <rect x="15.5" y="5.5" width="9" height="9" stroke="currentColor" strokeOpacity="0.4"/>
      <rect x="3.5" y="17.5" width="9" height="6" stroke="currentColor" strokeOpacity="0.4"/>
      <rect x="15.5" y="17.5" width="9" height="6" fill="var(--mint)"/>
    </svg>
  );
}
function IconAI() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeOpacity="0.4"/>
      <path d="M9 20 L9 24 L13 20" fill="currentColor" fillOpacity="0.4"/>
      <path d="M14 9.5 L16 14.5 L11 14.5 Z" fill="var(--mint)"/>
      <circle cx="14" cy="16.2" r="1" fill="var(--mint)"/>
    </svg>
  );
}

// ----- BUILT FOR -----
function BuiltForSection({ mobile }) {
  const cards = [
    {
      role: "Engineers / EPCs",
      body: "Engineers and EPCs use Jeno to work from real data with transparent assumptions, consistent logic, and engineering-grade structuring that brings clarity and rigor to every design decision.",
      Glyph: GlyphEng,
    },
    {
      role: "Developers / PMs",
      body: "Developers and project managers use Jeno to align technical feasibility with commercial objectives early, reducing uncertainty and keeping projects moving without unnecessary back and forth.",
      Glyph: GlyphPM,
    },
    {
      role: "Financiers",
      body: "Financiers use Jeno for models built on defensible inputs, clear validation logic, and a transparent structuring process that supports confident technical and financial diligence.",
      Glyph: GlyphFin,
    },
  ];
  return (
    <Section id="built-for" mobile={mobile} lime>
      <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 32 : 56 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: mobile ? "100%" : 1100 }}>
          <Eyebrow mobile={mobile}>Built for</Eyebrow>
          <h2 style={{
            fontSize: mobile ? 30 : 42,
            lineHeight: 1.06,
            whiteSpace: mobile ? "normal" : "nowrap",
          }}>
            Built for the roles that carry the risk.
          </h2>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
          gap: 20,
        }}>
          {cards.map((c) => (
            <div key={c.role} style={{
              background: "#fff",
              border: "1px solid var(--n-200)",
              borderRadius: 8,
              padding: mobile ? "24px 22px" : "28px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              minHeight: mobile ? "auto" : 320,
            }}>
              <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }}>
                <c.Glyph />
              </div>
              <h3 style={{ fontSize: 20 }}>{c.role}</h3>
              <p style={{ fontSize: 14, color: "var(--n-600)", lineHeight: 1.55, textWrap: "pretty" }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function GlyphEng() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="2" y="2" width="40" height="40" rx="3" fill="var(--lime-50)"/>
      <path d="M10 32 L22 12 L34 32 Z" stroke="var(--aubergine)" strokeWidth="1.6"/>
      <circle cx="22" cy="22" r="3" fill="var(--lime-olive)"/>
      <path d="M10 32 h24" stroke="var(--aubergine)" strokeWidth="1.6"/>
    </svg>
  );
}
function GlyphPM() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="2" y="2" width="40" height="40" rx="3" fill="var(--peach-50)"/>
      <rect x="9" y="13" width="26" height="3" fill="var(--aubergine)"/>
      <rect x="9" y="20" width="18" height="3" fill="var(--peach)"/>
      <rect x="9" y="27" width="22" height="3" fill="var(--aubergine)" fillOpacity="0.5"/>
    </svg>
  );
}
function GlyphFin() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="2" y="2" width="40" height="40" rx="3" fill="var(--mint-bg)"/>
      <path d="M10 30 L18 22 L24 27 L34 14" stroke="var(--aubergine)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="34" cy="14" r="3" fill="var(--mint)"/>
      <path d="M10 34 h24" stroke="var(--aubergine)" strokeWidth="1.6" strokeOpacity="0.3"/>
    </svg>
  );
}

// ----- CLOSING CTA (peach, carried from former pricing section) -----
function CheckGlyphLight() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6.5" fill="var(--mint-bg)" stroke="var(--mint)" strokeOpacity="0.4"/>
      <path d="M4 7.3 L6.2 9.2 L10 5.4" stroke="var(--pass)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ClosingCTA({ mobile }) {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrored(false);
    setSubmitting(true);
    try {
      await submitInterest({
        name,
        email,
        company,
        message: "Early access request",
        sourcePage: "www:get-early-access",
        website: honeypot,
      });
      setSubmitted(true);
    } catch (err) {
      setErrored(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="trial" peach mobile={mobile} pad="wide">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: mobile ? 24 : 32,
        textAlign: "center",
      }}>
        <Logo src="assets/logo_primary_wordmark.png" height={mobile ? 40 : 58} />
        <h2 style={{
          fontSize: mobile ? 30 : 50,
          color: "var(--aubergine)",
          lineHeight: 1.08,
          maxWidth: 900,
          textWrap: "balance",
        }}>
          Engineer your next C&amp;I project with traceable, defensible, validated numbers.
        </h2>
        <p style={{
          color: "var(--n-700)",
          fontSize: mobile ? 15 : 17,
          maxWidth: 660,
          lineHeight: 1.55,
          textWrap: "pretty",
        }}>
          Run a real project through the Jeno Platform today.
        </p>
        {submitted ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(0, 200, 150, 0.12)",
            border: "1px solid var(--mint)",
            borderRadius: 8,
            padding: "16px 22px",
            maxWidth: 540,
          }}>
            <CheckGlyphLight />
            <span style={{ fontSize: mobile ? 14.5 : 16, color: "var(--aubergine)", fontWeight: 500, textWrap: "pretty" }}>
              You're in. We'll be in touch shortly to set up your access.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              gap: 8,
              alignItems: mobile ? "stretch" : "center",
              background: "#fff",
              border: "1px solid var(--n-200)",
              borderRadius: 8,
              padding: 6,
              width: mobile ? "100%" : "auto",
              maxWidth: 640,
            }}
          >
            {/* Honeypot - hidden from real users, bots tend to fill every input */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              aria-hidden="true"
            />
            <input
              type="text"
              required
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                border: mobile ? "1px solid var(--n-200)" : "none",
                borderRadius: mobile ? 6 : 0,
                outline: "none",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--aubergine)",
                background: "transparent",
                padding: mobile ? "10px 12px" : "10px 12px",
                width: mobile ? "100%" : 160,
              }}
            />
            <input
              type="email"
              required
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: mobile ? "1px solid var(--n-200)" : "none",
                borderRadius: mobile ? 6 : 0,
                outline: "none",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--aubergine)",
                background: "transparent",
                padding: mobile ? "10px 12px" : "10px 12px",
                width: mobile ? "100%" : 200,
              }}
            />
            <input
              type="text"
              placeholder="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              style={{
                border: mobile ? "1px solid var(--n-200)" : "none",
                borderRadius: mobile ? 6 : 0,
                outline: "none",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                color: "var(--aubergine)",
                background: "transparent",
                padding: mobile ? "10px 12px" : "10px 12px",
                width: mobile ? "100%" : 160,
              }}
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-mint"
              style={{ padding: "12px 20px", fontSize: 14, fontFamily: "var(--font-sans)", width: mobile ? "100%" : "auto" }}
            >
              {submitting ? "Sending…" : <React.Fragment>Get Free Early Access <ArrowRight /></React.Fragment>}
            </button>
          </form>
        )}
        {errored && !submitted && (
          <span style={{ fontSize: 13, color: "var(--n-700)" }}>
            Something went wrong — please try again in a moment.
          </span>
        )}
      </div>
    </Section>
  );
}

// ----- UPDATES CATCH -----
function UpdatesSection({ mobile }) {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [errored, setErrored] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrored(false);
    setSubmitting(true);
    try {
      await submitInterest({
        name: "Updates subscriber",
        email,
        message: "Signed up for email updates",
        sourcePage: "www:updates",
      });
      setDone(true);
    } catch (err) {
      setErrored(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section mobile={mobile} light pad="tight">
      <div style={{
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        gap: mobile ? 24 : 80,
        alignItems: "center",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h3 style={{ fontSize: mobile ? 24 : 30, lineHeight: 1.1 }}>Want updates?</h3>
          <p style={{ fontSize: mobile ? 14.5 : 16, color: "var(--n-600)", lineHeight: 1.6, textWrap: "pretty" }}>
            Leave your email and we will send occasional updates on Jeno, including new
            capabilities and what we are learning from C&amp;I projects in the field.
          </p>
        </div>
        {done ? (
          <p style={{ fontSize: mobile ? 14.5 : 16, color: "var(--aubergine)", fontWeight: 500 }}>
            Thanks — you're on the list.
          </p>
        ) : (
          <form style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            background: "#fff",
            border: "1px solid var(--n-200)",
            borderRadius: 8,
            padding: 6,
            flexDirection: mobile ? "column" : "row",
          }} onSubmit={handleSubmit}>
            <label style={{ flex: 1, width: mobile ? "100%" : "auto", display: "flex", flexDirection: "column", gap: 2, padding: "6px 10px" }}>
              <span className="mono" style={{ fontSize: 10, color: "var(--n-500)", letterSpacing: 0.6, textTransform: "uppercase" }}>
                Work email
              </span>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--aubergine)",
                  background: "transparent",
                  padding: 0,
                  width: "100%",
                }}
              />
            </label>
            <button type="submit" disabled={submitting} className="btn btn-outline-aub" style={{
              padding: "10px 16px",
              fontSize: 13,
              width: mobile ? "100%" : "auto",
            }}>
              {submitting ? "Sending…" : "Sign up for updates"}
            </button>
          </form>
        )}
        {errored && !done && (
          <span style={{ fontSize: 13, color: "var(--n-700)" }}>
            Something went wrong — please try again in a moment.
          </span>
        )}
      </div>
    </Section>
  );
}

// ----- FOOTER -----
function Footer({ mobile }) {
  return (
    <footer style={{
      background: "#fff",
      borderTop: "1px solid var(--n-200)",
      padding: mobile ? "40px 20px 32px" : "56px 56px 40px",
    }}>
      <div style={{
        maxWidth: 1180,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1.2fr 1fr 1.4fr",
        gap: mobile ? 32 : 56,
        alignItems: "start",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Logo src="assets/logo_primary_wordmark.png" height={38} />
          <p style={{ fontSize: 13, color: "var(--n-600)", lineHeight: 1.5, maxWidth: 280 }}>
            Jeno Energy. The AI-Powered Solar Structuring Engine for bankable C&amp;I projects.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 6 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <a style={footLink}>Why Jeno</a>
            <a style={footLink}>Platform &amp; Features</a>
            <a style={footLink}>Built For</a>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 6 }}>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", flexWrap: "wrap", gap: mobile ? 10 : 22, fontSize: 14 }}>
            <a style={footLink}>Privacy Policy</a>
            <a style={footLink}>Terms of Service</a>
            <a style={footLink}>Careers</a>
            <a style={footLink}>Contact</a>
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: 1180,
        margin: "32px auto 0",
        paddingTop: 20,
        borderTop: "1px solid var(--n-200)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: mobile ? "column" : "row",
        gap: 12,
      }}>
        <span style={{ fontSize: 12, color: "var(--n-500)" }}>© 2026 Jeno Energy.</span>
      </div>
    </footer>
  );
}
const footLink = { color: "var(--aubergine)", textDecoration: "none", cursor: "pointer" };

// ===== Main Homepage =====
function Homepage({ mobile = false }) {
  return (
    <div className="jeno-root" style={{ width: "100%" }}>
      <Nav mobile={mobile} />
      <Hero mobile={mobile} />
      <WhySection mobile={mobile} />
      <PlatformSection mobile={mobile} />
      <InsideEngine mobile={mobile} />
      <BuiltForSection mobile={mobile} />
      <ClosingCTA mobile={mobile} />
      <UpdatesSection mobile={mobile} />
      <Footer mobile={mobile} />
    </div>
  );
}

Object.assign(window, { Homepage });
