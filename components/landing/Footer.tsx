import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "20px 24px",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          fontSize: 12,
          color: "var(--color-text-light)",
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        <Link
          href="/privacy"
          style={{
            color: "var(--color-text-muted)",
            textDecoration: "none",
          }}
        >
          Privacy Policy
        </Link>
        <span>·</span>
        <Link
          href="/terms"
          style={{
            color: "var(--color-text-muted)",
            textDecoration: "none",
          }}
        >
          Terms
        </Link>
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--color-text-light)",
          marginTop: 4,
          fontFamily: "'Nunito', system-ui, sans-serif",
        }}
      >
        © 2026 Behold
      </div>
    </footer>
  );
}
