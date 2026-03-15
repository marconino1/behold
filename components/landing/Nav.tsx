import Link from "next/link";

export default function Nav() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--color-gold)",
          textDecoration: "none",
        }}
      >
        Behold
      </Link>
      <Link
        href="/login"
        style={{
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          padding: "8px 18px",
          borderRadius: 9999,
          border: "1.5px solid var(--color-border-warm)",
          background: "transparent",
          color: "var(--color-text)",
          textDecoration: "none",
        }}
      >
        Log in
      </Link>
    </nav>
  );
}
