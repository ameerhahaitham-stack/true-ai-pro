"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/lang";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const { t, lang, toggleLang, isRTL } = useLang();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { label: t.trend_radar, href: "/dashboard/trends" },
    { label: t.ai_assistant, href: "/dashboard/assistant" },
    { label: t.content_engine, href: "/dashboard/content" },
    { label: t.advanced_ai, href: "/dashboard/autosource" },
    { label: t.pricing, href: "/pricing" },
  ];

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,8,16,0.92)", borderBottom: "1px solid rgba(200,151,58,0.15)", backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, direction: isRTL ? "rtl" : "ltr" }}>
        <a href={user ? "/dashboard" : "/"} style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 18, color: "var(--gold)", textDecoration: "none", letterSpacing: "0.05em" }}>
          {t.brand}
        </a>

        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} style={{ fontSize: 13, color: "var(--text-dim)", textDecoration: "none" }}>
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggleLang}
            style={{ fontSize: 12, color: "var(--gold)", background: "rgba(200,151,58,0.1)", border: "1px solid rgba(200,151,58,0.3)", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontWeight: 600, letterSpacing: "0.04em" }}
          >
            {lang === "en" ? "العربية" : "English"}
          </button>
          {user ? (
            <button onClick={handleLogout} style={{ fontSize: 13, color: "var(--text-dim)", background: "none", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 16px", borderRadius: 6, cursor: "pointer" }}>
              {t.sign_out}
            </button>
          ) : (
            <a href="/auth/login" style={{ fontSize: 13, color: "var(--night)", background: "var(--gold)", padding: "6px 16px", borderRadius: 6, textDecoration: "none", fontWeight: 600 }}>
              {t.sign_in}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
