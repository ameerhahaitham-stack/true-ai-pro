"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/lib/lang";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,8,16,0.95)", borderBottom: "1px solid rgba(200,151,58,0.15)", backdropFilter: "blur(12px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, direction: isRTL ? "rtl" : "ltr" }}>
        
        <a href={user ? "/dashboard" : "/"} style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 16, color: "var(--gold)", textDecoration: "none", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
          TRUE AI PRO
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={toggleLang} style={{ fontSize: 11, color: "var(--gold)", background: "rgba(200,151,58,0.1)", border: "1px solid rgba(200,151,58,0.3)", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}>
            {lang === "en" ? "العربية" : "English"}
          </button>

          {user && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, padding: "6px 10px", cursor: "pointer", color: "var(--text)", fontSize: 16, lineHeight: 1 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}

          {!user && (
            <a href="/auth/login" style={{ fontSize: 13, color: "var(--night)", background: "var(--gold)", padding: "6px 14px", borderRadius: 6, textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
              {t.sign_in}
            </a>
          )}
        </div>
      </div>

      {menuOpen && user && (
        <div style={{ background: "var(--surface)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 0" }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 20px", fontSize: 14, color: "var(--text-dim)", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.04)", textAlign: isRTL ? "right" : "left" }}>
              {link.label}
            </a>
          ))}
          <button onClick={handleLogout} style={{ display: "block", width: "100%", padding: "12px 20px", fontSize: 14, color: "#F87171", background: "none", border: "none", cursor: "pointer", textAlign: isRTL ? "right" : "left" }}>
            {t.sign_out}
          </button>
        </div>
      )}
    </nav>
  );
}
