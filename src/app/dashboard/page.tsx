"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) window.location.href = "/auth/login";
      else { setUser(user); setLoading(false); }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center">
      <p style={{ color: "var(--gold)" }}>Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>
              True AI Pro
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--text-dim)" }}>
              Welcome back, {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-dim)" }}
          >
            Sign out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Trend Radar", desc: "Viral products worldwide", status: "Live", href: "/dashboard/trends", active: true },
            { label: "AI Assistant", desc: "Source · Market · Sell", status: "Live", href: "/dashboard/assistant", active: true },
            { label: "Content Engine", desc: "One click → full campaign", status: "Live", href: "/dashboard/content", active: true },
          ].map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="p-6 rounded-2xl transition-all hover:-translate-y-1"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(200,151,58,0.4)",
                textDecoration: "none",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}>
                  {card.label}
                </h2>
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    color: "#34D399",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  {card.status}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-dim)" }}>{card.desc}</p>
              <div className="mt-4 h-1 rounded-full" style={{ background: "rgba(200,151,58,0.1)" }}>
                <div className="h-1 rounded-full" style={{ width: "100%", background: "#34D399" }} />
              </div>
            </a>
          ))}
        </div>

        <div
          className="p-6 rounded-2xl"
          style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            Platform status
          </h2>
          {[
            { phase: "Phase 1 — Foundation", done: true },
            { phase: "Phase 2 — Trend Radar + Heat Map", done: true },
            { phase: "Phase 3 — AI Business Assistant", done: true },
            { phase: "Phase 4 — Viral Content Generator", done: true },
            { phase: "Phase 5 — Auto-Source + AI Clone", done: false },
            { phase: "Phase 6 — Mobile App + Global Launch", done: false },
          ].map((item) => (
            <div
              key={item.phase}
              className="flex items-center gap-3 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{
                  background: item.done ? "var(--gold)" : "rgba(255,255,255,0.08)",
                  border: item.done ? "none" : "1px solid rgba(255,255,255,0.12)",
                }}
              />
              <span className="text-sm" style={{ color: item.done ? "var(--text)" : "var(--text-dim)" }}>
                {item.phase}
              </span>
              {item.done && (
                <span
                  className="ml-auto text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(52,211,153,0.1)", color: "#34D399" }}
                >
                  Complete
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
