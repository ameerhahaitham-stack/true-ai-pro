"use client";
import { useLang } from "@/lib/lang";

export default function Home() {
  const { t, isRTL } = useLang();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" dir={isRTL ? "rtl" : "ltr"}>
      <div className="text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs tracking-widest uppercase" style={{ border: "1px solid rgba(200,151,58,0.3)", background: "rgba(200,151,58,0.1)", color: "var(--gold)" }}>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          {t.tagline}
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6" style={{ fontFamily: "var(--font-syne)", background: "linear-gradient(135deg, #ffffff 0%, #E8B84B 50%, #ffffff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t.hero_title}
        </h1>
        <p className="text-lg md:text-xl mb-10" style={{ color: "var(--text-dim)" }}>{t.hero_sub}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/auth/signup" className="px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-all hover:-translate-y-0.5 text-center" style={{ background: "var(--gold)", color: "var(--night)" }}>{t.get_started}</a>
          <a href="/auth/login" className="px-8 py-4 rounded-lg font-semibold text-sm tracking-wide transition-all text-center" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "var(--text)" }}>{t.sign_in}</a>
        </div>
      </div>
    </main>
  );
}