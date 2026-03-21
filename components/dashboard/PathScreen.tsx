"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Leo from "@/components/mascot/Leo";
import {
  LESSONS,
  LESSON_ORDER,
  TIER_CONFIG,
} from "@/content/behold_lesson_content.js";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

type NodeState = "complete" | "active" | "skipped" | "locked";

interface DayPlanItem {
  day: number;
  learn: string;
  title: string;
}

interface SectionConfigItem {
  id: string;
  label: string;
  lessons: string[];
}

interface PathScreenProps {
  firstName: string;
  streak: number;
  xp: number;
  completedLessonIds: string[];
  skippedLessonIds: string[];
  startingLesson: string;
  dayPlan: DayPlanItem[];
  sectionConfig: SectionConfigItem[];
  isAdmin?: boolean;
  currentHearts: number;
  nextRefillAt: string | null;
}

type TierKey = keyof typeof TIER_CONFIG;

function getTierForLesson(lessonId: string): (typeof TIER_CONFIG)[TierKey] | null {
  for (const tier of Object.values(TIER_CONFIG)) {
    if (tier.lessons.includes(lessonId)) return tier;
  }
  return null;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function getNodeState(
  lessonId: string,
  completedIds: string[],
  skippedIds: string[],
  activeLessonId: string | null,
  noHearts: boolean,
  isAdmin?: boolean
): NodeState {
  if (completedIds.includes(lessonId)) return "complete";
  if (skippedIds.includes(lessonId)) return "skipped";
  if (activeLessonId === lessonId) return "active";
  if (isAdmin) return "skipped";
  if (activeLessonId) {
    const lessonIdx = LESSON_ORDER.indexOf(lessonId);
    const activeIdx = LESSON_ORDER.indexOf(activeLessonId);
    if (lessonIdx > activeIdx) return "locked";
  }
  if (noHearts) return "locked";
  return "locked";
}

function getStaggerTranslate(index: number): number {
  const mod = index % 4;
  if (mod === 0) return -60;
  if (mod === 1) return 0;
  if (mod === 2) return 60;
  return 0;
}

const NODE_BASE_SHADOW = "0 4px 0 rgba(0,0,0,0.35), 0 6px 12px rgba(0,0,0,0.25)";

export default function PathScreen({
  firstName,
  streak,
  xp,
  completedLessonIds,
  skippedLessonIds,
  startingLesson,
  dayPlan,
  sectionConfig,
  isAdmin = false,
  currentHearts,
  nextRefillAt: nextRefillAtStr,
}: PathScreenProps) {
  const sectionStarts = new Map<string, string>();
  sectionConfig.forEach((section) => {
    if (section.lessons.length > 0) {
      sectionStarts.set(section.lessons[0], section.label);
    }
  });

  const startIdx = LESSON_ORDER.indexOf(startingLesson);
  const activeIndex = dayPlan.findIndex(
    (d) =>
      !completedLessonIds.includes(d.learn) &&
      LESSON_ORDER.indexOf(d.learn) >= startIdx
  );
  const activeLessonId = activeIndex >= 0 ? dayPlan[activeIndex].learn : null;
  const noHearts = currentHearts === 0;

  const activeNodeRef = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const [countdown, setCountdown] = useState("0:00:00");
  const nextRefillAt = nextRefillAtStr ? new Date(nextRefillAtStr) : null;

  const hasStarted = completedLessonIds.length > 0;

  const tierFirstIndex = new Map<string, number>();
  dayPlan.forEach((d, i) => {
    const t = getTierForLesson(d.learn);
    if (t && !tierFirstIndex.has(t.label)) tierFirstIndex.set(t.label, i);
  });

  useEffect(() => {
    if (!activeLessonId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!hasStarted) return;
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLessonId, hasStarted]);

  function scrollToActiveLesson() {
    activeNodeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  useEffect(() => {
    if (!nextRefillAt || !noHearts) return;
    const tick = () => {
      const diff = nextRefillAt.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown("0:00:00");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [nextRefillAt, noHearts]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: GRADIENT,
        paddingBottom: 100,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        {/* Top section */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 18,
              color: "white",
              marginBottom: 4,
            }}
          >
            Behold
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              margin: 0,
            }}
          >
            Peace be with you, {firstName || "friend"}.
          </h1>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="streak" size={20} color="white" />
            <span
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                color: "white",
                fontSize: 14,
              }}
            >
              {streak === 0 ? "Start your streak today" : `${streak} day streak`}
            </span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Icon name="star" size={20} color="white" />
            <span
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                color: "white",
                fontSize: 14,
              }}
            >
              {xp} XP
            </span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Icon
                key={i}
                name="heart"
                size={20}
                color={i <= currentHearts ? "#DC2626" : "rgba(255,255,255,0.4)"}
              />
            ))}
          </div>
        </div>

        {activeLessonId && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <button
              type="button"
              onClick={scrollToActiveLesson}
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: "white",
                background: "#C8932A",
                border: "none",
                borderRadius: 9999,
                padding: "14px 28px",
                cursor: "pointer",
                boxShadow: "0 4px 0 rgba(0,0,0,0.2), 0 6px 16px rgba(0,0,0,0.15)",
              }}
            >
              {hasStarted ? "Continue" : "Start today's lesson"}
            </button>
          </div>
        )}

        {noHearts && (
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.25)",
              padding: "16px 20px",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                color: "white",
                fontSize: 14,
              }}
            >
              Next heart in {countdown}
            </span>
          </div>
        )}

        {/* Path section */}
        <style dangerouslySetInnerHTML={{ __html: `
          .path-node-tappable:active .path-node-circle {
            transform: translateY(2px) !important;
            box-shadow: 0 2px 0 rgba(0,0,0,0.35) !important;
          }
          @keyframes path-node-onboarding-pulse {
            0%, 100% {
              box-shadow: 0 4px 0 rgba(0,0,0,0.4), 0 6px 14px var(--pulse-ring-color, rgba(200,147,42,0.45));
            }
            50% {
              box-shadow: 0 4px 0 rgba(0,0,0,0.32), 0 8px 24px var(--pulse-ring-color, rgba(200,147,42,0.6)), 0 0 0 4px rgba(255,255,255,0.18);
            }
          }
          .path-node-onboarding-pulse {
            animation: path-node-onboarding-pulse 2.4s ease-in-out infinite;
          }
        `}} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {dayPlan.map((day, index) => {
              const lessonId = day.learn;
              const lesson = LESSONS[lessonId as keyof typeof LESSONS];
              const title = lesson?.title ?? day.title;
              const state = getNodeState(
                lessonId,
                completedLessonIds,
                skippedLessonIds,
                activeLessonId,
                noHearts,
                isAdmin
              );
              const staggerX = getStaggerTranslate(index);
              const tier = getTierForLesson(lessonId);
              const isFirstInTier = tier && tierFirstIndex.get(tier.label) === index;
              const activeShadow =
                state === "active" && tier?.color
                  ? `0 4px 0 rgba(0,0,0,0.4), 0 6px 16px ${hexToRgba(tier.color, 0.5)}`
                  : NODE_BASE_SHADOW;

              const nodeContent = (
                <>
                  {state === "complete" && (
                    <div
                      className="path-node-circle"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "#C8932A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: NODE_BASE_SHADOW,
                        transition: "all 80ms ease",
                      }}
                    >
                      <Icon name="check" size={24} color="white" />
                    </div>
                  )}
                  {state === "active" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Leo state="idle" size="nav" />
                      <div
                        className={`path-node-circle ${hasStarted ? "animate-pulse-ring" : "path-node-onboarding-pulse"}`}
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: tier?.color ?? "#C8932A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          ...(hasStarted ? { boxShadow: activeShadow } : {}),
                          transition: "all 80ms ease",
                          ["--pulse-ring-color" as string]: hexToRgba(tier?.color ?? "#C8932A", 0.45),
                        }}
                      >
                        <Icon name="star" size={24} color="white" />
                      </div>
                    </div>
                  )}
                  {state === "skipped" && (
                    <div
                      className="path-node-circle"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "white",
                        border: `3px solid ${tier?.color ?? "#C8932A"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: NODE_BASE_SHADOW,
                        transition: "all 80ms ease",
                      }}
                    >
                      <Icon name="unlock" size={24} color={tier?.color ?? "#C8932A"} />
                    </div>
                  )}
                  {state === "locked" && (
                    <div
                      className="path-node-circle"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "#1E3A5F",
                        border: "1px solid rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: NODE_BASE_SHADOW,
                        transition: "all 80ms ease",
                      }}
                    >
                      <Icon name="lock" size={24} color="rgba(255,255,255,0.3)" />
                    </div>
                  )}
                  <p
                    style={{
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontWeight: state === "active" ? 700 : 400,
                      fontSize: 13,
                      color: state === "locked" ? "rgba(255,255,255,0.4)" : "white",
                      marginTop: 8,
                      marginBottom: 0,
                      textAlign: "center",
                    }}
                  >
                    {title}
                  </p>
                </>
              );

              const wrapperStyle: React.CSSProperties = {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translateX(${staggerX}px)`,
              };

              const isActive = state === "active";
              const ref = isActive ? activeNodeRef : undefined;
              const isTappable = state === "complete" || state === "skipped" || state === "active";

              return (
                <div key={day.day} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {isFirstInTier && tier && (
                    <div
                      style={{
                        width: "100%",
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: tier.color,
                        borderRadius: 999,
                        marginTop: 24,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Nunito', system-ui, sans-serif",
                          fontWeight: 700,
                          fontSize: 12,
                          color: "white",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                        }}
                      >
                        — {tier.label.toUpperCase()} —
                      </span>
                    </div>
                  )}
                  {sectionStarts.has(lessonId) && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: isFirstInTier ? 12 : 32,
                        marginBottom: 24,
                        paddingLeft: 24,
                        paddingRight: 24,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          maxWidth: 280,
                          height: 1,
                          background: "rgba(255,255,255,0.35)",
                          marginBottom: 12,
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 16,
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            height: 1,
                            flex: 1,
                            minWidth: 24,
                            maxWidth: 100,
                            background: "rgba(255,255,255,0.5)",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Nunito', system-ui, sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            color: "rgba(255,255,255,0.95)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {sectionStarts.get(lessonId)}
                        </span>
                        <div
                          style={{
                            height: 1,
                            flex: 1,
                            minWidth: 24,
                            maxWidth: 100,
                            background: "rgba(255,255,255,0.5)",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: 280,
                          height: 1,
                          background: "rgba(255,255,255,0.35)",
                          marginTop: 12,
                        }}
                      />
                    </div>
                  )}
                  {isTappable ? (
                    <Link
                      ref={ref as React.Ref<HTMLAnchorElement>}
                      href={`/session/${lessonId}`}
                      className="path-node-tappable"
                      style={{
                        ...wrapperStyle,
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      {nodeContent}
                    </Link>
                  ) : (
                    <div key={day.day} style={{ ...wrapperStyle, cursor: "default" }}>
                      {nodeContent}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
