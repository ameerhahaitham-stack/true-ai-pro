"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const MOCK_TRENDS = [
  { id: 1, title: "AI-powered pet cameras", category: "Tech", country: "USA", score: 98, platform: "TikTok" },
  { id: 2, title: "Matcha skincare sets", category: "Beauty", country: "Japan", score: 95, platform: "Instagram" },
  { id: 3, title: "Portable blenders", category: "Kitchen", country: "UK", score: 93, platform: "TikTok" },
  { id: 4, title: "LED nail printers", category: "Beauty", country: "South Korea", score: 91, platform: "YouTube" },
  { id: 5, title: "Magnetic phone wallets", category: "Accessories", country: "Germany", score: 89, platform: "Instagram" },
  { id: 6, title: "Smart posture correctors", category: "Health", country: "Australia", score: 87, platform: "TikTok" },
  { id: 7, title: "Mini waffle makers", category: "Kitchen", country: "Canada", score: 85, platform: "YouTube" },
  { id: 8, title: "Glow-in-dark hoodies", category: "Fashion", country: "Brazil", score: 83, platform: "TikTok" },
  { id: 9, title: "Wireless ear massagers", category: "Health", country: "UAE", score: 81, platform: "Instagram" },
  { id: 10, title: "Foldable water bottles", category: "Outdoor", country: "France", score: 79, platform: "TikTok" },
];

const CATEGORIES = ["All", "Tech", "Beauty", "Kitchen", "Health", "Fashion", "Accessories", "Outdoor"];
const PLATFORMS = ["All", "TikTok", "Instagram", "YouTube"];

const platformColor: Record<string, string> = {
  TikTok: "#010101",
  Instagram: "#E1306C",
  YouTube: "#FF0000",
};

const categoryColor: Record<string, string> = {
  Tech: "rgba(96,165,250,0.15)",
  Beauty: "rgba(244,114,182,0.15)",
  Kitchen: "rgba(251,191,36,0.15)",
  Health: "rgba(52,211,153,0.15)",
  Fashion: "rgba(167,139,250,0.15)",
  Accessories: "rgba(200,151,58,0.15)",
  Outdoor: "rgba(45,212,191,0.15)",
};

const categoryText: Record<string, string> = {
  Tech: "#60A5FA",
  Beauty: "#F472B6",
  Kitchen: "#FBBF24",
  Health: "#34D399",
  Fashion: "#A78BFA",
  Accessories: "#C8973A",
  Outdoor: "#2DD4BF",
};

export default function TrendsPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) window.location.href = "/auth/login";
      else setUser(user);
    };
    getUser();
  }, []);

  const filtered = MOCK_TRENDS.filter((t) => {
    const matchCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchPlatform = selectedPlatform === "All" || t.platform === selectedPlatform;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.country.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchPlatform && matchSearch;
  });

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <a href="/dashboard" style={{ color: "var(--text-dim)", fontSize: 13 }}>
              ← Dashboard
            </a>
            <h1
              className="text-4xl font-bold mt-2"
              style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
            >
              Trend Radar
            </h1>
            <p style={{ color: "var(--text-dim)", fontSize: 14, marginTop: 4 }}>
              Viral products worldwide — updated in real time
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-full text-xs font-semibold animate-pulse"
            style={{ background: "rgba(52,211,153,0.1)", color: "#34D399", border: "1px solid rgba(52,211,153,0.2)" }}
          >
            ● LIVE
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <input
            type="text"
            placeholder="Search products or countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg text-sm outline-none flex-1 min-w-48"
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text)",
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: selectedCategory === c ? "var(--gold)" : "var(--surface)",
                color: selectedCategory === c ? "var(--night)" : "var(--text-dim)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: selectedPlatform === p ? "var(--gold)" : "var(--surface)",
                color: selectedPlatform === p ? "var(--night)" : "var(--text-dim)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((trend, index) => (
            <div
              key={trend.id}
              className="p-5 rounded-2xl flex items-start gap-4 transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--surface)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="text-2xl font-bold w-10 text-center flex-shrink-0"
                style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                    {trend.title}
                  </h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: categoryColor[trend.category] || "rgba(255,255,255,0.08)",
                      color: categoryText[trend.category] || "var(--text-dim)",
                    }}
                  >
                    {trend.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <span className="text-xs" style={{ color: "var(--text-dim)" }}>
                    🌍 {trend.country}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: platformColor[trend.platform] + "22",
                      color: platformColor[trend.platform],
                      border: `1px solid ${platformColor[trend.platform]}44`,
                    }}
                  >
                    {trend.platform}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--text-dim)" }}>Viral Score</span>
                    <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>{trend.score}/100</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${trend.score}%`,
                        background: "linear-gradient(90deg, var(--gold), #E8B84B)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--text-dim)" }}>
            No trends found. Try a different filter.
          </div>
        )}

      </div>
    </main>
  );
}
