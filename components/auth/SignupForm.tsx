"use client";

import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Link from "next/link";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm() {
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("First name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    createClient()
      .auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName.trim() },
        },
      })
      .then(({ error: signUpError }) => {
        setLoading(false);
        if (signUpError) {
          setError(signUpError.message);
          captchaRef.current?.resetCaptcha();
          setCaptchaToken(null);
          return;
        }
        setSuccess(true);
      })
      .catch(() => {
        setLoading(false);
        setError("Something went wrong. Please try again.");
      });
  }

  if (success) {
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
          <Leo state="celebrating" size="session" />
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
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Check your email
          </h1>
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 16,
              color: "#8C7A62",
              textAlign: "center",
              marginBottom: 24,
              lineHeight: 1.5,
            }}
          >
            We&apos;ve sent you a link to confirm your account. Click it to get
            started.
          </p>
          <Link
            href="/login"
            style={{
              display: "block",
              textAlign: "center",
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 15,
              color: "#C8932A",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back to log in
          </Link>
        </div>
      </div>
    );
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
          Create your account
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
          Begin your journey with Behold
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label
              htmlFor="firstName"
              style={{
                display: "block",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#2C2016",
                marginBottom: 6,
              }}
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              autoComplete="given-name"
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
              autoComplete="new-password"
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
              htmlFor="confirmPassword"
              style={{
                display: "block",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: "#2C2016",
                marginBottom: 6,
              }}
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
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

          <div style={{ minHeight: 78 }}>
            <HCaptcha
              sitekey="0c9287ee-ef0a-4c20-958c-cffe47cc01fc"
              onVerify={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
              ref={captchaRef}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Create account
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
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#C8932A",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
