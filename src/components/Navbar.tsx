"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    { label: "Trend Radar", href: "/dashboard/trends" },
    { label: "AI Assistant", href: "/dashboard/assistant" },
    { label: "Content Engine", href: "/dashboard/content" },
    { label: "Advanced AI", href: "/dashboard/autosource" },
  ];

  return (
    <nav
      style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(6,8,16,0.92)",
        borderBottom: "1px solid rgba(200,151,58,0.15)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "0 24px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", height: 60,
        }}
      >
        
          href={user ? "/dashboard" : "/"}
          style={{
            fontFamily: "var(--font-syne)", fontWeight: 800,
            fontSize: 18, color: "var(--gold)",
            textDecoration: "none", letterSpacing: "0.05em",
          }}
        >
          TRUE AI PRO
        </a>

        {user && (
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 13, color: "var(--text-dim)",
                  textDecoration: "none", letterSpacing: "0.03em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {user ? (
            <button
              onClick={handleLogout}
              style={{
                fontSize: 13, color: "var(--text-dim)",
                background: "none", border: "1px solid rgba(255,255,255,0.1)",
                padding: "6px 16px", borderRadius: 6, cursor: "pointer",
              }}
            >
              Sign out
            </button>
          ) : (
            
              href="/auth/login"
              style={{
                fontSize: 13, color: "var(--night)",
                background: "var(--gold)",
                padding: "6px 16px", borderRadius: 6,
                textDecoration: "none", fontWeight: 600,
              }}
            >
              Sign in
            </a>
          )}
        </div>
      </div>

      {menuOpen && user && (
        <div
          style={{
            background: "var(--surface)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px",
            display: "flex", flexDirection: "column", gap: 12,
          }}
        >
          {navLinks.map((link) => (
            
              key={link.label}
              href={link.href}
              style={{
                fontSize: 14, color: "var(--text-dim)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
