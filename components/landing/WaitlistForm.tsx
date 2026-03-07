"use client";

import { useState } from "react";
import { addToWaitlist } from "@/lib/waitlist";
import Button from "@/components/ui/Button";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    const result = await addToWaitlist(email);

    if (result.ok) {
      setStatus("success");
      setEmail("");
    } else if (result.error === "duplicate") {
      setStatus("duplicate");
    } else {
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <p
        style={{
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          margin: 0,
        }}
      >
        You&apos;re in. See you tomorrow.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "14px 18px",
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 16,
            border: "1.5px solid rgba(255,255,255,0.3)",
            borderRadius: 9999,
            background: "rgba(255,255,255,0.1)",
            color: "white",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <Button
          type="submit"
          variant="primary"
          loading={status === "loading"}
          disabled={status === "loading"}
          style={{
            background: "var(--color-gold)",
            color: "white",
            border: "none",
          }}
        >
          Join
        </Button>
      </div>
      {status === "duplicate" && (
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            color: "#FCA5A5",
            margin: 0,
            textAlign: "center",
          }}
        >
          You&apos;re already on the list.
        </p>
      )}
    </form>
  );
}
