"use client";

import Icon from "@/components/icons/Icon";

export type ChipState = "complete" | "active" | "locked";
export type ChipSize = "sm" | "md";

export interface ChipProps {
  label: string;
  state: ChipState;
  onClick?: () => void;
  size?: ChipSize;
}

const STATE_STYLES: Record<
  ChipState,
  {
    background: string;
    border: string;
    color: string;
    icon: "check" | "arrow-right" | "lock";
    iconPosition: "left" | "right";
    clickable: boolean;
  }
> = {
  complete: {
    background: "var(--color-gold-pale)",
    border: "1.5px solid var(--color-gold)",
    color: "var(--color-gold)",
    icon: "check",
    iconPosition: "left",
    clickable: true,
  },
  active: {
    background: "var(--color-sky-pale)",
    border: "1.5px solid var(--color-sky-mid)",
    color: "var(--color-sky-deep)",
    icon: "arrow-right",
    iconPosition: "right",
    clickable: true,
  },
  locked: {
    background: "#F5F5F5",
    border: "1.5px solid #E0E0E0",
    color: "#999",
    icon: "lock",
    iconPosition: "left",
    clickable: false,
  },
};

const SIZE_STYLES: Record<ChipSize, { padding: string; fontSize: number }> = {
  sm: { padding: "6px 12px", fontSize: 12 },
  md: { padding: "8px 16px", fontSize: 13 },
};

export default function Chip({
  label,
  state,
  onClick,
  size = "md",
}: ChipProps) {
  const stateStyle = STATE_STYLES[state];
  const sizeStyle = SIZE_STYLES[size];
  const isClickable = stateStyle.clickable && !!onClick;

  const iconEl = (
    <Icon
      name={stateStyle.icon}
      size={size === "sm" ? 12 : 14}
      color={stateStyle.color}
    />
  );

  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={isClickable ? onClick : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      style={{
        fontFamily: "'Nunito', system-ui, sans-serif",
        fontWeight: 700,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: stateStyle.background,
        border: stateStyle.border,
        color: stateStyle.color,
        padding: sizeStyle.padding,
        borderRadius: 9999,
        cursor: isClickable ? "pointer" : "default",
        flexDirection: stateStyle.iconPosition === "right" ? "row-reverse" : "row",
        fontSize: sizeStyle.fontSize,
      }}
    >
      {iconEl}
      <span>{label}</span>
    </div>
  );
}
