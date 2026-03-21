"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAccount } from "@/app/actions/deleteAccount";

const CONFIRM_TEXT = "DELETE";

export default function DeleteAccountSection({
  lightOnBlue,
}: {
  /** Readable link styling on blue gradient (profile hero). */
  lightOnBlue?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmInput, setConfirmInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canDelete =
    confirmInput.trim() === CONFIRM_TEXT && !loading;

  function closeModal() {
    if (loading) return;
    setOpen(false);
    setConfirmInput("");
    setError(null);
  }

  async function handleDelete() {
    if (!canDelete) return;
    setError(null);
    setLoading(true);
    try {
      const result = await deleteAccount();
      if ("error" in result) {
        setError(result.error);
        setLoading(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <section
        style={{
          textAlign: "center",
          marginTop: 20,
          marginBottom: 8,
        }}
      >
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setConfirmInput("");
            setError(null);
          }}
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: lightOnBlue ? "rgba(255,255,255,0.95)" : "var(--color-text-light)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
            textDecorationColor: lightOnBlue ? "rgba(255,255,255,0.7)" : undefined,
            textUnderlineOffset: 3,
            textShadow: lightOnBlue ? "0 1px 2px rgba(0,0,0,0.25)" : undefined,
          }}
        >
          Delete account
        </button>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-account-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "rgba(0,0,0,0.45)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              background: "white",
              borderRadius: 20,
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              padding: 28,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="delete-account-title"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#2C2016",
                margin: "0 0 12px 0",
              }}
            >
              Delete your account?
            </h2>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 15,
                color: "#8C7A62",
                lineHeight: 1.5,
                margin: "0 0 20px 0",
              }}
            >
              This will permanently delete your account, all your progress,
              streaks, and XP. This cannot be undone.
            </p>
            <label
              htmlFor="delete-confirm-input"
              style={{
                display: "block",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: "#2C2016",
                marginBottom: 8,
              }}
            >
              Type {CONFIRM_TEXT} to confirm
            </label>
            <input
              id="delete-confirm-input"
              type="text"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              autoComplete="off"
              disabled={loading}
              placeholder={CONFIRM_TEXT}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 16,
                border: "1.5px solid var(--color-border)",
                borderRadius: 12,
                outline: "none",
                boxSizing: "border-box",
                marginBottom: 16,
              }}
            />
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
              type="button"
              disabled={!canDelete}
              onClick={handleDelete}
              style={{
                width: "100%",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: "white",
                background: canDelete ? "#DC2626" : "#E5E7EB",
                border: "none",
                borderRadius: 12,
                padding: "14px 20px",
                cursor: canDelete ? "pointer" : "not-allowed",
                marginBottom: 16,
              }}
            >
              {loading ? "Deleting…" : "Permanently delete my account"}
            </button>
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
          </div>
        </div>
      )}
    </>
  );
}
