"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";
import FeedbackModal from "@/components/shared/FeedbackModal";
import { LESSONS } from "@/content/behold_lesson_content.js";
import { isAdminEmail } from "@/lib/admin";
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
  wordBank?: string[];
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
  const [fillBlankSelectedIndices, setFillBlankSelectedIndices] = useState<number[]>([]);
  const [sequenceValues, setSequenceValues] = useState<string[]>([]);
  const [prayerCelebrating, setPrayerCelebrating] = useState(false);
  const [completeMounted, setCompleteMounted] = useState(false);
  const [teachingDismissed, setTeachingDismissed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [completeFeedbackOpen, setCompleteFeedbackOpen] = useState(false);
  const [completeFeedbackLinkHover, setCompleteFeedbackLinkHover] =
    useState(false);

  type AnsweredCardState = {
    selectedAnswer: string | null;
    isCorrect: boolean | null;
    fillBlankSelectedIndices: number[];
    sequenceValues: string[];
  };
  const [answeredCardsState, setAnsweredCardsState] = useState<
    Record<number, AnsweredCardState>
  >({});

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => {
        if (user) {
          setUserId(user.id);
          setIsAdmin(isAdminEmail(user.email));
        }
      });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(`behold_lesson_progress_${lessonId}`);
    if (saved && lesson) {
      try {
        const data = JSON.parse(saved);
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
          const cardIdx = data.currentCard ?? 0;
          setCurrentCard(cardIdx);
          if (data.hearts !== undefined) setHearts(data.hearts);
          if (data.xpEarned !== undefined) setXpEarned(data.xpEarned);
          if (data.answeredCards) setAnsweredCardsState(data.answeredCards);
          const wrong = new Set<number>();
          Object.entries(data.answeredCards ?? {}).forEach(([k, v]) => {
            const entry = v as { isCorrect?: boolean };
            if (entry.isCorrect === false) wrong.add(parseInt(k, 10));
          });
          setWrongAnswers(wrong);
          if (cardIdx >= lesson.cards.length) {
            setScreen("complete");
          } else {
            setScreen("learn");
          }
          return;
        }
      } catch {
        // ignore
      }
      localStorage.removeItem(`behold_lesson_progress_${lessonId}`);
    }
  }, [lessonId, lesson]);

  useEffect(() => {
    const saved = answeredCardsState[currentCard];
    if (saved) {
      setCardAnswered(true);
      setSelectedAnswer(saved.selectedAnswer);
      setIsCorrect(saved.isCorrect);
      setShowFeedback(true);
      setFillBlankSelectedIndices(saved.fillBlankSelectedIndices ?? []);
      setSequenceValues(saved.sequenceValues ?? []);
      setTeachingDismissed(true);
      return;
    }
    setTeachingDismissed(false);
    const card = lesson?.cards[currentCard];
    if (card?.mechanic === "fill_blank" && card?.blanks) {
      const targetLen = card.blanks.length;
      setFillBlankSelectedIndices((prev) => {
        if (prev.length !== targetLen) return Array(targetLen).fill(-1) as number[];
        return prev;
      });
    } else {
      setFillBlankSelectedIndices([]);
    }
    setSequenceValues([]);
  }, [currentCard, lesson?.cards, lessonId, answeredCardsState]);

  useEffect(() => {
    if (!userId) return;
    getHeartsStatus(userId)
      .then(({ hearts: h, lastLostAt }) => {
        const { currentHearts, nextRefillAt: next } = calculateCurrentHearts(h, lastLostAt);
        setHearts(isAdmin ? 99 : currentHearts);
        setNextRefillAt(isAdmin ? null : next);
      })
      .catch(() => {});
  }, [userId, isAdmin]);

  useEffect(() => {
    if (screen !== "complete") setCompleteFeedbackOpen(false);
  }, [screen]);

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
      localStorage.removeItem(`behold_lesson_progress_${lessonId}`);
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
      const wordBank = card.wordBank ?? card.blanks.flatMap((b) => b.options);
      const values = fillBlankSelectedIndices.map((i) => (i >= 0 ? wordBank[i] : ""));
      correct = card.blanks.every((b, i) => values[i] === b.correct);
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
      if (!isAdmin) {
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
      }
      setWrongAnswers((s) => new Set(s).add(currentCard));
    }
  }, [
    lesson,
    currentCard,
    fillBlankSelectedIndices,
    selectedAnswer,
    sequenceValues,
    userId,
    isAdmin,
  ]);

  const handleContinue = useCallback(() => {
    if (!lesson) return;
    const nextCard = currentCard + 1;

    if (cardAnswered) {
      setAnsweredCardsState((prev) => ({
        ...prev,
        [currentCard]: {
          selectedAnswer,
          isCorrect,
          fillBlankSelectedIndices: [...fillBlankSelectedIndices],
          sequenceValues: [...sequenceValues],
        },
      }));
    }

    localStorage.setItem(
      `behold_lesson_progress_${lessonId}`,
      JSON.stringify({
        currentCard: nextCard,
        hearts,
        xpEarned,
        answeredCards: {
          ...answeredCardsState,
          ...(cardAnswered
            ? {
                [currentCard]: {
                  selectedAnswer,
                  isCorrect,
                  fillBlankSelectedIndices: [...fillBlankSelectedIndices],
                  sequenceValues: [...sequenceValues],
                },
              }
            : {}),
        },
        timestamp: Date.now(),
      })
    );

    setCardAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setFillBlankSelectedIndices([]);
    setSequenceValues([]);
    setTeachingDismissed(false);

    if (nextCard >= lesson.cards.length) {
      setScreen("complete");
    } else {
      setCurrentCard(nextCard);
    }
  }, [
    lesson,
    currentCard,
    cardAnswered,
    selectedAnswer,
    isCorrect,
    fillBlankSelectedIndices,
    sequenceValues,
    answeredCardsState,
    hearts,
    xpEarned,
    lessonId,
  ]);

  const handleBack = useCallback(() => {
    if (cardAnswered) return;
    setTeachingDismissed(false);
  }, [cardAnswered]);

  const handleTrueFalse = useCallback(
    (value: boolean) => {
      if (!lesson) return;
      const card = lesson.cards[currentCard];
      const correct = card.correct === value;
      setCardAnswered(true);
      setSelectedAnswer(value ? "true" : "false");
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

  const handleFillBlankSelect = useCallback((wordBankIndex: number) => {
    setFillBlankSelectedIndices((prev) => {
      const nextEmpty = prev.findIndex((i) => i < 0);
      if (nextEmpty < 0) return prev;
      const next = [...prev];
      next[nextEmpty] = wordBankIndex;
      return next;
    });
  }, []);

  const handleFillBlankRemove = useCallback((blankIndex: number) => {
    setFillBlankSelectedIndices((prev) => {
      const next = [...prev];
      next[blankIndex] = -1;
      return next;
    });
  }, []);

  const handleSequenceSelect = useCallback((word: string, maxSlots: number = 4) => {
    setSequenceValues((prev) => {
      if (prev.length >= maxSlots || prev.includes(word)) return prev;
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
          padding: "28px 20px",
        }}
      >
        <div style={{ marginBottom: 20 }}>
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
            fontSize: 28,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          {lesson.title}
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontStyle: "italic",
            fontSize: 15,
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {lesson.subtitle}
        </p>
        <div
          style={{
            maxWidth: 340,
            width: "100%",
            background: "white",
            borderRadius: 16,
            padding: 16,
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
              marginBottom: 10,
            }}
          >
            Today you&apos;ll learn:
          </h3>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {bulletTitles.map((t, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 14,
                  color: "#2C2016",
                  marginBottom: 6,
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
              marginTop: 12,
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
    const prayerLines = prayer.text;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: GRADIENT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 24px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 11,
            color: "#C8932A",
            fontWeight: 700,
            letterSpacing: "0.05em",
            marginBottom: 6,
          }}
        >
          Daily Prayer
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 24,
            fontWeight: 700,
            color: "white",
            marginBottom: 16,
          }}
        >
          {prayer.title}
        </h2>
        <div
          style={{
            width: "100%",
            maxWidth: 280,
            alignSelf: "center",
            margin: "0 auto 16px auto",
            background: "white",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            minHeight: 120,
            overflowY: "auto",
            textAlign: "center",
          }}
        >
          {prayerLines.map((line: string, i: number) => (
            <p
              key={i}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 16,
                color: "#0C4A6E",
                marginBottom: 10,
              }}
            >
              {line}
            </p>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            marginBottom: 20,
            maxWidth: 280,
            margin: "0 auto 20px auto",
          }}
        >
          {prayer.note}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <div style={{ margin: "24px auto" }}>
            <Leo
              state={prayerCelebrating ? "celebrating" : "idle"}
              size="session"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              width: "100%",
              maxWidth: 320,
              margin: "0 auto",
            }}
          >
            <Button variant="primary" onClick={handlePrayerDone}>
              I prayed this
            </Button>
            <Button variant="ghost" onClick={handleSkipPrayer}>
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "learn" && hearts === 0 && !isAdmin) {
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

    const wordBank =
      card.mechanic === "fill_blank" && card.blanks
        ? card.wordBank ?? card.blanks.flatMap((b) => b.options)
        : [];
    const fillBlankValuesDerived =
      card.mechanic === "fill_blank" && wordBank.length
        ? fillBlankSelectedIndices.map((i) => (i >= 0 ? wordBank[i] : ""))
        : [];
    const canCheckFillBlank =
      card.mechanic === "fill_blank" &&
      card.blanks &&
      fillBlankSelectedIndices.length === card.blanks.length &&
      fillBlankSelectedIndices.every((i) => i >= 0);
    const canCheckSequence =
      card.mechanic === "sequence" &&
      card.correct &&
      Array.isArray(card.correct) &&
      sequenceValues.length === card.correct.length;
    const canCheckMC =
      (card.mechanic === "multiple_choice" || card.mechanic === "tap_correct") &&
      selectedAnswer !== null;

    const wordBankFillBlankItems =
      card.mechanic === "fill_blank" && wordBank.length
        ? wordBank.map((w, i) => ({ word: w, index: i }))
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
          {teachingDismissed && !cardAnswered && (
            <button
              onClick={handleBack}
              style={{
                background: "none",
                border: "none",
                padding: 8,
                cursor: "pointer",
              }}
              aria-label="Back to reading"
            >
              <Icon name="arrow-left" size={24} color="#2C2016" />
            </button>
          )}
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
            {!teachingDismissed && !cardAnswered ? (
              <>
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
                <div style={{ marginTop: 20 }}>
                  <Button variant="primary" onClick={() => setTeachingDismissed(true)}>
                    I&apos;m Ready
                  </Button>
                </div>
              </>
            ) : (
              <div className="animate-fade-in">
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
                      {card.sentence.split("[BLANK]").map((part, i) => {
                        const correctVal = card.blanks![i]?.correct;
                        const userVal = fillBlankValuesDerived[i];
                        const blankCorrect =
                          cardAnswered && userVal && correctVal === userVal;
                        const blankWrong =
                          cardAnswered && userVal && correctVal !== userVal;
                        return (
                          <span key={i}>
                            {part}
                            {i < card.blanks!.length && (
                              <span
                                onClick={() =>
                                  !cardAnswered &&
                                  fillBlankValuesDerived[i] &&
                                  handleFillBlankRemove(i)
                                }
                                style={{
                                  display: "inline-block",
                                  minWidth: 80,
                                  borderBottom:
                                    cardAnswered
                                      ? blankCorrect
                                        ? "2px solid #5FAD6B"
                                        : blankWrong
                                          ? "2px solid #DC2626"
                                          : "2px solid var(--color-gold)"
                                      : "2px solid var(--color-gold)",
                                  margin: "0 4px",
                                  cursor: cardAnswered ? "default" : fillBlankValuesDerived[i] ? "pointer" : "default",
                                  color: fillBlankValuesDerived[i]
                                    ? "#2C2016"
                                    : "transparent",
                                }}
                              >
                                {fillBlankValuesDerived[i] || " ___ "}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 16,
                      }}
                    >
                      {wordBankFillBlankItems.map(({ word, index }) => {
                        const isUsed = fillBlankSelectedIndices.includes(index);
                        const isCorrectWord =
                          cardAnswered &&
                          card.blanks?.some(
                            (b, i) =>
                              fillBlankSelectedIndices[i] === index &&
                              b.correct === word
                          );
                        const isWrongWord =
                          cardAnswered &&
                          isUsed &&
                          !card.blanks?.some(
                            (b, i) =>
                              fillBlankSelectedIndices[i] === index &&
                              b.correct === word
                          );
                        return (
                          <button
                            key={`${index}-${word}`}
                            onClick={() =>
                              !cardAnswered && !isUsed && handleFillBlankSelect(index)
                            }
                            disabled={isUsed || cardAnswered}
                            style={{
                              padding: "8px 16px",
                              borderRadius: 9999,
                              border:
                                cardAnswered
                                  ? isCorrectWord
                                    ? "1.5px solid #5FAD6B"
                                    : isWrongWord
                                      ? "1.5px solid #DC2626"
                                      : "1.5px solid var(--color-border)"
                                  : "1.5px solid var(--color-border)",
                              background:
                                cardAnswered
                                  ? isCorrectWord
                                    ? "#DCFCE7"
                                    : isWrongWord
                                      ? "#FEE2E2"
                                      : isUsed
                                        ? "#E5E7EB"
                                        : "white"
                                  : isUsed
                                    ? "#E5E7EB"
                                    : "white",
                              color: isUsed || cardAnswered ? "#9CA3AF" : "#2C2016",
                              fontFamily: "'Nunito', system-ui, sans-serif",
                              fontWeight: 600,
                              cursor: cardAnswered || isUsed ? "default" : "pointer",
                            }}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                    {cardAnswered &&
                      !isCorrect &&
                      card.blanks &&
                      card.sentence && (
                        <div
                          style={{
                            marginBottom: 16,
                            padding: 12,
                            background: "#F0FDF4",
                            borderRadius: 8,
                            border: "1px solid #BBF7D0",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "'Nunito', system-ui, sans-serif",
                              fontWeight: 700,
                              fontSize: 12,
                              color: "#166534",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              marginBottom: 8,
                            }}
                          >
                            Correct answers:
                          </p>
                          <p
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontSize: 16,
                              lineHeight: 2,
                              color: "#166534",
                            }}
                          >
                            {card.sentence.split("[BLANK]").map((part, i) => (
                              <span key={i}>
                                {part}
                                {i < card.blanks!.length && (
                                  <span
                                    style={{
                                      display: "inline-block",
                                      minWidth: 80,
                                      borderBottom: "2px solid #5FAD6B",
                                      margin: "0 4px",
                                      color: "#166534",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {card.blanks![i].correct}
                                  </span>
                                )}
                              </span>
                            ))}
                          </p>
                        </div>
                      )}
                    {cardAnswered ? (
                      <>
                        <div
                          className="animate-fade-in"
                          style={{
                            background: isCorrect ? "#DCFCE7" : "#FEE2E2",
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 16,
                            border: `1px solid ${isCorrect ? "#BBF7D0" : "#FECACA"}`,
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
                            ) : (
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
                            )}
                          </div>
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
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleCheckAnswer}
                        disabled={!canCheckFillBlank}
                      >
                        Check Answer
                      </Button>
                    )}
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
                        {card.options.map((opt) => {
                          const isSelected = selectedAnswer === opt;
                          const isCorrectAnswer = opt === card.correct;
                          let border = "1px solid var(--color-border)";
                          let background = "white";
                          if (cardAnswered) {
                            if (isSelected) {
                              border = isCorrect
                                ? "2px solid #5FAD6B"
                                : "2px solid #DC2626";
                              background = isCorrect
                                ? "#DCFCE7"
                                : "#FEE2E2";
                            } else if (!isCorrect && isCorrectAnswer) {
                              border = "2px solid #5FAD6B";
                              background = "#DCFCE7";
                            } else {
                              background = "#F3F4F6";
                            }
                          } else if (isSelected) {
                            border = "2px solid var(--color-gold)";
                            background = "var(--color-gold-pale)";
                          }
                          return (
                            <button
                              key={opt}
                              onClick={() => !cardAnswered && setSelectedAnswer(opt)}
                              disabled={cardAnswered}
                              style={{
                                padding: 16,
                                borderRadius: 12,
                                border,
                                background,
                                fontFamily: "'Nunito', system-ui, sans-serif",
                                fontSize: 16,
                                textAlign: "left",
                                cursor: cardAnswered ? "default" : "pointer",
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {cardAnswered ? (
                        <>
                          <div
                            className="animate-fade-in"
                            style={{
                              background: isCorrect ? "#DCFCE7" : "#FEE2E2",
                              borderRadius: 12,
                              padding: 16,
                              marginBottom: 16,
                              border: `1px solid ${isCorrect ? "#BBF7D0" : "#FECACA"}`,
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
                              ) : (
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
                              )}
                            </div>
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
                        </>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={handleCheckAnswer}
                          disabled={!canCheckMC}
                        >
                          Check Answer
                        </Button>
                      )}
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
                    {!cardAnswered ? (
                      <div style={{ display: "flex", gap: 12 }}>
                        <Button
                          variant="primary"
                          onClick={() => handleTrueFalse(true)}
                          style={{
                            background: "#5FAD6B",
                            flex: 1,
                            border: "none",
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
                            border: "none",
                          }}
                        >
                          FALSE
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="animate-fade-in"
                        style={{
                          background: isCorrect ? "#DCFCE7" : "#FEE2E2",
                          borderRadius: 12,
                          padding: 16,
                          marginBottom: 16,
                          border: `1px solid ${isCorrect ? "#BBF7D0" : "#FECACA"}`,
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
                          ) : (
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
                          )}
                        </div>
                        {!isCorrect && (
                          <p
                            style={{
                              fontFamily: "'Nunito', system-ui, sans-serif",
                              fontSize: 14,
                              color: "#64748B",
                              marginBottom: 12,
                            }}
                          >
                            Correct answer:{" "}
                            <span style={{ fontWeight: 700, color: "#5FAD6B" }}>
                              {card.correct === true ? "TRUE" : "FALSE"}
                            </span>
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
                    )}
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
                      {Array.from(
                        { length: card.words?.length ?? 4 },
                        (_, i) => i
                      ).map((i) => {
                        const correctArr = card.correct as string[] | undefined;
                        const slotCorrect =
                          cardAnswered &&
                          correctArr &&
                          sequenceValues[i] === correctArr[i];
                        const slotWrong =
                          cardAnswered &&
                          correctArr &&
                          sequenceValues[i] &&
                          sequenceValues[i] !== correctArr[i];
                        return (
                          <div
                            key={i}
                            onClick={() =>
                              !cardAnswered &&
                              sequenceValues[i] &&
                              handleSequenceRemove(i)
                            }
                            style={{
                              minWidth: 100,
                              padding: 12,
                              border:
                                cardAnswered
                                  ? slotCorrect
                                    ? "2px solid #5FAD6B"
                                    : slotWrong
                                      ? "2px solid #DC2626"
                                      : "2px dashed #D1D5DB"
                                  : "2px dashed #D1D5DB",
                              borderRadius: 8,
                              background:
                                cardAnswered
                                  ? slotCorrect
                                    ? "#DCFCE7"
                                    : slotWrong
                                      ? "#FEE2E2"
                                      : undefined
                                  : undefined,
                              fontFamily: "'Nunito', system-ui, sans-serif",
                              fontSize: 14,
                              cursor: cardAnswered ? "default" : sequenceValues[i] ? "pointer" : "default",
                              color: sequenceValues[i] ? "#2C2016" : "#9CA3AF",
                            }}
                          >
                            {sequenceValues[i] || `${i + 1}.`}
                          </div>
                        );
                      })}
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
                          onClick={() =>
                            !cardAnswered &&
                            handleSequenceSelect(
                              w,
                              card.correct && Array.isArray(card.correct)
                                ? card.correct.length
                                : 4
                            )
                          }
                          disabled={cardAnswered}
                          style={{
                            padding: "8px 16px",
                            borderRadius: 9999,
                            border: "1.5px solid var(--color-border)",
                            background: cardAnswered ? "#F3F4F6" : "white",
                            fontFamily: "'Nunito', system-ui, sans-serif",
                            fontWeight: 600,
                            cursor: cardAnswered ? "default" : "pointer",
                            color: cardAnswered ? "#9CA3AF" : "#2C2016",
                          }}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                    {cardAnswered &&
                      !isCorrect &&
                      card.correct &&
                      Array.isArray(card.correct) && (
                        <div
                          style={{
                            marginBottom: 16,
                            padding: 12,
                            background: "#F0FDF4",
                            borderRadius: 8,
                            border: "1px solid #BBF7D0",
                          }}
                        >
                          <p
                            style={{
                              fontFamily: "'Nunito', system-ui, sans-serif",
                              fontWeight: 700,
                              fontSize: 12,
                              color: "#166534",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              marginBottom: 8,
                            }}
                          >
                            Correct order:
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              flexWrap: "wrap",
                            }}
                          >
                            {(card.correct as string[]).map((word, i) => (
                              <div
                                key={`${word}-${i}`}
                                style={{
                                  padding: "10px 14px",
                                  border: "2px solid #5FAD6B",
                                  borderRadius: 8,
                                  background: "#DCFCE7",
                                  fontFamily: "'Nunito', system-ui, sans-serif",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#166534",
                                }}
                              >
                                {word}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    {cardAnswered ? (
                      <>
                        <div
                          className="animate-fade-in"
                          style={{
                            background: isCorrect ? "#DCFCE7" : "#FEE2E2",
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 16,
                            border: `1px solid ${isCorrect ? "#BBF7D0" : "#FECACA"}`,
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
                            ) : (
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
                            )}
                          </div>
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
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleCheckAnswer}
                        disabled={!canCheckSequence}
                      >
                        Check Answer
                      </Button>
                    )}
                  </>
                )}
            </>
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
          <Button
            variant="primary"
            onClick={() => router.push("/dashboard")}
          >
            Continue
          </Button>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            <button
              type="button"
              onClick={() => setCompleteFeedbackOpen(true)}
              onMouseEnter={() => setCompleteFeedbackLinkHover(true)}
              onMouseLeave={() => setCompleteFeedbackLinkHover(false)}
              style={{
                margin: 0,
                padding: 0,
                border: "none",
                background: "none",
                cursor: "pointer",
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: completeFeedbackLinkHover
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.5)",
                textDecoration: "underline",
                textDecorationStyle: "dotted",
                textDecorationColor: "rgba(255,255,255,0.3)",
                transition: "color 0.15s ease",
              }}
            >
              Share feedback
            </button>
          </div>
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 12,
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.5,
              textAlign: "center",
              marginTop: 24,
              marginBottom: 0,
              padding: "0 24px",
            }}
          >
            Our app is not infallible. When in doubt, cross-check with the Catechism.
          </p>
          <FeedbackModal
            open={completeFeedbackOpen}
            onClose={() => setCompleteFeedbackOpen(false)}
          />
        </div>
      </div>
    );
  }

  return null;
}
