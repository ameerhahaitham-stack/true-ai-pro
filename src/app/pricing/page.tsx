import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      desc: "Perfect for testing the platform",
      color: "rgba(255,255,255,0.06)",
      borderColor: "rgba(255,255,255,0.08)",
      textColor: "var(--text)",
      features: [
        "10 AI analyses per day",
        "Trend Radar access",
        "5 content generations per day",
        "Basic supplier search",
        "Email support",
      ],
      cta: "Get Started Free",
      href: "/auth/signup",
      highlight: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      desc: "For serious sellers and creators",
      color: "rgba(200,151,58,0.08)",
      borderColor: "rgba(200,151,58,0.4)",
      textColor: "var(--gold)",
      features: [
        "Unlimited AI analyses",
        "Full Trend Radar + Heat Map",
        "Unlimited content generation",
        "Auto-Source supplier finder",
        "AI Personality Clone",
        "Collaboration Matching",
        "Priority support",
      ],
      cta: "Start Pro",
      href: "/auth/signup",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      desc: "For teams and agencies",
      color: "rgba(255,255,255,0.06)",
      borderColor: "rgba(255,255,255,0.08)",
      textColor: "var(--text)",
      features: [
        "Everything in Pro",
        "5 team members",
        "API access",
        "Custom AI training",
        "Dedicated account manager",
        "White-label option",
        "24/7 priority support",
      ],
      cta: "Contact Us",
      href: "/auth/signup",
      highlight: false,
    },
  ];

  return (
    <main style={{ minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 100, border: "1px solid rgba(200,151,58,0.3)", background: "rgba(200,151,58,0.1)", color: "var(--gold)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24 }}>
            Simple Pricing
          </div>
          <h1 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
            Start free.<br />Scale when ready.
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
            No credit card required to start. Upgrade when you are ready to scale.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.color,
                border: `1px solid ${plan.borderColor}`,
                borderRadius: 20,
                padding: 32,
                position: "relative",
              }}
            >
              {plan.highlight && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--gold)", color: "var(--night)", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 100, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20, fontWeight: 700, color: plan.textColor, marginBottom: 8 }}>
                  {plan.name}
                </h2>
                <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 16 }}>{plan.desc}</p>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-syne)", fontSize: 48, fontWeight: 800, color: plan.textColor }}>
                    {plan.price}
                  </span>
                  <span style={{ color: "var(--text-dim)", fontSize: 13 }}>{plan.period}</span>
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ color: "var(--gold)", fontSize: 14 }}>✓</span>
                    <span style={{ fontSize: 13, color: "var(--text-dim)" }}>{f}</span>
                  </div>
                ))}
              </div>

              
                href={plan.href}
                style={{
                  display: "block", textAlign: "center",
                  padding: "12px 24px", borderRadius: 10,
                  fontWeight: 600, fontSize: 14,
                  textDecoration: "none",
                  background: plan.highlight ? "var(--gold)" : "transparent",
                  color: plan.highlight ? "var(--night)" : "var(--text)",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 64, padding: 40, background: "var(--surface)", borderRadius: 20, border: "1px solid rgba(200,151,58,0.15)" }}>
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
            All plans include
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 20 }}>
            {["No credit card required", "Cancel anytime", "99.9% uptime SLA", "Data encrypted", "GDPR compliant", "Arabic + English"].map((item) => (
              <div key={item} style={{ fontSize: 13, color: "var(--text-dim)", padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
                ✓ {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
