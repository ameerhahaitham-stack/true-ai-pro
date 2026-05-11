"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AssistantPage() {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) window.location.href = "/auth/login";
    };
    getUser();
  }, []);

  const analyze = async () => {
    if (!product.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <a href="/dashboard" style={{ color: "var(--text-dim)", fontSize: 13 }}>
            ← Dashboard
          </a>
          <h1
            className="text-2xl md:text-4xl font-bold mt-2"
            style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
          >
            AI Business Assistant
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 14, marginTop: 4 }}>
            Enter any product and AI will build your complete business plan
          </p>
        </div>

        <div
          className="p-6 rounded-2xl mb-8"
          style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.2)" }}
        >
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--text)" }}>
            What product do you want to sell?
          </label>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyze()}
              placeholder="e.g. wireless ear massager, portable blender, LED nail printer..."
              className="flex-1 px-4 py-3 rounded-lg text-sm outline-none min-w-64"
              style={{
                background: "var(--surface2)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--text)",
              }}
            />
            <button
              onClick={analyze}
              disabled={loading || !product.trim()}
              className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
              style={{ background: "var(--gold)", color: "var(--night)" }}
            >
              {loading ? "Analyzing..." : "Analyze Product"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {["Portable blender", "LED nail printer", "Magnetic phone wallet", "Smart posture corrector"].map((s) => (
              <button
                key={s}
                onClick={() => setProduct(s)}
                className="px-3 py-1.5 rounded-full text-xs transition-all"
                style={{
                  background: "var(--surface2)",
                  color: "var(--text-dim)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div
            className="p-4 rounded-xl mb-6 text-sm"
            style={{ background: "rgba(248,113,113,0.1)", color: "#F87171", border: "1px solid rgba(248,113,113,0.2)" }}
          >
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-20">
            <div
              className="text-lg font-semibold mb-2 animate-pulse"
              style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
            >
              AI is analyzing your product...
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
              Building your complete business plan
            </p>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-6">

            <div
              className="p-6 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid rgba(52,211,153,0.2)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: 24 }}>📊</span>
                <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 18, fontWeight: 600 }}>
                  Product Analysis
                </h2>
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.7 }}>
                {result.analysis}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Suggested Sell Price", value: result.sellPrice, icon: "💰" },
                { label: "Estimated Profit Margin", value: result.profitMargin, icon: "📈" },
                { label: "Best Platform", value: result.bestPlatform, icon: "🚀" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 rounded-2xl text-center"
                  style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.15)" }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div
                    className="font-bold text-lg mb-1"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
                  >
                    {item.value}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)" }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="p-6 rounded-2xl"
                style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: 20 }}>🏭</span>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                    Supplier Recommendation
                  </h3>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  {result.supplier}
                </p>
              </div>

              <div
                className="p-6 rounded-2xl"
                style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: 20 }}>📣</span>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                    Marketing Strategy
                  </h3>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  {result.marketing}
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: 20 }}>⚡</span>
                <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                  Action Plan
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {result.actionPlan?.map((step: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{ background: "var(--gold)", color: "var(--night)" }}
                    >
                      {i + 1}
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
