"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: GRADIENT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Leo state="idle" size="session" />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "white",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
          padding: 32,
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#2C2016",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 15,
            color: "#8C7A62",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Sign in to continue your journey
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#2C2016",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 16,
                border: "1.5px solid #E8DDD0",
                borderRadius: 12,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#2C2016",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "14px 16px",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 16,
                border: "1.5px solid #E8DDD0",
                borderRadius: 12,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <Link
              href="#"
              style={{
                display: "inline-block",
                marginTop: 8,
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 14,
                color: "#0EA5E9",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 14,
                color: "#DC2626",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Sign in
          </Button>
        </form>

        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 15,
            color: "#8C7A62",
            textAlign: "center",
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            style={{
              color: "#C8932A",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
