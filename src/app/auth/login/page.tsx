"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else window.location.href = "/dashboard";
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ background: "var(--surface)", border: "1px solid rgba(200,151,58,0.2)" }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
        >
          Welcome back
        </h1>
        <p className="mb-8 text-sm" style={{ color: "var(--text-dim)" }}>
          Sign in to your True AI Pro account
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={{
              background: "var(--surface2)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text)",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={{
              background: "var(--surface2)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text)",
            }}
          />

          {message && (
            <p className="text-sm text-red-400">{message}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: "var(--gold)", color: "var(--night)" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm" style={{ color: "var(--text-dim)" }}>
            No account?{" "}
            <a href="/auth/signup" style={{ color: "var(--gold)" }}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
