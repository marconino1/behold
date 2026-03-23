"use client";

import { useState } from "react";
import FeedbackModal from "@/components/shared/FeedbackModal";

export default function ProfileFeedbackSection({
  lightOnBlue,
}: {
  lightOnBlue?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [triggerHover, setTriggerHover] = useState(false);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
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

      <FeedbackModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
