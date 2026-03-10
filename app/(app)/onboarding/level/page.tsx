"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { completeOnboardingAction } from "./actions";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

const LEVELS = [
  {
    id: "K0",
    label: "Beginner",
    description:
      "I'm new to the faith or curious about Catholicism for the first time.",
  },
  {
    id: "A1",
    label: "Journeying",
    description:
      "I'm in OCIA or in the early stages of entering the Catholic faith.",
  },
  {
    id: "C1",
    label: "Confirmed",
    description:
      "I've received the sacraments and know the basics. I'm ready to understand my faith at a deeper level.",
  },
  {
    id: "G1",
    label: "Formed",
    description:
      "My foundation is solid. I want to keep building — into theology, moral life, and the interior life.",
  },
] as const;

export default function OnboardingLevelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromProfile = searchParams.get("from") === "profile";

  const [userId, setUserId] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        if (user) setUserId(user.id);
      });
  }, []);

  useEffect(() => {
    if (!userId || !fromProfile) return;
    const supabase = createClient();
    supabase
      .from("profiles")
      .select("starting_lesson")
      .eq("id", userId)
      .single()
      .then(({ data }) => {
        if (data?.starting_lesson) setCurrentLevel(data.starting_lesson);
      });
  }, [userId, fromProfile]);

  useEffect(() => {
    if (fromProfile && currentLevel) setSelected(currentLevel);
  }, [fromProfile, currentLevel]);

  const handleSubmit = useCallback(async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await completeOnboardingAction(selected);
    } catch {
      setLoading(false);
    }
  }, [selected]);

  const needsConfirmation = selected === "C1" || selected === "G1";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: GRADIENT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Leo state="celebrating" size="session" />
      </div>

      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 32,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {fromProfile
          ? "Update your starting point"
          : "Where are you in your faith journey?"}
      </h1>

      <p
        style={{
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontSize: 15,
          color: "rgba(255,255,255,0.7)",
          textAlign: "center",
          maxWidth: 340,
          marginBottom: 32,
        }}
      >
        {fromProfile
          ? "Your progress won't be affected. Earlier lessons stay available to revisit any time."
          : "Be honest — there's no wrong answer. We'll start you in the right place."}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
          maxWidth: 400,
          marginBottom: 32,
        }}
      >
        {LEVELS.map((level) => {
          const isSelected = selected === level.id;
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setSelected(level.id)}
              style={{
                background: isSelected ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                border: isSelected
                  ? "1px solid #C8932A"
                  : "1px solid rgba(255,255,255,0.2)",
                borderRadius: 16,
                padding: "18px 20px",
                textAlign: "left",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <p
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "white",
                  margin: "0 0 6px 0",
                }}
              >
                {level.label}
              </p>
              <p
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.7)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {level.description}
              </p>
            </button>
          );
        })}
      </div>

      <div style={{ width: "100%", maxWidth: 400 }}>
        <Button
          variant="primary"
          fullWidth
          onClick={handleSubmit}
          loading={loading}
          disabled={!selected}
          style={{
            background: "var(--color-gold)",
            color: "white",
            borderRadius: 9999,
            opacity: selected ? 1 : 0.5,
            pointerEvents: selected ? "auto" : "none",
          }}
        >
          {needsConfirmation ? "Yes, start here →" : "Begin my journey →"}
        </Button>

        {needsConfirmation && (
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              textAlign: "center",
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            Foundation lessons stay available if you want to fill gaps later.
          </p>
        )}

        {submitError && (
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 14,
              color: "#ef4444",
              textAlign: "center",
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            {submitError}
          </p>
        )}
      </div>
    </div>
  );
}
