/* global React */
const { useMemo } = React;

// ---------- Window chrome wrapper for product screenshots ----------
function ProductChrome({ title, breadcrumb, stage, dark = true, children, density = "normal" }) {
  const bg = dark ? "#221547" : "#fff";
  const stroke = dark ? "rgba(255,255,255,0.08)" : "var(--n-200)";
  const headerBg = dark ? "#1a1138" : "var(--n-50)";
  const text = dark ? "rgba(255,255,255,0.92)" : "var(--aubergine)";
  const subtext = dark ? "rgba(255,255,255,0.45)" : "var(--n-500)";

  return (
    <div style={{
      background: bg,
      border: `1px solid ${stroke}`,
      borderRadius: 10,
      overflow: "hidden",
      color: text,
      boxShadow: dark
        ? "0 30px 60px -20px rgba(20, 10, 50, 0.45), 0 0 0 1px rgba(0, 200, 150, 0.04)"
        : "0 24px 50px -22px rgba(44, 27, 92, 0.18)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 14px",
        background: headerBg,
        borderBottom: `1px solid ${stroke}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: dark ? "#3a2c6a" : "#DFDEE1" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: dark ? "#3a2c6a" : "#DFDEE1" }} />
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: dark ? "#3a2c6a" : "#DFDEE1" }} />
          </div>
          <span className="mono" style={{ fontSize: 10.5, color: subtext, letterSpacing: 0.4 }}>
            {breadcrumb}
          </span>
        </div>
        {stage && (
          <span className="mono" style={{
            fontSize: 10,
            letterSpacing: 0.8,
            textTransform: "uppercase",
            color: dark ? "var(--mint)" : "var(--pass)",
            border: `1px solid ${dark ? "rgba(0,200,150,0.3)" : "rgba(0,170,127,0.25)"}`,
            padding: "2px 8px",
            borderRadius: 3,
          }}>
            {stage}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ---------- HERO: Energy Structuring (dark, dense, alive) ----------
function HeroProductScreen({ compact = false }) {
  // synthetic 96-bar typical-day curve (15-min intervals)
  const bars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 96; i++) {
      const t = i / 96;
      // base + working-hours hump + small noise
      const hump = Math.max(0, Math.sin((t - 0.27) * Math.PI * 1.45));
      const evening = Math.max(0, 0.3 * Math.exp(-Math.pow((t - 0.78) / 0.06, 2)));
      const noise = ((i * 9301 + 49297) % 233) / 233 * 0.07;
      arr.push(0.18 + hump * 0.68 + evening + noise);
    }
    return arr;
  }, []);
  const peakIdx = bars.indexOf(Math.max(...bars));

  if (compact) {
    return (
      <ProductChrome
        breadcrumb="energy-structuring"
        stage="Stage 01"
        dark
      >
        <div style={{ padding: "14px 14px 16px", display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
          {/* Stage chips (replaces sidebar) */}
          <div style={{ display: "flex", gap: 4, overflow: "hidden" }}>
            {[["01", true], ["02"], ["03"], ["04"]].map(([n, active]) => (
              <span key={n} className="mono" style={{
                fontSize: 9.5,
                padding: "3px 7px",
                borderRadius: 3,
                color: active ? "var(--mint)" : "rgba(255,255,255,0.4)",
                border: `1px solid ${active ? "rgba(0,200,150,0.3)" : "rgba(255,255,255,0.08)"}`,
                background: active ? "rgba(0,200,150,0.08)" : "transparent",
                fontWeight: 600,
                flex: 1,
                textAlign: "center",
              }}>{n}</span>
            ))}
          </div>

          {/* Title */}
          <div style={{ minWidth: 0 }}>
            <div className="mono" style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)", letterSpacing: 0.8 }}>
              TYPICAL DAY · 15-MIN SIMULATION
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginTop: 3 }}>
              Load profile, weekday
            </div>
          </div>

          {/* Chart */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 5,
            padding: "12px 10px 8px",
            minWidth: 0,
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 80 }}>
              {bars.map((v, i) => {
                const isPeak = i === peakIdx;
                return (
                  <div key={i} style={{
                    flex: 1,
                    minWidth: 0,
                    height: `${v * 100}%`,
                    background: isPeak ? "var(--mint)" : "rgba(233, 181, 160, 0.55)",
                    borderRadius: "1px 1px 0 0",
                  }} />
                );
              })}
            </div>
            <div className="mono" style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 8.5,
              color: "rgba(255,255,255,0.4)",
            }}>
              <span>00:00</span><span>12:00</span><span>24:00</span>
            </div>
          </div>

          {/* Metrics stacked vertically */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
            {[
              ["resolved_peak", "386.4 kW", true],
              ["billed_peak", "392.0 kW"],
              ["reconciliation", "−1.4%"],
            ].map(([k, v, hi]) => (
              <div key={k} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 10px",
                background: "rgba(255,255,255,0.025)",
                borderRadius: 4,
                minWidth: 0,
              }}>
                <span className="mono" style={{ fontSize: 10.5, color: "rgba(255,255,255,0.55)" }}>{k}</span>
                <span className="mono" style={{
                  fontSize: 11.5,
                  color: hi ? "var(--mint)" : "#fff",
                  fontWeight: 500,
                }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Validation */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0, 200, 150, 0.08)",
            border: "1px solid rgba(0, 200, 150, 0.25)",
            borderRadius: 5,
            padding: "8px 10px",
            minWidth: 0,
            gap: 8,
          }}>
            <span className="mono" style={{ fontSize: 10, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              check.peak_reconciliation
            </span>
            <span className="chip chip-pass" style={{ fontSize: 9, flexShrink: 0 }}>Pass</span>
          </div>
        </div>
      </ProductChrome>
    );
  }

  return (
    <ProductChrome
      breadcrumb="projects / lagos-warehouse-04 / energy-structuring"
      stage="Stage 01 · Active"
      dark
    >
      <div style={{ display: "grid", gridTemplateColumns: "190px 1fr", minHeight: 360 }}>
        {/* Sidebar */}
        <div style={{
          background: "#1a1138",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          <SideStage n="01" label="Energy Structuring" active />
          <SideStage n="02" label="System Equipment" />
          <SideStage n="03" label="Site Feasibility" />
          <SideStage n="04" label="KYC" />
          <div style={{ flex: 1 }} />
          <div className="mono" style={{ fontSize: 9.5, color: "rgba(255,255,255,0.35)", marginTop: 12, lineHeight: 1.6 }}>
            <div>project_id</div>
            <div style={{ color: "rgba(255,255,255,0.7)" }}>JNO-2026-0418</div>
          </div>
        </div>

        {/* Main */}
        <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
                TYPICAL DAY · 15-MIN SIMULATION
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginTop: 4 }}>
                Load profile, weekday
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
              <Metric label="resolved_peak" value="386.4" unit="kW" highlight />
              <Metric label="billed_peak" value="392.0" unit="kW" />
              <Metric label="reconciliation" value="−1.4%" />
            </div>
          </div>

          {/* Chart */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 6,
            padding: "14px 14px 10px",
            position: "relative",
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 110 }}>
              {bars.map((v, i) => {
                const isPeak = i === peakIdx;
                return (
                  <div key={i} style={{
                    flex: 1,
                    height: `${v * 100}%`,
                    background: isPeak ? "var(--mint)" : "rgba(233, 181, 160, 0.55)",
                    borderRadius: "1px 1px 0 0",
                    position: "relative",
                  }}>
                    {isPeak && (
                      <div style={{
                        position: "absolute",
                        top: -22,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "var(--mint)",
                        color: "var(--aubergine)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "1px 6px",
                        borderRadius: 3,
                        whiteSpace: "nowrap",
                      }}>
                        386.4 kW
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mono" style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              fontSize: 9.5,
              color: "rgba(255,255,255,0.4)",
            }}>
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
            </div>
          </div>

          {/* Asset rows */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <AssetRow name="HVAC, main hall" kw="142.0" pct="36.7%" />
            <AssetRow name="Production line A" kw="98.3" pct="25.4%" />
            <AssetRow name="Compressors (x4)" kw="71.2" pct="18.4%" />
            <AssetRow name="Lighting + ancillary" kw="74.9" pct="19.5%" />
          </div>

          {/* Validation bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(0, 200, 150, 0.08)",
            border: "1px solid rgba(0, 200, 150, 0.25)",
            borderRadius: 6,
            padding: "10px 14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="dot" style={{ background: "var(--mint)" }} />
              <span className="mono" style={{ fontSize: 11, color: "#fff" }}>
                check.peak_reconciliation
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                within ±5% tolerance
              </span>
            </div>
            <span className="chip chip-pass">Pass</span>
          </div>
        </div>
      </div>
    </ProductChrome>
  );
}

function SideStage({ n, label, active }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 10px",
      borderRadius: 5,
      background: active ? "rgba(0,200,150,0.10)" : "transparent",
      border: active ? "1px solid rgba(0,200,150,0.22)" : "1px solid transparent",
    }}>
      <span className="mono" style={{
        fontSize: 10,
        color: active ? "var(--mint)" : "rgba(255,255,255,0.4)",
        fontWeight: 600,
      }}>{n}</span>
      <span style={{
        fontSize: 11.5,
        color: active ? "#fff" : "rgba(255,255,255,0.55)",
        fontWeight: active ? 500 : 400,
      }}>{label}</span>
    </div>
  );
}

function Metric({ label, value, unit, highlight }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}>
      <span className="mono" style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)", letterSpacing: 0.6, textTransform: "uppercase" }}>
        {label}
      </span>
      <span className="mono" style={{
        fontSize: 15,
        fontWeight: 600,
        color: highlight ? "var(--mint)" : "#fff",
      }}>
        {value}{unit && <span style={{ fontSize: 10, opacity: 0.6, marginLeft: 2 }}>{unit}</span>}
      </span>
    </div>
  );
}

function AssetRow({ name, kw, pct }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 12px",
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderRadius: 5,
    }}>
      <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)" }}>{name}</span>
      <div style={{ display: "flex", gap: 14 }}>
        <span className="mono" style={{ fontSize: 11, color: "#fff" }}>{kw} kW</span>
        <span className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{pct}</span>
      </div>
    </div>
  );
}

// ---------- STAGE 01: load builder + curve (compact card) ----------
function Stage01Screen() {
  const bars = useMemo(() => Array.from({ length: 48 }, (_, i) => {
    const t = i / 48;
    const hump = Math.max(0, Math.sin((t - 0.27) * Math.PI * 1.45));
    return 0.22 + hump * 0.7 + ((i * 7919) % 113) / 113 * 0.06;
  }), []);
  const peakIdx = bars.indexOf(Math.max(...bars));

  return (
    <ProductChrome breadcrumb="energy-structuring / load-builder" stage="01" dark>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Load builder</span>
          <span className="chip chip-pass">Peak reconciled</span>
        </div>
        {/* asset list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            ["HVAC, main hall", "142.0", "16h"],
            ["Production line A", "98.3", "12h"],
            ["Compressors (x4)", "71.2", "20h"],
            ["Lighting + aux.", "74.9", "14h"],
          ].map(([n, kw, h]) => (
            <div key={n} style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: 12,
              padding: "7px 10px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: 4,
              fontSize: 11,
            }}>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{n}</span>
              <span className="mono" style={{ color: "#fff" }}>{kw} kW</span>
              <span className="mono" style={{ color: "rgba(255,255,255,0.5)" }}>{h}</span>
            </div>
          ))}
        </div>
        {/* mini chart */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 5,
          padding: "10px 10px 6px",
        }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 60 }}>
            {bars.map((v, i) => (
              <div key={i} style={{
                flex: 1,
                height: `${v * 100}%`,
                background: i === peakIdx ? "var(--mint)" : "rgba(233, 181, 160, 0.5)",
                borderRadius: "1px 1px 0 0",
              }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Metric label="resolved_peak" value="386.4" unit="kW" highlight />
          <Metric label="billed_peak" value="392.0" unit="kW" />
          <Metric label="delta" value="−1.4%" />
        </div>
      </div>
    </ProductChrome>
  );
}

// ---------- STAGE 02: Bill of Materials ----------
function Stage02Screen() {
  const rows = [
    { cat: "MODULE",   model: "Tiger Neo 72HC-570W", mfr: "Jinko Solar", qty: "487", spec: "570 W" },
    { cat: "INVERTER", model: "SUN-50K-SG05LP3-EU",  mfr: "Deye",        qty: "4",   spec: "50 kW" },
    { cat: "BATTERY",  model: "Tower-Max",           mfr: "Dyness",      qty: "10",  spec: "20.48 kWh" },
  ];
  const cols = "78px 1fr 34px 64px 42px 78px";
  return (
    <ProductChrome breadcrumb="equipment-selection / bill-of-materials" stage="02" dark>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 13 }}>
        <button style={{
          alignSelf: "flex-start",
          background: "var(--aubergine-700)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 6,
          padding: "8px 13px",
          fontSize: 11.5,
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          cursor: "default",
        }}>
          <span style={{ color: "var(--mint)", fontSize: 12 }}>✦</span>
          Auto-select with Jeno AI
        </button>
        <div style={{
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 5,
          overflow: "hidden",
        }}>
          <div className="mono" style={{
            display: "grid",
            gridTemplateColumns: cols,
            background: "rgba(255,255,255,0.03)",
            padding: "7px 10px",
            fontSize: 9,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: 0.5,
            textTransform: "uppercase",
            gap: 6,
          }}>
            <span>Category</span>
            <span>Model / Mfr.</span>
            <span style={{ textAlign: "right" }}>Qty</span>
            <span>Key Spec</span>
            <span>Doc</span>
            <span style={{ textAlign: "right" }}>Actions</span>
          </div>
          {rows.map((r) => (
            <div key={r.model} style={{
              display: "grid",
              gridTemplateColumns: cols,
              padding: "9px 10px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              fontSize: 11,
              alignItems: "center",
              gap: 6,
            }}>
              <span className="mono" style={{ color: "rgba(255,255,255,0.6)", fontSize: 9.5, letterSpacing: 0.4 }}>{r.cat}</span>
              <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <span style={{ color: "#fff", fontSize: 11, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.model}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{r.mfr}</span>
              </span>
              <span className="mono" style={{ textAlign: "right", color: "#fff" }}>{r.qty}</span>
              <span className="mono" style={{ color: "rgba(255,255,255,0.75)", fontSize: 10.5 }}>{r.spec}</span>
              <span className="mono" style={{ color: "var(--mint)", fontSize: 10 }}>+ Add</span>
              <span className="mono" style={{ textAlign: "right", fontSize: 10, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <span style={{ color: "#8FB6FF" }}>Edit</span>
                <span style={{ color: "#FF8A9B" }}>Remove</span>
              </span>
            </div>
          ))}
        </div>
        <button style={{
          alignSelf: "flex-start",
          background: "rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 6,
          padding: "8px 13px",
          fontSize: 11.5,
          fontWeight: 500,
          cursor: "default",
        }}>
          + Add Component
        </button>
      </div>
    </ProductChrome>
  );
}

// ---------- STAGE 03: Site feasibility ----------
function SiteField({ label, req, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.72)", fontWeight: 500 }}>{label}</span>
        <span className="mono" style={{ fontSize: 8, letterSpacing: 0.4, textTransform: "uppercase", color: req === "required" ? "rgba(233,181,160,0.8)" : "rgba(255,255,255,0.3)" }}>{req}</span>
      </div>
      {children}
    </div>
  );
}
function SiteSelect({ placeholder = "Select…" }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 4, padding: "6px 9px",
      fontSize: 10.5, color: "rgba(255,255,255,0.45)",
    }}>
      {placeholder}
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  );
}
function SiteSeg({ options, active }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {options.map((o) => (
        <span key={o} style={{
          flex: 1, textAlign: "center",
          fontSize: 9.5, padding: "5px 4px", borderRadius: 4,
          background: o === active ? "rgba(0,200,150,0.16)" : "rgba(255,255,255,0.04)",
          border: `1px solid ${o === active ? "var(--mint)" : "rgba(255,255,255,0.1)"}`,
          color: o === active ? "var(--mint)" : "rgba(255,255,255,0.5)",
          fontWeight: o === active ? 600 : 400,
        }}>{o}</span>
      ))}
    </div>
  );
}
function SiteSection({ n, title, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span className="mono" style={{ fontSize: 9, color: "var(--mint)", letterSpacing: 0.6 }}>SECTION {n}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{title}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 14px" }}>
        {children}
      </div>
    </div>
  );
}
function Stage03Screen() {
  return (
    <ProductChrome breadcrumb="site-feasibility / site-assessment" stage="03" dark>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Site &amp; Roof Assessment</span>
          <span className="chip chip-pass" style={{ fontSize: 9 }}>Save Section</span>
        </div>

        <SiteSection n="2" title="Site & Roof Assessment">
          <SiteField label="Roof Type" req="required"><SiteSelect /></SiteField>
          <SiteField label="Roof Orientation" req="required"><SiteSelect /></SiteField>
          <SiteField label="Roof Condition" req="required"><SiteSeg options={["Good", "Fair", "Poor"]} active="Good" /></SiteField>
          <SiteField label="Structural Integrity" req="required"><SiteSeg options={["Confirmed", "Uncertain", "Inadequate"]} active="Confirmed" /></SiteField>
        </SiteSection>

        <SiteSection n="3" title="Shading Assessment">
          <SiteField label="Shading Sources Present" req="required"><SiteSelect /></SiteField>
          <SiteField label="Est. Shading Loss (%)" req="if applicable"><SiteSelect placeholder="e.g. 5" /></SiteField>
        </SiteSection>

        <SiteSection n="4" title="Electrical Infrastructure">
          <SiteField label="Main Breaker / Fuse Rating" req="required"><SiteSelect placeholder="—" /></SiteField>
          <SiteField label="Existing Earthing Condition" req="required"><SiteSelect /></SiteField>
          <SiteField label="Grid Connection Point Adequate" req="required"><SiteSelect /></SiteField>
          <SiteField label="DB to Inverter Distance (m)" req="required"><SiteSelect placeholder="—" /></SiteField>
        </SiteSection>
      </div>
    </ProductChrome>
  );
}

function Row({ k, v, highlight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span className="mono" style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}>{k}</span>
      <span className="mono" style={{ fontSize: 12, color: highlight ? "var(--mint)" : "#fff", fontWeight: 500 }}>{v}</span>
    </div>
  );
}

// ---------- STAGE 04: KYC ----------
function Stage04Screen() {
  const items = [
    ["ID verification, signatory", "passed"],
    ["Site address, geocoded", "passed"],
    ["Ownership confirmation", "passed"],
    ["Business registration, RC", "passed"],
    ["Tax identification", "passed"],
    ["Authorised representative", "passed"],
  ];
  return (
    <ProductChrome breadcrumb="kyc / diligence-package" stage="04" dark>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Diligence checks</span>
          <span className="chip chip-pass">Project complete</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {items.map(([label]) => (
            <div key={label} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 10px",
              background: "rgba(255,255,255,0.025)",
              borderRadius: 4,
              fontSize: 11,
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)" }}>
                <CheckGlyph />
                {label}
              </span>
              <span className="mono" style={{ fontSize: 10, color: "var(--mint)", textTransform: "uppercase", letterSpacing: 0.6 }}>
                pass
              </span>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 4,
          padding: "10px 12px",
          background: "rgba(0, 200, 150, 0.08)",
          border: "1px solid rgba(0, 200, 150, 0.25)",
          borderRadius: 5,
          fontSize: 11,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span>Project sealed. Bankable package ready.</span>
          <span className="mono" style={{ color: "var(--mint)", fontSize: 10.5 }}>JNO-2026-0418</span>
        </div>
      </div>
    </ProductChrome>
  );
}

function CheckGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5.5" stroke="var(--mint)" strokeOpacity="0.5" />
      <path d="M3.5 6.2 L5.2 7.8 L8.6 4.4" stroke="var(--mint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------- Real screenshot in light window chrome ----------
function ScreenshotFrame({ src, alt, breadcrumb, stage, caption }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: caption ? 8 : 0 }}>
      <ProductChrome breadcrumb={breadcrumb} stage={stage} dark={false}>
        <img
          src={src}
          alt={alt}
          style={{ display: "block", width: "100%", height: "auto" }}
        />
      </ProductChrome>
      {caption && (
        <span className="mono" style={{
          fontSize: 10.5,
          letterSpacing: 0.4,
          color: "var(--n-500)",
          lineHeight: 1.4,
        }}>
          {caption}
        </span>
      )}
    </div>
  );
}

Object.assign(window, {
  HeroProductScreen, Stage01Screen, Stage02Screen, Stage03Screen, Stage04Screen,
  ScreenshotFrame,
});
