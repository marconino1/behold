"use client";

import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Link from "next/link";
import AuthOrDivider from "@/components/auth/AuthOrDivider";
import GoogleLogoMark from "@/components/auth/GoogleLogoMark";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import { createClient } from "@/lib/supabase/client";

const CARD_SHADOW =
  "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function SignupForm() {
  const captchaRef = useRef<HCaptcha>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setGoogleLoading(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) {
        setError(oauthError.message);
        setGoogleLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setGoogleLoading(false);
    }
  }

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

    const isDev = process.env.NODE_ENV === "development";
    if (!isDev && !captchaToken) {
      setError("Please complete the captcha");
      return;
    }

    setLoading(true);

    createClient()
      .auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName.trim() },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
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
            boxShadow: CARD_SHADOW,
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
        position: "relative",
        minHeight: "100vh",
        background: GRADIENT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 16px",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.2)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            textDecoration: "none",
          }}
        >
          <Icon name="arrow-left" size={18} color="white" />
        </Link>
      </div>
      <div style={{ marginBottom: 24 }}>
        <Leo state="idle" size="session" />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "white",
          borderRadius: 20,
          boxShadow: CARD_SHADOW,
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
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "14px 16px",
                borderRadius: 9999,
                border: "1px solid var(--color-border)",
                background: "white",
                boxShadow: CARD_SHADOW,
                cursor: googleLoading || loading ? "not-allowed" : "pointer",
                opacity: googleLoading || loading ? 0.7 : 1,
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: "var(--color-text)",
                boxSizing: "border-box",
              }}
            >
              <GoogleLogoMark size={20} />
              {googleLoading ? "Redirecting…" : "Continue with Google"}
            </button>

            <AuthOrDivider />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              marginTop: 16,
            }}
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
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{
                  width: "100%",
                  padding: "14px 44px 14px 16px",
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 16,
                  border: "1.5px solid #E8DDD0",
                  borderRadius: 12,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: 0,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
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
            <div style={{ position: "relative" }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                style={{
                  width: "100%",
                  padding: "14px 44px 14px 16px",
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 16,
                  border: "1.5px solid #E8DDD0",
                  borderRadius: 12,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: 0,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
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

          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 12,
              color: "var(--color-text-light)",
              textAlign: "center",
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            By creating an account, you agree to our{" "}
            <Link
              href="/privacy?from=signup"
              style={{
                color: "var(--color-gold)",
                textDecoration: "none",
              }}
              className="link-gold"
            >
              Privacy Policy
            </Link>
            .
          </p>
          </div>
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
