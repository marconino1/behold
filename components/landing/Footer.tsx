import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "24px 24px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            color: "var(--color-text-muted)",
          }}
        >
          Behold © 2025
        </span>
        <span
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            color: "var(--color-text-muted)",
          }}
        >
          ·
        </span>
        <Link
          href="/privacy?from=home"
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            color: "var(--color-text-muted)",
            textDecoration: "none",
          }}
          className="footer-link"
        >
          Privacy Policy
        </Link>
        <span
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            color: "var(--color-text-muted)",
          }}
        >
          ·
        </span>
        <span
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 14,
            color: "var(--color-text-muted)",
          }}
        >
          Built for the post-confirmation Catholic.
        </span>
      </div>
    </footer>
  );
}
