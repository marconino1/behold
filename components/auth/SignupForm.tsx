"use client";

import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Link from "next/link";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";
import Icon from "@/components/icons/Icon";
import { createClient } from "@/lib/supabase/client";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);

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

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });
    setGoogleLoading(false);
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

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            padding: "13px 16px",
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#2C2016",
            background: "#FFFFFF",
            border: "1.5px solid #E8DDD0",
            borderRadius: 9999,
            boxShadow: "0 2px 8px rgba(60,40,10,0.08)",
            cursor: googleLoading ? "not-allowed" : "pointer",
            opacity: googleLoading ? 0.7 : 1,
            marginBottom: 20,
          }}
        >
          <GoogleIcon />
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "#E8DDD0" }} />
          <span
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 13,
              color: "#8C7A62",
              whiteSpace: "nowrap",
            }}
          >
            or
          </span>
          <div style={{ flex: 1, height: 1, background: "#E8DDD0" }} />
        </div>

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
