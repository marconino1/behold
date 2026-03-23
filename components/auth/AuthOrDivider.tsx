export default function AuthOrDivider() {
  return (
    <div
      role="separator"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: "var(--color-border)",
        }}
      />
      <span
        style={{
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontSize: 14,
          color: "var(--color-text-muted)",
          flexShrink: 0,
        }}
      >
        or
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "var(--color-border)",
        }}
      />
    </div>
  );
}
