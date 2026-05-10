"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) setMessage(error.message);
    else setMessage("Account created! Check your email to confirm.");
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
          Create account
        </h1>
        <p className="mb-8 text-sm" style={{ color: "var(--text-dim)" }}>
          Join True AI Pro and start selling smarter
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none"
            style={{
              background: "var(--surface2)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text)",
            }}
          />
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
            <p className="text-sm" style={{ color: message.includes("created") ? "#34D399" : "#F87171" }}>
              {message}
            </p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{ background: "var(--gold)", color: "var(--night)" }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm" style={{ color: "var(--text-dim)" }}>
            Already have an account?{" "}
            <a href="/auth/login" style={{ color: "var(--gold)" }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
