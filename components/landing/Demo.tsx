"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/icons/Icon";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

// K0 Card 2 — multiple choice
const MC_CARD = {
  sectionTitle: "Something broke.",
  teaching:
    "From the very beginning, human beings chose themselves over God — and that one choice fractured everything: our relationship with God, with each other, and with ourselves. The Church calls this Original Sin. We inherit its effects not as personal guilt for Adam's act, but as a wounded nature — a tendency toward selfishness we did not choose, but feel in every moment of our lives.",
  ccc: "CCC 385–390",
  prompt:
    "What is the Church's name for the original human choice that fractured humanity's relationship with God?",
  options: ["The Great Rebellion", "Original Sin", "The Primal Fall", "The First Mistake"],
  correct: "Original Sin",
  feedback:
    "Original Sin explains what otherwise makes no sense: why the world is the way it is. Not merely bad choices, but a wounded human nature inherited at birth. This is the problem the entire Gospel is the answer to.",
};

// K0 Card 3 — true/false
const TF_CARD = {
  sectionTitle: "God never gave up.",
  teaching:
    "The Old Testament is not a detour before the 'real' story. It is the story of God — over thousands of years, through Abraham, Moses, David, and the prophets — relentlessly pursuing the humanity that walked away. Every covenant was a step closer. Every promise pointed forward. God was preparing the world for one Person.",
  ccc: "CCC 56–64",
  prompt: "True or false?",
  statement: "After humanity fell, God abandoned them and only later changed his plan.",
  correct: false,
  feedback:
    "God never abandoned the pursuit. From Genesis 3:15 — the 'Protoevangelium' — God already promised a Redeemer. The Old Testament is not evidence of plan B. It is plan A unfolding exactly as he intended.",
};

export default function Demo() {
  const [step, setStep] = useState(1);
  const [mcSelected, setMcSelected] = useState<string | null>(null);
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const progressPercent = step === 1 ? 50 : step === 2 ? 100 : 100;
  const pipsFilled = step === 1 ? 0 : step === 2 ? 1 : 2;

  const handleMcCheck = () => {
    const correct = mcSelected === MC_CARD.correct;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleTfAnswer = (ans: boolean) => {
    setTfSelected(ans);
    const correct = ans === TF_CARD.correct;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setStep((s) => s + 1);
    setMcSelected(null);
    setTfSelected(null);
    setShowFeedback(false);
    setIsCorrect(null);
  };

  return (
    <section style={{ maxWidth: 460, margin: "36px auto 0", padding: "0 16px" }}>
      <div
        style={{
          background: GRADIENT,
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(12,74,110,.25), 0 2px 8px rgba(0,0,0,.1)",
          border: "3px solid rgba(255,255,255,.12)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px 10px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "rgba(255,255,255,.5)",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              Day 1 — Learn
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Nunito', system-ui, sans-serif",
              }}
            >
              The Kerygma
            </div>
          </div>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    i < pipsFilled
                      ? "var(--color-green)"
                      : i === pipsFilled
                        ? "var(--color-gold)"
                        : "rgba(255,255,255,.2)",
                  boxShadow:
                    i === pipsFilled
                      ? "0 0 6px rgba(200,147,42,.5)"
                      : i < pipsFilled
                        ? "0 0 4px rgba(95,173,107,.4)"
                        : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: "16px 18px 20px", minHeight: 320 }}>
          {step === 1 && (
            <div
              style={{
                background: "rgba(255,255,255,.95)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 4,
                  background: "rgba(0,0,0,.06)",
                  borderRadius: 2,
                  margin: "14px 16px 0",
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: "100%",
                    background: "var(--color-gold)",
                    borderRadius: 2,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "flex-end",
                  padding: "6px 16px 0",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <Icon key={i} name="heart" size={16} color="#E85B5B" />
                ))}
              </div>
              <div style={{ padding: "4px 18px 18px" }}>
                <div
                  style={{
                    background: "var(--color-gold-pale)",
                    borderLeft: "3px solid var(--color-gold)",
                    borderRadius: "0 12px 12px 0",
                    padding: "14px 16px",
                    marginBottom: 16,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--color-text)",
                    fontFamily: "'Nunito', system-ui, sans-serif",
                  }}
                >
                  {MC_CARD.teaching}
                </div>
                <p
                  style={{
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: 12,
                  }}
                >
                  {MC_CARD.prompt}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  {MC_CARD.options.map((opt) => {
                    const locked = mcSelected !== null;
                    const isCorrectOpt = opt === MC_CARD.correct;
                    const isSelected = mcSelected === opt;
                    const showCorrect = locked && isCorrectOpt;
                    const showWrong = locked && isSelected && !isCorrectOpt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={locked}
                        onClick={() => setMcSelected(opt)}
                        style={{
                          fontFamily: "'Nunito', system-ui, sans-serif",
                          fontSize: 14,
                          fontWeight: 600,
                          padding: "12px 16px",
                          borderRadius: 12,
                          border: showCorrect
                            ? "2px solid var(--color-green)"
                            : showWrong
                              ? "2px solid #D45B5B"
                              : "2px solid var(--color-border)",
                          background: showCorrect
                            ? "#EAF5EC"
                            : showWrong
                              ? "#FBEAEA"
                              : "var(--color-surface-warm)",
                          color: "var(--color-text)",
                          textAlign: "left",
                          cursor: locked ? "default" : "pointer",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!showFeedback ? (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      onClick={handleMcCheck}
                      disabled={!mcSelected}
                      style={{ fontSize: 14, padding: "10px 24px" }}
                    >
                      Check Answer
                    </Button>
                  </div>
                ) : (
                  <>
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
                      {!isCorrect && (
                        <p
                          style={{
                            fontFamily: "'Nunito', system-ui, sans-serif",
                            fontSize: 14,
                            color: "#991B1B",
                            marginBottom: 8,
                          }}
                        >
                          Correct: {MC_CARD.correct}
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
                        {MC_CARD.feedback}
                      </p>
                      <Button variant="primary" onClick={handleContinue}>
                        Continue
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div
              style={{
                background: "rgba(255,255,255,.95)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 4,
                  background: "rgba(0,0,0,.06)",
                  borderRadius: 2,
                  margin: "14px 16px 0",
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: "100%",
                    background: "var(--color-gold)",
                    borderRadius: 2,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  justifyContent: "flex-end",
                  padding: "6px 16px 0",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <Icon key={i} name="heart" size={16} color="#E85B5B" />
                ))}
              </div>
              <div style={{ padding: "4px 18px 18px" }}>
                <div
                  style={{
                    background: "var(--color-gold-pale)",
                    borderLeft: "3px solid var(--color-gold)",
                    borderRadius: "0 12px 12px 0",
                    padding: "14px 16px",
                    marginBottom: 16,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "var(--color-text)",
                    fontFamily: "'Nunito', system-ui, sans-serif",
                  }}
                >
                  {TF_CARD.teaching}
                </div>
                <p
                  style={{
                    fontFamily: "'Nunito', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "var(--color-text)",
                    marginBottom: 12,
                  }}
                >
                  {TF_CARD.prompt}
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--color-text)",
                    marginBottom: 16,
                    lineHeight: 1.5,
                    textAlign: "center",
                  }}
                >
                  {TF_CARD.statement}
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {([true, false] as const).map((val) => {
                    const isSelected = tfSelected === val;
                    const isCorrectAnswer = val === TF_CARD.correct;
                    const showAsCorrect = showFeedback && isCorrectAnswer;
                    const showAsWrong = showFeedback && isSelected && !isCorrectAnswer;
                    return (
                      <button
                        key={String(val)}
                        type="button"
                        disabled={tfSelected !== null}
                        onClick={() => handleTfAnswer(val)}
                        style={{
                          flex: 1,
                          fontFamily: "'Nunito', system-ui, sans-serif",
                          fontSize: 15,
                          fontWeight: 800,
                          padding: 16,
                          borderRadius: 14,
                          border: "none",
                          background: showAsCorrect
                            ? "#EAF5EC"
                            : showAsWrong
                              ? "#FBEAEA"
                              : val
                                ? "#5FAD6B"
                                : "#DC2626",
                          color: showAsCorrect
                            ? "#2D7A3A"
                            : showAsWrong
                              ? "#A33B3B"
                              : "#fff",
                          cursor: tfSelected !== null ? "default" : "pointer",
                          textAlign: "center",
                        }}
                      >
                        {val ? "TRUE" : "FALSE"}
                      </button>
                    );
                  })}
                </div>
                {showFeedback && (
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
                    {!isCorrect && (
                      <p
                        style={{
                          fontFamily: "'Nunito', system-ui, sans-serif",
                          fontSize: 14,
                          color: "#991B1B",
                          marginBottom: 8,
                        }}
                      >
                        Correct: {TF_CARD.correct ? "True" : "False"}
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
                      {TF_CARD.feedback}
                    </p>
                    <Button variant="primary" onClick={handleContinue}>
                      Continue
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                minHeight: 280,
                padding: 20,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: 6,
                }}
              >
                You just finished two cards
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,.6)",
                  marginBottom: 20,
                  maxWidth: 260,
                  lineHeight: 1.4,
                  fontFamily: "'Nunito', system-ui, sans-serif",
                }}
              >
                Sign up to continue the remaining 3 cards and keep learning tomorrow
              </p>
              <Link
                href="/signup"
                style={{
                  fontFamily: "'Nunito', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 800,
                  padding: "12px 30px",
                  borderRadius: 9999,
                  border: "none",
                  background: "#fff",
                  color: "var(--color-gold)",
                  textDecoration: "none",
                  boxShadow: "0 2px 12px rgba(0,0,0,.15)",
                }}
              >
                Create free account
              </Link>
            </div>
          )}
        </div>
      </div>
      <p
        style={{
          textAlign: "center",
          marginTop: 14,
          fontSize: 12,
          color: "var(--color-text-light)",
          fontWeight: 600,
          paddingBottom: 8,
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        Try it — this is a real lesson from the app
      </p>
    </section>
  );
}
