import { getServerUserId } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Leo from "@/components/mascot/Leo";
import Icon from "@/components/icons/Icon";
import WaitlistForm from "@/components/landing/WaitlistForm";
import Footer from "@/components/landing/Footer";

export default async function LandingPage() {
  const userId = await getServerUserId();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div style={{ background: "#FAF7F2", minHeight: "100vh" }}>
      {/* SECTION 1 — NAV BAR */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "white",
          boxShadow: "0 2px 12px rgba(60,40,10,0.08), 0 1px 4px rgba(60,40,10,0.04)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#C8932A",
            textDecoration: "none",
          }}
        >
          Behold
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/login"
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 15,
              borderRadius: 9999,
              padding: "12px 24px",
              display: "inline-flex",
              alignItems: "center",
              background: "transparent",
              color: "#C8932A",
              border: "2px solid #C8932A",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Log in
          </Link>
          <Link
            href="/signup"
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 15,
              borderRadius: 9999,
              padding: "12px 24px",
              display: "inline-flex",
              alignItems: "center",
              background: "#C8932A",
              color: "white",
              border: "none",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(60,40,10,0.08), 0 1px 4px rgba(60,40,10,0.04)",
            }}
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* SECTION 2 — HERO */}
      <section
        style={{
          padding: "48px 24px 64px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ marginBottom: 24 }}>
            <Leo state="celebrating" size="hero" />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 52,
              fontWeight: 700,
              color: "#0C4A6E",
              margin: "0 0 16px 0",
              lineHeight: 1.15,
            }}
          >
            Grow in the faith.
          </h1>
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 20,
              color: "#8C7A62",
              margin: "0 0 28px 0",
              lineHeight: 1.5,
            }}
          >
            One lesson a day. Real Catholic formation. No firehose.
          </p>
          <Link
            href="/signup"
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 16,
              borderRadius: 9999,
              padding: "18px 36px",
              display: "inline-flex",
              alignItems: "center",
              background: "#C8932A",
              color: "white",
              border: "none",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(60,40,10,0.08), 0 1px 4px rgba(60,40,10,0.04)",
            }}
          >
            Start for free →
          </Link>
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 14,
              color: "#8C7A62",
              margin: "16px 0 0 0",
            }}
          >
            Free forever. No credit card needed.
          </p>
        </div>
      </section>

      {/* SECTION 3 — THE PROBLEM */}
      <section
        style={{
          padding: "48px 24px 64px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#2C2016",
            margin: "0 0 32px 0",
            textAlign: "center",
          }}
        >
          Sound familiar?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "#F2EDE4",
              borderRadius: 16,
              padding: 28,
              boxShadow: "0 4px 24px rgba(60,40,10,0.08)",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 17,
                color: "#2C2016",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              You want to understand your faith deeply — but every time you try
              to learn, you get lost in 12 open tabs, 4 books, and a podcast that
              assumes you already know what Aquinas said.
            </p>
          </div>
          <div
            style={{
              background: "#F2EDE4",
              borderRadius: 16,
              padding: 28,
              boxShadow: "0 4px 24px rgba(60,40,10,0.08)",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 17,
                color: "#2C2016",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              You go to Mass, you pray, you mean it — but you feel like everyone
              else has a map you were never given.
            </p>
          </div>
          <div
            style={{
              background: "#F2EDE4",
              borderRadius: 16,
              padding: 28,
              boxShadow: "0 4px 24px rgba(60,40,10,0.08)",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: 17,
                color: "#2C2016",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              You want to be formed, not just informed. Behold is the path.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section
        style={{
          padding: "48px 24px 64px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#2C2016",
            margin: "0 0 40px 0",
            textAlign: "center",
          }}
        >
          How Behold works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 32,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 16 }}>
              <Icon name="pray" size={48} color="#C8932A" />
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#2C2016",
                margin: "0 0 8px 0",
              }}
            >
              Pray first
            </h3>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 16,
                color: "#8C7A62",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Every lesson opens with a short prayer. Formation begins in the
              heart.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 16 }}>
              <Icon name="learn" size={48} color="#C8932A" />
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#2C2016",
                margin: "0 0 8px 0",
              }}
            >
              Learn one thing
            </h3>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 16,
                color: "#8C7A62",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              5 interactive cards. Real content. Active recall, not passive
              reading.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: 16 }}>
              <Icon name="streak" size={48} color="#C8932A" />
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#2C2016",
                margin: "0 0 8px 0",
              }}
            >
              Build your streak
            </h3>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 16,
                color: "#8C7A62",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Come back tomorrow. The streak makes the habit.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — THE JOURNEY */}
      <section
        style={{
          padding: "48px 24px 64px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#2C2016",
            margin: "0 0 24px 0",
            textAlign: "center",
          }}
        >
          43 lessons. 5 tiers. One complete path.
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "#F59E0B",
              color: "white",
              padding: "14px 24px",
              borderRadius: 9999,
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            Foundation — 13 lessons
          </div>
          <div
            style={{
              background: "#10B981",
              color: "white",
              padding: "14px 24px",
              borderRadius: 9999,
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            Encounter — 9 lessons
          </div>
          <div
            style={{
              background: "#3B82F6",
              color: "white",
              padding: "14px 24px",
              borderRadius: 9999,
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            The Church — 11 lessons
          </div>
          <div
            style={{
              background: "#EF4444",
              color: "white",
              padding: "14px 24px",
              borderRadius: 9999,
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            Moral Life — 7 lessons
          </div>
          <div
            style={{
              background: "#8B5CF6",
              color: "white",
              padding: "14px 24px",
              borderRadius: 9999,
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: 15,
            }}
          >
            Depth — 5 lessons
          </div>
        </div>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 15,
            color: "#8C7A62",
            textAlign: "center",
            margin: 0,
          }}
        >
          Foundation is free. All tiers unlock with Plus.
        </p>
      </section>

      {/* SECTION 6 — WAITLIST / CTA */}
      <section
        style={{
          background: "#2C2016",
          padding: "56px 24px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 40,
            fontWeight: 700,
            color: "white",
            margin: "0 0 12px 0",
            textAlign: "center",
          }}
        >
          Join the waitlist.
        </h2>
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontSize: 17,
            color: "rgba(255,255,255,0.7)",
            margin: "0 0 32px 0",
            textAlign: "center",
          }}
        >
          Be first to know when new tiers launch.
        </p>
        <WaitlistForm />
      </section>

      {/* SECTION 7 — FOOTER */}
      <Footer />
    </div>
  );
}
