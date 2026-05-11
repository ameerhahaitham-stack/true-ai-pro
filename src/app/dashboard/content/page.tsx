"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ContentPage() {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("TikTok");
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

  const generate = async () => {
    if (!product.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, platform }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const CopyButton = ({ text, id }: { text: string; id: string }) => (
    <button
      onClick={() => copyToClipboard(text, id)}
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
            Viral Content Engine
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 14, marginTop: 4 }}>
            One product. One click. Full campaign ready to post.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl mb-8"
          style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.2)" }}
        >
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--text)" }}>
            What product do you want to promote?
          </label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="e.g. portable blender, LED nail printer, magnetic phone wallet..."
            className="w-full px-4 py-3 rounded-lg text-sm outline-none mb-4"
            style={{
              background: "var(--surface2)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text)",
            }}
          />

          <label className="block text-sm font-medium mb-3" style={{ color: "var(--text)" }}>
            Target platform
          </label>
          <div className="flex gap-2 mb-4 flex-wrap">
            {["TikTok", "Instagram", "YouTube"].map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: platform === p ? "var(--gold)" : "var(--surface2)",
                  color: platform === p ? "var(--night)" : "var(--text-dim)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {["Portable blender", "LED nail printer", "Smart posture corrector", "Magnetic phone wallet"].map((s) => (
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

          <button
            onClick={generate}
            disabled={loading || !product.trim()}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50"
            style={{ background: "var(--gold)", color: "var(--night)" }}
          >
            {loading ? "Generating your campaign..." : "Generate Full Campaign →"}
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
              AI is creating your viral campaign...
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: 14 }}>
              Writing script · Crafting caption · Building hashtags
            </p>
          </div>
        )}

        {result && (
          <div className="flex flex-col gap-5">

            <div
              className="p-5 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.3)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 20 }}>⚡</span>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                    The Hook — First 3 Seconds
                  </h3>
                </div>
                <CopyButton text={result.hook} id="hook" />
              </div>
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--gold)", fontFamily: "var(--font-syne)" }}
              >
                {result.hook}
              </p>
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 20 }}>🎬</span>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                    Full Video Script
                  </h3>
                </div>
                <CopyButton text={result.script} id="script" />
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
                {result.script}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div
                className="p-5 rounded-2xl"
                style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 20 }}>✍️</span>
                    <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                      Caption
                    </h3>
                  </div>
                  <CopyButton text={result.caption} id="caption" />
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  {result.caption}
                </p>
              </div>

              <div
                className="p-5 rounded-2xl"
                style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 20 }}>🎙️</span>
                    <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                      Voiceover
                    </h3>
                  </div>
                  <CopyButton text={result.voiceover} id="voiceover" />
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>
                  {result.voiceover}
                </p>
              </div>
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 20 }}>🏷️</span>
                  <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                    Hashtags
                  </h3>
                </div>
                <CopyButton text={result.hashtags} id="hashtags" />
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 2 }}>
                {result.hashtags}
              </p>
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: 20 }}>🖼️</span>
                <h3 style={{ fontFamily: "var(--font-syne)", fontSize: 15, fontWeight: 600 }}>
                  Thumbnail Description
                </h3>
              </div>
              <p style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.7 }}>
                {result.thumbnail}
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
