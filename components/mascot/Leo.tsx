"use client";

const SIZE_MAP = {
  nav: 34,
  card: 58,
  session: 100,
  hero: 148,
  icon: 220,
} as const;

export type LeoState = "idle" | "celebrating" | "thinking" | "oops";
export type LeoSize = keyof typeof SIZE_MAP;

export interface LeoProps {
  state?: LeoState;
  size?: LeoSize;
  className?: string;
}

const STATE_ANIMATION: Record<LeoState, string> = {
  idle: "animate-leo-bob",
  celebrating: "animate-leo-celebrate",
  thinking: "animate-leo-think",
  oops: "animate-leo-oops",
};

export default function Leo({
  state = "idle",
  size = "card",
  className = "",
}: LeoProps) {
  const pixelSize = SIZE_MAP[size];
  const animationClass = STATE_ANIMATION[state];
  const celebrating = state === "celebrating";
  const happy = state === "celebrating" || state === "idle";

  return (
    <svg
      width={pixelSize}
      height={pixelSize * 1.1}
      viewBox="0 0 110 120"
      fill="none"
      className={`${animationClass} ${className}`.trim()}
      aria-hidden
    >
      <ellipse cx="55" cy="56" rx="42" ry="40" fill="#F59E0B" opacity="0.15" />
      <ellipse cx="55" cy="56" rx="36" ry="34" fill="#D97706" opacity="0.25" />
      <ellipse cx="55" cy="22" rx="10" ry="8" fill="#D97706" opacity="0.55" />
      <ellipse cx="35" cy="28" rx="9" ry="7" fill="#D97706" opacity="0.48" />
      <ellipse cx="75" cy="28" rx="9" ry="7" fill="#D97706" opacity="0.48" />
      <ellipse cx="22" cy="44" rx="8" ry="9" fill="#D97706" opacity="0.38" />
      <ellipse cx="88" cy="44" rx="8" ry="9" fill="#D97706" opacity="0.38" />
      <ellipse cx="55" cy="58" rx="28" ry="26" fill="#FDE68A" />
      <ellipse cx="33" cy="36" rx="7" ry="8" fill="#FCD34D" />
      <ellipse cx="77" cy="36" rx="7" ry="8" fill="#FCD34D" />
      <ellipse cx="33" cy="36" rx="4" ry="5" fill="#FEF3C7" opacity="0.5" />
      <ellipse cx="77" cy="36" rx="4" ry="5" fill="#FEF3C7" opacity="0.5" />
      {happy ? (
        <>
          <path
            d="M38 53 Q44 48 50 53"
            stroke="#78350F"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M60 53 Q66 48 72 53"
            stroke="#78350F"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <ellipse cx="44" cy="54" rx="6" ry="7" fill="white" />
          <ellipse cx="66" cy="54" rx="6" ry="7" fill="white" />
          <ellipse cx="44" cy="55" rx="4" ry="5" fill="#78350F" />
          <ellipse cx="66" cy="55" rx="4" ry="5" fill="#78350F" />
          <ellipse cx="44" cy="54" rx="2.5" ry="3" fill="#1C0A00" />
          <ellipse cx="66" cy="54" rx="2.5" ry="3" fill="#1C0A00" />
          <ellipse cx="45.5" cy="52.5" rx="1.2" ry="1.2" fill="white" />
          <ellipse cx="67.5" cy="52.5" rx="1.2" ry="1.2" fill="white" />
        </>
      )}
      <ellipse cx="55" cy="63" rx="5" ry="3.5" fill="#D97706" />
      <ellipse cx="53.5" cy="62" rx="1.5" ry="1" fill="#FEF3C7" opacity="0.6" />
      {celebrating ? (
        <path
          d="M44 70 Q55 81 66 70"
          stroke="#92400E"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M49 69 Q55 75 61 69"
          stroke="#92400E"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      )}
      <ellipse
        cx="36"
        cy="64"
        rx="6"
        ry="3.5"
        fill="#FCA5A5"
        opacity={celebrating ? 0.4 : 0.2}
      />
      <ellipse
        cx="74"
        cy="64"
        rx="6"
        ry="3.5"
        fill="#FCA5A5"
        opacity={celebrating ? 0.4 : 0.2}
      />
      <line
        x1="28"
        y1="64"
        x2="43"
        y2="66"
        stroke="#D97706"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <line
        x1="28"
        y1="68"
        x2="43"
        y2="68"
        stroke="#D97706"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <line
        x1="67"
        y1="66"
        x2="82"
        y2="64"
        stroke="#D97706"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <line
        x1="67"
        y1="68"
        x2="82"
        y2="68"
        stroke="#D97706"
        strokeWidth="0.8"
        opacity="0.35"
      />
      {celebrating && (
        <>
          <path
            d="M92 16 L94 11 L96 16 L101 18 L96 20 L94 25 L92 20 L87 18Z"
            fill="#FCD34D"
          />
          <path
            d="M8 28 L9.5 24 L11 28 L15 29.5 L11 31 L9.5 35 L8 31 L4 29.5Z"
            fill="#FCD34D"
            opacity="0.8"
          />
          <circle cx="85" cy="35" r="2" fill="#F59E0B" />
          <circle cx="20" cy="18" r="1.5" fill="#FCD34D" />
        </>
      )}
    </svg>
  );
}
