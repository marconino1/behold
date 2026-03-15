"use client";

import { useState, useEffect, useRef } from "react";

const TIERS = [
  {
    id: "foundation",
    label: "Foundation",
    cls: "t1",
    gradient: "linear-gradient(135deg, #5FAD6B, #3D8B48)",
    glowColor: "rgba(95,173,107,0.25)",
    lessons: [
      "The Kerygma",
      "Who Is God?",
      "The Holy Trinity",
      "Imago Dei",
      "Body, Soul & Free Will",
      "Sin & the Fall",
      "Creator & Creation",
      "What Is Scripture?",
      "How to Read the Bible",
      "Salvation History",
      "What Is Prayer?",
      "The Basic Prayers",
      "Praying with Scripture",
    ],
  },
  {
    id: "encounter",
    label: "Encounter",
    cls: "t2",
    gradient: "linear-gradient(135deg, #3B8BD4, #185FA5)",
    glowColor: "rgba(59,139,212,0.25)",
    lessons: [
      "The Incarnation",
      "Life & Ministry",
      "The Paschal Mystery",
      "Resurrection",
      "Ascension & Pentecost",
      "NT Overview",
      "Salvation History: NT",
      "The Our Father",
      "Marian Prayer",
    ],
  },
  {
    id: "church",
    label: "The Church",
    cls: "t3",
    gradient: "linear-gradient(135deg, #E8A020, #BA7517)",
    glowColor: "rgba(232,160,32,0.25)",
    lessons: [
      "What Is the Church?",
      "Marks of the Church",
      "Authority & Magisterium",
      "Baptism",
      "Confirmation",
      "The Eucharist",
      "Reconciliation",
      "Anointing of the Sick",
      "Holy Orders",
      "Matrimony",
      "Liturgical Prayer",
    ],
  },
  {
    id: "moral",
    label: "Moral Life",
    cls: "t4",
    gradient: "linear-gradient(135deg, #D4537E, #993556)",
    glowColor: "rgba(212,83,126,0.25)",
    lessons: [
      "Natural Law",
      "The Commandments",
      "The Beatitudes",
      "Virtue & Vice",
      "Catholic Social Teaching",
      "Conscience & Moral Acts",
      "Prayer of Petition",
    ],
  },
  {
    id: "depth",
    label: "Depth",
    cls: "t5",
    gradient: "linear-gradient(135deg, #7F77DD, #534AB7)",
    glowColor: "rgba(127,119,221,0.25)",
    lessons: [
      "Eschatology",
      "Apologetics",
      "Church History",
      "The Saints",
      "Contemplative Prayer",
    ],
  },
];


export default function Roadmap() {
  const [activeTier, setActiveTier] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const tier = TIERS[activeTier];
  const totalLessons = tier.lessons.length;

  useEffect(() => {
    const updateStar = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const startTrigger = vh * 0.8;
      const endTrigger = -rect.height + vh * 0.3;
      const raw = (startTrigger - rect.top) / (startTrigger - endTrigger);
      const progress = Math.max(0, Math.min(1, raw));
      const idx = Math.min(Math.floor(progress * totalLessons), totalLessons - 1);
      setActiveIndex(Math.max(0, idx));
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateStar();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateStar();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTier, totalLessons]);

  return (
    <section
      ref={sectionRef}
      style={{
        marginTop: 72,
        background: "#E8F4FD",
        padding: "56px 0 64px",
        borderTop: "1px solid #D0E4F0",
        borderBottom: "1px solid #D0E4F0",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "0 24px 28px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 4.5vw, 34px)",
            fontWeight: 700,
            color: "var(--color-text)",
            lineHeight: 1.15,
          }}
        >
          A structured journey from foundation to depth
        </h2>
      </div>

      {/* Tier tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: "0 16px",
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        {TIERS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTier(i)}
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              padding: "8px 16px",
              borderRadius: 9999,
              border: i === activeTier ? "none" : "1.5px solid var(--color-border)",
              background: i === activeTier ? t.gradient : "#fff",
              color: i === activeTier ? "#fff" : "var(--color-text-muted)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Winding path */}
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
          }}
        >
          {tier.lessons.map((lesson, i) => {
            const offset = i === 0 ? 0 : i % 2 === 1 ? -80 : 80;
            const isDone = i < activeIndex;
            const isCurrent = i === activeIndex;
            const isDim = i > activeIndex;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: `translateX(${offset}px)`,
                  transition: "transform 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: tier.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    position: "relative",
                    opacity: isDim ? 0.35 : 1,
                    filter: isDim ? "grayscale(0.6)" : "none",
                    transform: isCurrent ? "scale(1.15)" : "scale(1)",
                    boxShadow: isCurrent
                      ? `0 0 0 5px ${tier.glowColor}, 0 4px 14px rgba(0,0,0,0.15)`
                      : "none",
                    transition: "transform 0.3s, box-shadow 0.3s, opacity 0.3s, filter 0.3s",
                  }}
                >
                  {/* Filled gold star — current */}
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    style={{
                      position: "absolute",
                      opacity: isCurrent ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  >
                    <path
                      d="M11 2l2.76 5.6 6.18.9-4.47 4.36 1.05 6.14L11 16.27 5.48 19l1.05-6.14L2.06 8.5l6.18-.9L11 2z"
                      fill="#C8932A"
                      stroke="#A87520"
                      strokeWidth={0.5}
                    />
                  </svg>
                  {/* White check — done */}
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    style={{
                      position: "absolute",
                      opacity: isDone ? 1 : 0,
                      transition: "opacity 0.3s",
                    }}
                  >
                    <path
                      d="M6 11.5l3.5 3.5 6.5-7"
                      stroke="#fff"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginTop: 8,
                    textAlign: "center",
                    maxWidth: 120,
                    lineHeight: 1.25,
                  }}
                >
                  {lesson}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
