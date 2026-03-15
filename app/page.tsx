import { getServerUserId } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Demo from "@/components/landing/Demo";
import Roadmap from "@/components/landing/Roadmap";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";

export default async function LandingPage() {
  const userId = await getServerUserId();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <Demo />
      <Roadmap />
      <HowItWorks />

      {/* Bottom CTA */}
      <section
        style={{
          textAlign: "center",
          padding: "64px 24px 56px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 30,
            fontWeight: 700,
            color: "var(--color-text)",
            margin: "0 0 24px 0",
          }}
        >
          Start your journey today
        </h2>
        <Link
          href="/signup"
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 16,
            borderRadius: 9999,
            padding: "14px 40px",
            display: "inline-flex",
            alignItems: "center",
            background: "var(--color-gold)",
            color: "white",
            border: "none",
            textDecoration: "none",
            boxShadow: "0 3px 12px rgba(200,147,42,.3)",
          }}
        >
          Create free account
        </Link>
      </section>

      <Footer />
    </div>
  );
}
