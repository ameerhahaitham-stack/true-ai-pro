"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["All", "Tech", "Beauty", "Kitchen", "Health", "Fashion", "Outdoor"];
const PLATFORMS = ["All", "TikTok", "Instagram", "YouTube"];

const platformColor: Record<string, string> = {
  TikTok: "#69C9D0",
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
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [isRealData, setIsRealData] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) window.location.href = "/auth/login";
    };
    getUser();
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/trends");
      const data = await response.json();
      if (data.products) {
        setTrends(data.products);
        setLastUpdated(new Date(data.lastUpdated).toLocaleTimeString());
        setIsRealData(true);
      }
    } catch (e) {
      // fallback to sample data
      setTrends(SAMPLE_TRENDS);
    }
    setLoading(false);
  };

  const filtered = trends.filter((t) => {
    const matchCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchPlatform = selectedPlatform === "All" || t.platform === selectedPlatform;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.country.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchPlatform && matchSearch;
  });

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <a href="/dashboard" style={{ color: "var(--text-dim)", fontSize: 13 }}>← Dashboard</a>
            <h1 className="text-2xl md:text-4xl font-bold mt-1" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>
              Trend Radar
            </h1>
            <p style={{ color: "var(--text-dim)", fontSize: 13, marginTop: 2 }}>
              {isRealData ? "Live Google Trends data" : "Viral products worldwide"} 
              {lastUpdated && <span style={{ color: "var(--gold)", marginLeft: 8 }}>· Updated {lastUpdated}</span>}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isRealData && (
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 100, background: "rgba(96,165,250,0.1)", color: "#60A5FA", border: "1px solid rgba(96,165,250,0.2)" }}>
                Google Trends
              </span>
            )}
            <div className="px-3 py-1 rounded-full text-xs font-semibold animate-pulse" style={{ background: "rgba(52,211,153,0.1)", color: "#34D399", border: "1px solid rgba(52,211,153,0.2)" }}>
              ● LIVE
            </div>
            <button onClick={fetchTrends} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, background: "rgba(200,151,58,0.1)", color: "var(--gold)", border: "1px solid rgba(200,151,58,0.2)", cursor: "pointer" }}>
              Refresh
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search products or countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-sm outline-none mb-4"
          style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text)" }}
        />

        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setSelectedCategory(c)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all" style={{ background: selectedCategory === c ? "var(--gold)" : "var(--surface)", color: selectedCategory === c ? "var(--night)" : "var(--text-dim)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {PLATFORMS.map((p) => (
            <button key={p} onClick={() => setSelectedPlatform(p)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all" style={{ background: selectedPlatform === p ? "var(--gold)" : "var(--surface)", color: selectedPlatform === p ? "var(--night)" : "var(--text-dim)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {p}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-lg font-semibold animate-pulse" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>
              Fetching live trend data...
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: 13, marginTop: 8 }}>Connecting to Google Trends</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((trend, index) => (
              <div key={trend.id} className="p-4 rounded-2xl flex items-start gap-3 transition-all hover:-translate-y-0.5" style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="text-xl font-bold w-8 text-center flex-shrink-0" style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>{trend.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0" style={{ background: categoryColor[trend.category] || "rgba(255,255,255,0.08)", color: categoryText[trend.category] || "var(--text-dim)" }}>
                      {trend.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs" style={{ color: "var(--text-dim)" }}>🌍 {trend.country}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: (platformColor[trend.platform] || "#888") + "22", color: platformColor[trend.platform] || "#888", border: `1px solid ${(platformColor[trend.platform] || "#888")}44` }}>
                      {trend.platform}
                    </span>
                    {trend.realData && (
                      <span className="text-xs" style={{ color: "#60A5FA" }}>● Live</span>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs" style={{ color: "var(--text-dim)" }}>Viral Score</span>
                      <span className="text-xs font-bold" style={{ color: "var(--gold)" }}>{trend.score}/100</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${trend.score}%`, background: "linear-gradient(90deg, var(--gold), #E8B84B)" }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--text-dim)" }}>
            No trends found. Try a different filter.
          </div>
        )}

      </div>
    </main>
  );
}

const SAMPLE_TRENDS = [
  { id: 1, title: "AI-powered pet cameras", category: "Tech", country: "USA", score: 98, platform: "TikTok", realData: false },
  { id: 2, title: "Matcha skincare sets", category: "Beauty", country: "Japan", score: 95, platform: "Instagram", realData: false },
  { id: 3, title: "Portable blenders", category: "Kitchen", country: "UK", score: 93, platform: "TikTok", realData: false },
  { id: 4, title: "LED nail printers", category: "Beauty", country: "South Korea", score: 91, platform: "YouTube", realData: false },
  { id: 5, title: "Magnetic phone wallets", category: "Accessories", country: "Germany", score: 89, platform: "Instagram", realData: false },
  { id: 6, title: "Smart posture correctors", category: "Health", country: "Australia", score: 87, platform: "TikTok", realData: false },
  { id: 7, title: "Mini waffle makers", category: "Kitchen", country: "Canada", score: 85, platform: "YouTube", realData: false },
  { id: 8, title: "Glow-in-dark hoodies", category: "Fashion", country: "Brazil", score: 83, platform: "TikTok", realData: false },
  { id: 9, title: "Wireless ear massagers", category: "Health", country: "UAE", score: 81, platform: "Instagram", realData: false },
  { id: 10, title: "Foldable water bottles", category: "Outdoor", country: "France", score: 79, platform: "TikTok", realData: false },
];
