"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const TABS = ["Auto-Source", "AI Clone", "Collaboration Match"];

export default function AutoSourcePage() {
  const [tab, setTab] = useState("Auto-Source");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) window.location.href = "/auth/login";
    };
    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/autosource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, mode: tab }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const CopyBtn = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copy(text, id)}
      className="text-xs px-3 py-1 rounded-full transition-all"
      style={{
        background: copied === id ? "rgba(52,211,153,0.2)" : "rgba(200,151,58,0.1)",
        color: copied === id ? "#34D399" : "var(--gold)",
        border: copied === id ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(200,151,58,0.2)",
      }}
    >
      {copied === id ? "Copied!" : "Copy"}
    </button>
  );

  const getPlaceholder = () => {
    if (tab === "Auto-Source") return "e.g. portable blender, LED nail printer...";
    if (tab === "AI Clone") return "Paste 3-5 examples of your content style here...";
    return "Describe your niche e.g. fitness products, beauty gadgets...";
  };

  const getLabel = () => {
    if (tab === "Auto-Source") return "What product do you want to source?";
    if (tab === "AI Clone") return "Share your content style and I will clone it";
    return "What is your niche or product category?";
  };

  const getButton = () => {
    if (tab === "Auto-Source") return "Find Best Suppliers →";
    if (tab === "AI Clone") return "Clone My Style →";
    return "Find My Matches →";
  };

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="mb-10">
          <a href="/dashboard" style={{ color: "var(--text-dim)", fontSize: 13 }}>
            ← Dashboard
          </a>
          <h1
            className="text-4xl font-bold mt-2"
            style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
          >
            Phase 5 — Advanced AI
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 14, marginTop: 4 }}>
            Auto-source products · Clone your style · Match with collaborators
          </p>
        </div>

        <div className="flex gap-1 mb-8 p-1 rounded-xl" style={{ background: "var(--surface)" }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setResult(null); setError(""); setInput(""); }}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === t ? "var(--gold)" : "transparent",
                color: tab === t ? "var(--night)" : "var(--text-dim)",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          className="p-6 rounded-2xl mb-8"
          style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.2)" }}
        >
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--text)" }}>
            {getLabel()}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholder()}
            rows={tab === "AI Clone" ? 5 : 2}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none mb-4"
            style={{
              background: "var(--surface2)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text)",
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
            style={{ background: "var(--gold)", color: "var(--night)" }}
          >
            {loading ? "AI is working..." : getButton()}
          </button>
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
              {tab === "Auto-Source" && "Finding best suppliers worldwide..."}
              {tab === "AI Clone" && "Learning your unique style..."}
              {tab === "Collaboration Match" && "Finding your perfect matches..."}
            </div>
          </div>
        )}

        {result && tab === "Auto-Source" && (
          <div className="flex flex-col gap-5">
            <div className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <h3 className="font-semibold mb-3" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>
                📦 Sourcing Summary
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>{result.summary}</p>
            </div>
            {result.suppliers?.map((s: any, i: number) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold" style={{ fontFamily: "var(--font-syne)", fontSize: 15 }}>
                    Supplier {i + 1} — {s.platform}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(200,151,58,0.1)", color: "var(--gold)" }}>
                    {s.rating}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><p className="text-xs" style={{ color: "var(--text-dim)" }}>Price Range</p><p className="text-sm font-medium">{s.priceRange}</p></div>
                  <div><p className="text-xs" style={{ color: "var(--text-dim)" }}>MOQ</p><p className="text-sm font-medium">{s.moq}</p></div>
                  <div><p className="text-xs" style={{ color: "var(--text-dim)" }}>Shipping</p><p className="text-sm font-medium">{s.shipping}</p></div>
                  <div><p className="text-xs" style={{ color: "var(--text-dim)" }}>Lead Time</p><p className="text-sm font-medium">{s.leadTime}</p></div>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: 12 }}>{s.notes}</p>
              </div>
            ))}
            <div className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="font-semibold mb-3" style={{ fontFamily: "var(--font-syne)", fontSize: 15 }}>⚡ Next Steps</h3>
              {result.nextSteps?.map((step: string, i: number) => (
                <div key={i} className="flex items-start gap-3 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: "var(--gold)", color: "var(--night)" }}>{i + 1}</div>
                  <p style={{ fontSize: 13, color: "var(--text-dim)" }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {result && tab === "AI Clone" && (
          <div className="flex flex-col gap-5">
            <div className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.3)" }}>
              <h3 className="font-semibold mb-2" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>🧬 Your Style Profile</h3>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>{result.styleProfile}</p>
            </div>
            {result.clonedPosts?.map((post: any, i: number) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold" style={{ fontFamily: "var(--font-syne)", fontSize: 14 }}>Generated Post {i + 1}</h3>
                  <CopyBtn text={post.content} id={`post-${i}`} />
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>{post.content}</p>
              </div>
            ))}
          </div>
        )}

        {result && tab === "Collaboration Match" && (
          <div className="flex flex-col gap-5">
            <div className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.3)" }}>
              <h3 className="font-semibold mb-2" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>🤝 Match Summary</h3>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>{result.summary}</p>
            </div>
            {result.matches?.map((match: any, i: number) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold" style={{ fontFamily: "var(--font-syne)", fontSize: 15 }}>{match.type}</h3>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(52,211,153,0.1)", color: "#34D399" }}>{match.matchScore}</span>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}>{match.description}</p>
                <p style={{ color: "var(--text-dim)", fontSize: 12 }}>Where to find: <span style={{ color: "var(--gold)" }}>{match.whereToFind}</span></p>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
