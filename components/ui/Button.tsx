"use client";

import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

const SIZE_STYLES: Record<ButtonSize, { paddingY: number; paddingX: number }> = {
  sm: { paddingY: 12, paddingX: 20 },
  md: { paddingY: 14, paddingX: 28 },
  lg: { paddingY: 18, paddingX: 36 },
};

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  children,
  className = "",
  fullWidth = false,
  type = "button",
  style,
}: ButtonProps) {
  const { paddingY, paddingX } = SIZE_STYLES[size];
  const isDisabled = disabled || loading;

  const baseStyles: React.CSSProperties = {
    fontFamily: "'Nunito', system-ui, sans-serif",
    fontWeight: 800,
    borderRadius: 9999,
    padding: `${paddingY}px ${paddingX}px`,
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "transform 0.15s, filter 0.15s",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: fullWidth ? "100%" : undefined,
    opacity: isDisabled ? 0.6 : 1,
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: "var(--color-gold)",
      color: "white",
      border: "none",
      boxShadow: "var(--shadow-warm)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-gold)",
      border: "2px solid var(--color-gold)",
    },
    outline: {
      background: "transparent",
      color: "var(--color-text)",
      border: "1.5px solid var(--color-border)",
    },
  };

  const handleClick = () => {
    if (!isDisabled && onClick) onClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!isDisabled && variant === "primary") {
          e.currentTarget.style.filter = "brightness(0.92)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
      }}
      onMouseDown={(e) => {
        if (!isDisabled) e.currentTarget.style.transform = "scale(0.97)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {loading ? (
        <span
          className="animate-spin"
          style={{
            width: 18,
            height: 18,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
          }}
        />
      ) : (
        children
      )}
    </button>
  );
}
