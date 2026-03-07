"use client";

import type { ReactNode, CSSProperties } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
  style?: CSSProperties;
}

export default function Card({
  children,
  className = "",
  onClick,
  noPadding = false,
  style,
}: CardProps) {
  const isClickable = !!onClick;

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
      className={`${isClickable ? "cursor-pointer transition-transform duration-150" : ""} ${className}`}
      style={{
        fontFamily: "'Nunito', system-ui, sans-serif",
        background: "var(--color-surface)",
        borderRadius: 16,
        boxShadow: "var(--shadow-warm)",
        border: "1px solid var(--color-border)",
        padding: noPadding ? 0 : 20,
        ...(isClickable && {
          transition: "transform 150ms ease",
        }),
        ...style,
      }}
      onMouseEnter={
        isClickable
          ? (e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
            }
          : undefined
      }
      onMouseLeave={
        isClickable
          ? (e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
