import Link from "next/link";
import Leo from "@/components/mascot/Leo";

export default function Hero() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "40px 24px 28px",
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <Leo state="celebrating" size="hero" />
      </div>
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(38px, 6vw, 56px)",
          fontWeight: 700,
          color: "var(--color-text)",
          lineHeight: 1.08,
          letterSpacing: "-1px",
          margin: 0,
        }}
      >
        Duolingo for Catholicism
      </h1>
      <div style={{ marginTop: 28 }}>
        <Link
          href="/signup"
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 16,
            fontWeight: 800,
            padding: "14px 40px",
            borderRadius: 9999,
            border: "none",
            background: "var(--color-gold)",
            color: "white",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            boxShadow: "0 3px 12px rgba(200,147,42,.3)",
          }}
        >
          Create free account
        </Link>
      </div>
    </section>
  );
}
