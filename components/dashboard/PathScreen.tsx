"use client";

import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Leo from "@/components/mascot/Leo";
import { LESSONS } from "@/content/behold_lesson_content.js";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

type NodeState = "complete" | "active" | "locked";

interface DayPlanItem {
  day: number;
  learn: string;
  prayer: string;
  title: string;
}

interface PathScreenProps {
  firstName: string;
  streak: number;
  xp: number;
  completedLessonIds: string[];
  dayPlan: DayPlanItem[];
}

function getNodeState(
  lessonId: string,
  completedIds: string[],
  activeLessonId: string | null
): NodeState {
  if (activeLessonId === lessonId) return "active";
  if (completedIds.includes(lessonId)) return "complete";
  return "locked";
}

function getAlignment(index: number): "left" | "center" | "right" {
  const mod = index % 3;
  if (mod === 0) return "left";
  if (mod === 1) return "center";
  return "right";
}

export default function PathScreen({
  firstName,
  streak,
  xp,
  completedLessonIds,
  dayPlan,
}: PathScreenProps) {
  const activeIndex = dayPlan.findIndex((d) => !completedLessonIds.includes(d.learn));
  const activeLessonId = activeIndex >= 0 ? dayPlan[activeIndex].learn : null;

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
            Good morning, {firstName || "friend"}.
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
              gap: 8,
            }}
          >
            <Icon name="heart" size={20} color="white" />
            <span
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                color: "white",
                fontSize: 14,
              }}
            >
              3 hearts
            </span>
          </div>
        </div>

        {/* Path section */}
        <div style={{ position: "relative" }}>
          {/* Vertical dotted connector */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 20,
              bottom: 20,
              width: 2,
              marginLeft: -1,
              borderLeft: "2px dotted rgba(255,255,255,0.4)",
              pointerEvents: "none",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {dayPlan.map((day, index) => {
              const lessonId = day.learn;
              const lesson = LESSONS[lessonId as keyof typeof LESSONS];
              const title = lesson?.title ?? day.title;
              const state = getNodeState(lessonId, completedLessonIds, activeLessonId);
              const alignment = getAlignment(index);

              const nodeContent = (
                <>
                  {state === "complete" && (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#C8932A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="check" size={22} color="white" />
                    </div>
                  )}
                  {state === "active" && (
                    <div
                      className="animate-pulse-gold-infinite"
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        border: "3px solid white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <Leo state="idle" size="nav" />
                    </div>
                  )}
                  {state === "locked" && (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#6B7280",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon name="lock" size={20} color="white" />
                    </div>
                  )}
                  <p
                    style={{
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontWeight: state === "active" ? 700 : 400,
                      fontSize: 14,
                      color: state === "locked" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.8)",
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
                alignItems:
                  alignment === "left"
                    ? "flex-start"
                    : alignment === "right"
                    ? "flex-end"
                    : "center",
                marginLeft: alignment === "left" ? 32 : 0,
                marginRight: alignment === "right" ? 32 : 0,
              };

              if (state === "locked") {
                return (
                  <div key={day.day} style={wrapperStyle}>
                    {nodeContent}
                  </div>
                );
              }

              return (
                <Link
                  key={day.day}
                  href={`/session/${lessonId}`}
                  style={{
                    ...wrapperStyle,
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {nodeContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
