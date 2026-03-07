import type { ReactNode } from "react";

export type IconName =
  | "pray"
  | "learn"
  | "streak"
  | "cross"
  | "lock"
  | "check"
  | "star"
  | "arrow-right"
  | "arrow-left"
  | "person"
  | "calendar"
  | "clock"
  | "heart"
  | "x";

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

const ICONS: Record<IconName, (color: string) => ReactNode> = {
  pray: (color) => (
    <>
      <path
        d="M12 1.5L11 4v5c0 1.2-.8 2.2-2 2.5V20h2v-8.2c.6-.2 1-.8 1-1.3V5l.5-2L12 1.5zm0 0L13 4v5c0 1.2.8 2.2 2 2.5V20h-2v-8.2c-.6-.2-1-.8-1-1.3V5L11.5 3 12 1.5z"
        fill={color}
        fillRule="evenodd"
      />
    </>
  ),
  learn: (color) => (
    <>
      <path
        d="M4 5v14c0 .8.6 1.5 1.4 1.5L12 20V4L5.4 3.5C4.6 3.5 4 4.2 4 5z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 5v14c0 .8-.6 1.5-1.4 1.5L12 20V4l6.6-.5c.8 0 1.4.7 1.4 1.5z"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 11h2v2H8zm-1-1h4v4H7z" fill={color} fillRule="evenodd" />
    </>
  ),
  streak: (color) => (
    <path
      d="M12 2s2 3 2 6c0 2.5-1.5 4-2 5-.5 1-.5 2 0 3 .5.8 1 1.5 1 2.5 0 1.5-1.2 2.5-2.5 2.5S9 19.5 9 18c0-1 .5-1.7 1-2.5.5-1 0-2 0-3-.5-1-2-2.5-2-5 0-3 2-6 2-6z"
      fill={color}
      fillRule="evenodd"
    />
  ),
  cross: (color) => (
    <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2z" fill={color} fillRule="evenodd" />
  ),
  lock: (color) => (
    <>
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        fill={color}
        fillOpacity="0.4"
      />
      <path
        d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </>
  ),
  check: (color) => (
    <path
      d="M4 12l5 6 11-12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  star: (color) => (
    <path
      d="M12 2l2.8 5.7 6.2.9-4.5 4.4 1 6.1L12 15.3l-5.5 2.9 1-6.1L3 8.6l6.2-.9L12 2z"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  "arrow-right": (color) => (
    <path
      d="M10 6l6 6-6 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "arrow-left": (color) => (
    <path
      d="M14 6l-6 6 6 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  person: (color) => (
    <>
      <circle cx="12" cy="6" r="3.5" fill={color} />
      <path
        d="M6 22c0-3.3 2.7-6 6-6s6 2.7 6 6"
        fill={color}
        fillOpacity="0.9"
      />
    </>
  ),
  calendar: (color) => (
    <>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M7 3v4M17 3v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 10h18" stroke={color} strokeWidth="1.5" />
      <path d="M11 10v6M15 10v6" stroke={color} strokeWidth="1.2" opacity="0.7" />
      <path d="M3 14h18" stroke={color} strokeWidth="1.2" opacity="0.7" />
    </>
  ),
  clock: (color) => (
    <>
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M12 7v5l3.5 2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  heart: (color) => (
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={color}
      fillRule="evenodd"
    />
  ),
  x: (color) => (
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

export default function Icon({
  name,
  size = 24,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      {ICONS[name](color)}
    </svg>
  );
}
