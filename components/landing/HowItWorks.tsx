export default function HowItWorks() {
  return (
    <section
      style={{
        background: "var(--color-bg-warm)",
        borderTop: "1px solid var(--color-border)",
        padding: "64px 24px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 28,
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: 36,
          }}
        >
          Three things, every day
        </h2>
        <div
          className="how-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "var(--color-surface-warm)",
              border: "1px solid var(--color-border)",
              borderRadius: 20,
              padding: "28px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--color-gold-pale)",
                color: "var(--color-gold)",
                fontSize: 16,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              1
            </div>
            <h3
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 800,
                color: "var(--color-text)",
                marginBottom: 6,
              }}
            >
              Pray
            </h3>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Each day opens with a guided prayer — formation begins in the heart
            </p>
          </div>
          <div
            style={{
              background: "var(--color-surface-warm)",
              border: "1px solid var(--color-border)",
              borderRadius: 20,
              padding: "28px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--color-gold-pale)",
                color: "var(--color-gold)",
                fontSize: 16,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              2
            </div>
            <h3
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 800,
                color: "var(--color-text)",
                marginBottom: 6,
              }}
            >
              Learn
            </h3>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Five interactive cards — real teaching from the Catechism, active recall not passive reading
            </p>
          </div>
          <div
            style={{
              background: "var(--color-surface-warm)",
              border: "1px solid var(--color-border)",
              borderRadius: 20,
              padding: "28px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--color-gold-pale)",
                color: "var(--color-gold)",
                fontSize: 16,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              3
            </div>
            <h3
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 800,
                color: "var(--color-text)",
                marginBottom: 6,
              }}
            >
              Return
            </h3>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Come back tomorrow, build a streak — small daily steps compound into deep understanding
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
