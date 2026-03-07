export interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  animated?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  color = "var(--color-gold)",
  height = 6,
  animated = true,
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: `${height}px`,
        background: "#E8DDD0",
        borderRadius: 9999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${clampedValue}%`,
          height: "100%",
          background: color,
          borderRadius: 9999,
          transition: animated ? "width 0.4s ease" : "none",
        }}
      />
    </div>
  );
}
