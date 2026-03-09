"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";
import { LESSONS } from "@/content/behold_lesson_content.js";
import { createClient } from "@/lib/supabase/client";
import { completeLesson, getHeartsStatus, loseHeart, logPrayer } from "@/lib/db";
import { calculateCurrentHearts } from "@/lib/hearts";
import { checkAndUpdateStreak } from "@/lib/streak";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

type Screen = "intro" | "prayer" | "learn" | "complete";

interface Card {
  id: number;
  sectionTitle: string;
  teaching: string;
  ccc: string;
  mechanic: string;
  prompt?: string;
  sentence?: string;
  blanks?: { options: string[]; correct: string }[];
  options?: string[];
  correct?: string | boolean | string[];
  statement?: string;
  words?: string[];
  feedback: string;
}

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  tier: string;
  tierColor: string;
  ccc_primary: string;
  cards: Card[];
  prayer: {
    title: string;
    text: string[];
    source: string;
    note: string;
  } | null;
}

export default function SessionPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.lessonId as string;

  const lesson = LESSONS[lessonId as keyof typeof LESSONS] as Lesson | undefined;

  const [userId, setUserId] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentCard, setCurrentCard] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [nextRefillAt, setNextRefillAt] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState("0:00:00");
  const [xpEarned, setXpEarned] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Set<number>>(new Set());
  const [cardAnswered, setCardAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [fillBlankValues, setFillBlankValues] = useState<string[]>([]);
  const [sequenceValues, setSequenceValues] = useState<string[]>([]);
  const [prayerCelebrating, setPrayerCelebrating] = useState(false);
  const [completeMounted, setCompleteMounted] = useState(false);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        if (user) setUserId(user.id);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;
    getHeartsStatus(userId)
      .then(({ hearts: h, lastLostAt }) => {
        const { currentHearts, nextRefillAt: next } = calculateCurrentHearts(h, lastLostAt);
        setHearts(currentHearts);
        setNextRefillAt(next);
      })
      .catch(() => {});
  }, [userId]);

  useEffect(() => {
    if (!nextRefillAt) return;
    const tick = () => {
      const diff = nextRefillAt.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown("0:00:00");
        setNextRefillAt(null);
        setHearts(1);
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
  }, [nextRefillAt]);

  useEffect(() => {
    if (screen === "complete" && userId && !completeMounted) {
      setCompleteMounted(true);
      const perfect = wrongAnswers.size === 0;
      completeLesson(userId, lessonId, xpEarned, hearts, perfect).catch(() => {});
      checkAndUpdateStreak(userId).catch(() => {});
    }
  }, [screen, userId, completeMounted, lessonId, xpEarned, hearts, wrongAnswers]);

  const handleBeginLesson = useCallback(() => {
    if (lesson?.prayer) {
      setScreen("prayer");
    } else {
      setScreen("learn");
    }
  }, [lesson?.prayer]);

  const handlePrayerDone = useCallback(async () => {
    setPrayerCelebrating(true);
    if (userId) {
      logPrayer(userId, lessonId).catch(() => {});
    }
    setTimeout(() => {
      setPrayerCelebrating(false);
      setScreen("learn");
    }, 1000);
  }, [userId, lessonId]);

  const handleSkipPrayer = useCallback(() => {
    setScreen("learn");
  }, []);

  const handleCheckAnswer = useCallback(() => {
    if (!lesson) return;
    const card = lesson.cards[currentCard];
    let correct = false;

    if (card.mechanic === "fill_blank" && card.blanks) {
      correct = card.blanks.every((b, i) => fillBlankValues[i] === b.correct);
    } else if (
      (card.mechanic === "multiple_choice" || card.mechanic === "tap_correct") &&
      typeof card.correct === "string"
    ) {
      correct = selectedAnswer === card.correct;
    } else if (
      card.mechanic === "sequence" &&
      Array.isArray(card.correct)
    ) {
      const correctArr = card.correct;
      correct =
        sequenceValues.length === correctArr.length &&
        sequenceValues.every((v, i) => v === correctArr[i]);
    }

    setCardAnswered(true);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setXpEarned((x) => x + 20);
    } else {
      setHearts((h) => Math.max(0, h - 1));
      if (userId) {
        loseHeart(userId)
          .then(({ hearts: newHearts, lastLostAt }) => {
            setHearts(newHearts);
            if (newHearts === 0 && lastLostAt) {
              setNextRefillAt(
                new Date(new Date(lastLostAt).getTime() + 5 * 60 * 60 * 1000)
              );
            }
          })
          .catch(() => {});
      }
      setWrongAnswers((s) => new Set(s).add(currentCard));
    }
  }, [
    lesson,
    currentCard,
    fillBlankValues,
    selectedAnswer,
    sequenceValues,
    userId,
  ]);

  const handleContinue = useCallback(() => {
    setCardAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setFillBlankValues([]);
    setSequenceValues([]);

    if (currentCard >= 4) {
      setScreen("complete");
    } else {
      setCurrentCard((c) => c + 1);
    }
  }, [currentCard]);

  const handleTrueFalse = useCallback(
    (value: boolean) => {
      if (!lesson) return;
      const card = lesson.cards[currentCard];
      const correct = card.correct === value;
      setCardAnswered(true);
      setIsCorrect(correct);
      setShowFeedback(true);

      if (correct) {
        setXpEarned((x) => x + 20);
      } else {
        setHearts((h) => Math.max(0, h - 1));
        if (userId) {
          loseHeart(userId)
            .then(({ hearts: newHearts, lastLostAt }) => {
              setHearts(newHearts);
              if (newHearts === 0 && lastLostAt) {
                setNextRefillAt(
                  new Date(new Date(lastLostAt).getTime() + 5 * 60 * 60 * 1000)
                );
              }
            })
            .catch(() => {});
        }
        setWrongAnswers((s) => new Set(s).add(currentCard));
      }
    },
    [lesson, currentCard, userId]
  );

  const handleFillBlankSelect = useCallback((word: string, numBlanks: number) => {
    setFillBlankValues((prev) => {
      let nextEmpty = prev.findIndex((v) => !v);
      if (nextEmpty === -1 && prev.length < numBlanks) {
        nextEmpty = prev.length;
      }
      if (nextEmpty >= 0) {
        const next = [...prev];
        next[nextEmpty] = word;
        return next;
      }
      return prev;
    });
  }, []);

  const handleFillBlankRemove = useCallback((index: number) => {
    setFillBlankValues((prev) => {
      const next = [...prev];
      next[index] = "";
      return next;
    });
  }, []);

  const handleSequenceSelect = useCallback((word: string) => {
    setSequenceValues((prev) => {
      if (prev.length >= 4 || prev.includes(word)) return prev;
      return [...prev, word];
    });
  }, []);

  const handleSequenceRemove = useCallback((index: number) => {
    setSequenceValues((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleBackConfirm = useCallback(() => {
    if (window.confirm("Leave this lesson? Your progress will not be saved.")) {
      router.push("/dashboard");
    }
  }, [router]);

  if (!lesson) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: GRADIENT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        Lesson not found
      </div>
    );
  }

  if (screen === "intro") {
    const bulletTitles = [
      lesson.cards[0]?.sectionTitle,
      lesson.cards[2]?.sectionTitle,
      lesson.cards[4]?.sectionTitle,
    ].filter(Boolean);

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
          <Leo state="idle" size="session" />
        </div>
        <div
          style={{
            background: `rgba(255,255,255,0.15)`,
            color: lesson.tierColor,
            padding: "6px 14px",
            borderRadius: 9999,
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {lesson.tier.toUpperCase()}
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 32,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          {lesson.title}
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontStyle: "italic",
            fontSize: 16,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          {lesson.subtitle}
        </p>
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            background: "white",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: "#2C2016",
              marginBottom: 12,
            }}
          >
            Today you&apos;ll learn:
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {bulletTitles.map((t, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 15,
                  color: "#2C2016",
                  marginBottom: 8,
                  lineHeight: 1.5,
                }}
              >
                {t}
              </li>
            ))}
          </ul>
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 12,
              color: "#8C7A62",
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            {lesson.ccc_primary}
          </p>
        </div>
        <Button variant="primary" onClick={handleBeginLesson}>
          Begin Lesson
        </Button>
      </div>
    );
  }

  if (screen === "prayer" && lesson.prayer) {
    const prayer = lesson.prayer;
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
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 12,
            color: "#C8932A",
            fontWeight: 700,
            letterSpacing: "0.05em",
            marginBottom: 8,
          }}
        >
          Daily Prayer
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            marginBottom: 24,
          }}
        >
          {prayer.title}
        </h2>
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            background: "white",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            maxHeight: 300,
            overflowY: "auto",
            marginBottom: 16,
          }}
        >
          {prayer.text.map((line, i) => (
            <p
              key={i}
              className="animate-fade-in"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 18,
                color: "#0C4A6E",
                marginBottom: 12,
                animationDelay: `${i * 150}ms`,
              }}
            >
              {line}
            </p>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginBottom: 24,
            maxWidth: 400,
          }}
        >
          {prayer.note}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ marginBottom: 8 }}>
            <Leo
              state={prayerCelebrating ? "celebrating" : "idle"}
              size="session"
            />
          </div>
          <Button variant="primary" onClick={handlePrayerDone}>
            I prayed this
          </Button>
          <Button variant="ghost" onClick={handleSkipPrayer}>
            Skip for now
          </Button>
        </div>
      </div>
    );
  }

  if (screen === "learn" && hearts === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: GRADIENT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <Leo state="oops" size="session" />
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 28,
            fontWeight: 700,
            color: "white",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          No hearts left.
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Your next heart refills in:
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 48,
            fontWeight: 700,
            color: "var(--color-gold)",
            marginBottom: 32,
          }}
        >
          {countdown}
        </p>
        <Link href="/dashboard">
          <Button
            variant="primary"
            style={{
              background: "var(--color-gold)",
              color: "white",
              borderRadius: 9999,
              padding: "12px 24px",
            }}
          >
            Back to dashboard
          </Button>
        </Link>
      </div>
    );
  }

  if (screen === "learn") {
    const card = lesson.cards[currentCard];
    if (!card) return null;

    const canCheckFillBlank =
      card.mechanic === "fill_blank" &&
      card.blanks &&
      fillBlankValues.length === card.blanks.length &&
      fillBlankValues.every(Boolean);
    const canCheckSequence =
      card.mechanic === "sequence" && sequenceValues.length === 4;
    const canCheckMC =
      (card.mechanic === "multiple_choice" || card.mechanic === "tap_correct") &&
      selectedAnswer !== null;

    const wordBankFillBlank =
      card.mechanic === "fill_blank" && card.blanks
        ? card.blanks.flatMap((b) => b.options).filter((o) => !fillBlankValues.includes(o))
        : [];
    const wordBankSequence =
      card.mechanic === "sequence" && card.words
        ? card.words.filter((w) => !sequenceValues.includes(w))
        : [];

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-sky-pale)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "white",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            zIndex: 10,
          }}
        >
          <button
            onClick={handleBackConfirm}
            style={{
              background: "none",
              border: "none",
              padding: 8,
              cursor: "pointer",
            }}
          >
            <Icon name="x" size={24} color="#2C2016" />
          </button>
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 6,
                background: "#E8DDD0",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((currentCard + 1) / 5) * 100}%`,
                  height: "100%",
                  background: "var(--color-gold)",
                  borderRadius: 9999,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Icon
                key={i}
                name="heart"
                size={20}
                color={i <= hearts ? "#DC2626" : "#D1D5DB"}
              />
            ))}
          </div>
        </div>

        {/* Card area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 20,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              boxShadow: "var(--shadow-warm)",
              border: "1px solid var(--color-border)",
            }}
          >
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: "var(--color-gold)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
              }}
            >
              {card.sectionTitle}
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 18,
                color: "#0C4A6E",
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              {card.teaching}
            </p>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 12,
                color: "#8C7A62",
                marginBottom: 20,
              }}
            >
              {card.ccc}
            </p>
            <div
              style={{
                height: 1,
                background: "#E8DDD0",
                marginBottom: 20,
              }}
            />

            {!showFeedback ? (
              <>
                {card.mechanic === "fill_blank" && card.sentence && card.blanks && (
                  <>
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 12,
                      }}
                    >
                      {card.prompt}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 18,
                        lineHeight: 2,
                        marginBottom: 16,
                      }}
                    >
                      {card.sentence.split("[BLANK]").map((part, i) => (
                        <span key={i}>
                          {part}
                          {i < card.blanks!.length && (
                            <span
                              onClick={() =>
                                fillBlankValues[i] &&
                                handleFillBlankRemove(i)
                              }
                              style={{
                                display: "inline-block",
                                minWidth: 80,
                                borderBottom: "2px solid var(--color-gold)",
                                margin: "0 4px",
                                cursor: fillBlankValues[i] ? "pointer" : "default",
                                color: fillBlankValues[i]
                                  ? "#2C2016"
                                  : "transparent",
                              }}
                            >
                              {fillBlankValues[i] || " ___ "}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      {wordBankFillBlank.map((w, wi) => (
                        <button
                          key={`${w}-${wi}`}
                          onClick={() =>
                            handleFillBlankSelect(w, card.blanks!.length)
                          }
                          style={{
                            padding: "8px 16px",
                            borderRadius: 9999,
                            border: "1.5px solid var(--color-border)",
                            background: "white",
                            fontFamily: "'Nunito', system-ui, sans-serif",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleCheckAnswer}
                      disabled={!canCheckFillBlank}
                    >
                      Check Answer
                    </Button>
                  </>
                )}

                {(card.mechanic === "multiple_choice" ||
                  card.mechanic === "tap_correct") &&
                  card.options && (
                    <>
                      <p
                        style={{
                          fontFamily: "'Nunito', system-ui, sans-serif",
                          fontWeight: 700,
                          fontSize: 14,
                          marginBottom: 12,
                        }}
                      >
                        {card.prompt}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 12,
                          marginBottom: 16,
                        }}
                      >
                        {card.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setSelectedAnswer(opt)}
                            style={{
                              padding: 16,
                              borderRadius: 12,
                              border:
                                selectedAnswer === opt
                                  ? "2px solid var(--color-gold)"
                                  : "1px solid var(--color-border)",
                              background:
                                selectedAnswer === opt
                                  ? "var(--color-gold-pale)"
                                  : "white",
                              fontFamily: "'Nunito', system-ui, sans-serif",
                              fontSize: 16,
                              textAlign: "left",
                              cursor: "pointer",
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <Button
                        variant="primary"
                        onClick={handleCheckAnswer}
                        disabled={!canCheckMC}
                      >
                        Check Answer
                      </Button>
                    </>
                  )}

                {card.mechanic === "true_false" && (
                  <>
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 12,
                      }}
                    >
                      {card.prompt}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontStyle: "italic",
                        fontSize: 18,
                        color: "#0C4A6E",
                        marginBottom: 20,
                        padding: 16,
                        background: "rgba(0,0,0,0.03)",
                        borderRadius: 12,
                      }}
                    >
                      {card.statement}
                    </p>
                    <div style={{ display: "flex", gap: 12 }}>
                      <Button
                        variant="primary"
                        onClick={() => handleTrueFalse(true)}
                        style={{
                          background: "#5FAD6B",
                          flex: 1,
                        }}
                      >
                        TRUE
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleTrueFalse(false)}
                        style={{
                          background: "#DC2626",
                          flex: 1,
                        }}
                      >
                        FALSE
                      </Button>
                    </div>
                  </>
                )}

                {card.mechanic === "sequence" && card.words && (
                  <>
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 12,
                      }}
                    >
                      {card.prompt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        marginBottom: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          onClick={() =>
                            sequenceValues[i] && handleSequenceRemove(i)
                          }
                          style={{
                            minWidth: 100,
                            padding: 12,
                            border: "2px dashed #D1D5DB",
                            borderRadius: 8,
                            fontFamily: "'Nunito', system-ui, sans-serif",
                            fontSize: 14,
                            cursor: sequenceValues[i] ? "pointer" : "default",
                            color: sequenceValues[i] ? "#2C2016" : "#9CA3AF",
                          }}
                        >
                          {sequenceValues[i] || `${i + 1}.`}
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      {wordBankSequence.map((w) => (
                        <button
                          key={w}
                          onClick={() => handleSequenceSelect(w)}
                          style={{
                            padding: "8px 16px",
                            borderRadius: 9999,
                            border: "1.5px solid var(--color-border)",
                            background: "white",
                            fontFamily: "'Nunito', system-ui, sans-serif",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleCheckAnswer}
                      disabled={!canCheckSequence}
                    >
                      Check Answer
                    </Button>
                  </>
                )}
              </>
            ) : (
              <div
                style={{
                  background: isCorrect ? "#DCFCE7" : "#FEE2E2",
                  borderRadius: 12,
                  padding: 20,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <Leo
                    state={isCorrect ? "celebrating" : "oops"}
                    size="card"
                  />
                  {isCorrect ? (
                    <>
                      <Icon name="check" size={24} color="#5FAD6B" />
                      <span
                        style={{
                          fontFamily: "'Nunito', system-ui, sans-serif",
                          fontWeight: 700,
                          color: "#5FAD6B",
                          fontSize: 16,
                        }}
                      >
                        Correct!
                      </span>
                    </>
                  ) : (
                    <>
                      <Icon name="x" size={24} color="#DC2626" />
                      <span
                        style={{
                          fontFamily: "'Nunito', system-ui, sans-serif",
                          fontWeight: 700,
                          color: "#DC2626",
                          fontSize: 16,
                        }}
                      >
                        Not quite.
                      </span>
                    </>
                  )}
                </div>
                {!isCorrect &&
                  (card.mechanic === "multiple_choice" ||
                    card.mechanic === "tap_correct") && (
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontSize: 14,
                        color: "#991B1B",
                        marginBottom: 8,
                      }}
                    >
                      Correct: {String(card.correct)}
                    </p>
                )}
                {!isCorrect &&
                  card.mechanic === "true_false" && (
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontSize: 14,
                        color: "#991B1B",
                        marginBottom: 8,
                      }}
                    >
                      Correct: {card.correct ? "True" : "False"}
                    </p>
                )}
                {!isCorrect &&
                  card.mechanic === "fill_blank" &&
                  card.blanks && (
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontSize: 14,
                        color: "#991B1B",
                        marginBottom: 8,
                      }}
                    >
                      Correct:{" "}
                      {card.blanks.map((b) => b.correct).join(", ")}
                    </p>
                )}
                {!isCorrect &&
                  card.mechanic === "sequence" &&
                  Array.isArray(card.correct) && (
                    <p
                      style={{
                        fontFamily: "'Nunito', system-ui, sans-serif",
                        fontSize: 14,
                        color: "#991B1B",
                        marginBottom: 8,
                      }}
                    >
                      Correct order: {(card.correct as string[]).join(" → ")}
                    </p>
                )}
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "#2C2016",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {card.feedback}
                </p>
                {isCorrect && (
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: 9999,
                      background: "var(--color-gold-pale)",
                      color: "#92400E",
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      marginBottom: 16,
                    }}
                  >
                    +20 XP
                  </span>
                )}
                <div style={{ marginTop: 16 }}>
                  <Button
                    variant="primary"
                    onClick={handleContinue}
                    style={{
                      background: isCorrect ? "#5FAD6B" : "#DC2626",
                      opacity: isCorrect ? 1 : 0.8,
                    }}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "complete") {
    const perfect = wrongAnswers.size === 0;
    return (
      <div
        style={{
          minHeight: "100vh",
          background: GRADIENT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div
          className="animate-slide-up"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 400,
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <Leo state="celebrating" size="hero" />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Lesson Complete!
          </h1>
          <div
            style={{
              padding: "12px 24px",
              borderRadius: 9999,
              background: "var(--color-gold-pale)",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: "#92400E",
              }}
            >
              +{xpEarned} XP
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "white",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
              }}
            >
              <Icon name="heart" size={20} color="white" />
              {hearts} hearts
            </div>
            {perfect && (
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 9999,
                  background: "var(--color-gold)",
                  color: "white",
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                ✨ Perfect Lesson!
              </div>
            )}
          </div>
          <Link href="/dashboard">
            <Button variant="primary">Continue</Button>
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
