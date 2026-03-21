"use client";

import { useEffect, useRef, useState } from "react";
import { submitFeedback } from "@/app/actions/submitFeedback";
import {
  FEEDBACK_TYPES,
  MAX_FEEDBACK_MESSAGE_LENGTH,
} from "@/lib/feedback";

export default function ProfileFeedbackSection({
  lightOnBlue,
}: {
  lightOnBlue?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>(FEEDBACK_TYPES[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [triggerHover, setTriggerHover] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  function resetForm() {
    setType(FEEDBACK_TYPES[0]);
    setMessage("");
    setError(null);
    setSuccess(false);
  }

  function closeModal() {
    if (loading) return;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(false);
    resetForm();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = message.trim();
    if (!trimmed) {
      setError("Please enter a message.");
      return;
    }
    if (trimmed.length > MAX_FEEDBACK_MESSAGE_LENGTH) {
      setError(
        `Message must be ${MAX_FEEDBACK_MESSAGE_LENGTH} characters or less.`
      );
      return;
    }

    setLoading(true);
    try {
      const result = await submitFeedback(type, message);
      if ("error" in result) {
        setError(result.error);
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        setOpen(false);
        resetForm();
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const charCount = message.length;
  const canSubmit =
    message.trim().length > 0 &&
    charCount <= MAX_FEEDBACK_MESSAGE_LENGTH &&
    !loading &&
    !success;

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            resetForm();
          }}
          onMouseEnter={() => lightOnBlue && setTriggerHover(true)}
          onMouseLeave={() => setTriggerHover(false)}
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            ...(lightOnBlue
              ? {
                  border: `1px solid ${
                    triggerHover
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(255,255,255,0.4)"
                  }`,
                  background: "transparent",
                  color: triggerHover
                    ? "rgba(255,255,255,0.92)"
                    : "rgba(255,255,255,0.8)",
                  borderRadius: 9999,
                  padding: "10px 22px",
                  transition: "color 0.15s ease, border-color 0.15s ease",
                }
              : {
                  color: "var(--color-text-light)",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }),
          }}
        >
          Share feedback
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "rgba(12, 74, 110, 0.45)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !loading && !success) closeModal();
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              background: "#FFFFFF",
              borderRadius: 16,
              boxShadow:
                "0 8px 32px rgba(60,40,10,0.1), 0 2px 12px rgba(60,40,10,0.06)",
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <p
                id="feedback-modal-title"
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#2C2016",
                  textAlign: "center",
                  margin: "12px 0 0 0",
                  lineHeight: 1.5,
                }}
              >
                Thank you — we appreciate you taking the time.
              </p>
            ) : (
              <>
                <h2
                  id="feedback-modal-title"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#2C2016",
                    margin: "0 0 8px 0",
                  }}
                >
                  Share feedback
                </h2>
                <p
                  style={{
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    fontSize: 14,
                    color: "#8C7A62",
                    margin: "0 0 20px 0",
                    lineHeight: 1.45,
                  }}
                >
                  Help us improve Behold. Your message goes directly to the team.
                </p>
                <form onSubmit={handleSubmit}>
                  <label
                    htmlFor="feedback-type"
                    style={{
                      display: "block",
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#2C2016",
                      marginBottom: 8,
                    }}
                  >
                    Type
                  </label>
                  <select
                    id="feedback-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    disabled={loading}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontSize: 15,
                      color: "#2C2016",
                      border: "1.5px solid var(--color-border)",
                      borderRadius: 12,
                      marginBottom: 18,
                      background: "white",
                      boxSizing: "border-box",
                    }}
                  >
                    {FEEDBACK_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <label
                    htmlFor="feedback-message"
                    style={{
                      display: "block",
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#2C2016",
                      marginBottom: 8,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="feedback-message"
                    value={message}
                    onChange={(e) =>
                      setMessage(
                        e.target.value.slice(0, MAX_FEEDBACK_MESSAGE_LENGTH)
                      )
                    }
                    required
                    rows={5}
                    disabled={loading}
                    placeholder="What would you like to tell us?"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontSize: 15,
                      color: "#2C2016",
                      border: "1.5px solid var(--color-border)",
                      borderRadius: 12,
                      resize: "vertical",
                      minHeight: 120,
                      boxSizing: "border-box",
                      marginBottom: 6,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: 16,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontSize: 12,
                        color:
                          charCount > MAX_FEEDBACK_MESSAGE_LENGTH
                            ? "#DC2626"
                            : "#8C7A62",
                      }}
                    >
                      {charCount} / {MAX_FEEDBACK_MESSAGE_LENGTH}
                    </span>
                  </div>

                  {error && (
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontSize: 14,
                        color: "#DC2626",
                        margin: "0 0 16px 0",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    style={{
                      width: "100%",
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontWeight: 800,
                      fontSize: 15,
                      color: "white",
                      background: canSubmit ? "#C8932A" : "#E8DDD0",
                      border: "none",
                      borderRadius: 9999,
                      padding: "14px 20px",
                      cursor: canSubmit ? "pointer" : "not-allowed",
                      marginBottom: 14,
                      boxShadow: canSubmit
                        ? "0 4px 0 rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)"
                        : "none",
                    }}
                  >
                    {loading ? "Sending…" : "Send feedback"}
                  </button>
                </form>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  style={{
                    display: "block",
                    width: "100%",
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#C8932A",
                    background: "none",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
