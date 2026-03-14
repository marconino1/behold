import Link from "next/link";
import Icon from "@/components/icons/Icon";

export const metadata = {
  title: "Privacy Policy — Behold",
  description:
    "How Behold collects, uses, and protects your personal information.",
};

function getBackUrl(from: string | undefined): string {
  if (from === "profile") return "/profile";
  if (from === "signup") return "/signup";
  return "/";
}

const listStyle = {
  listStyle: "none" as const,
  margin: "8px 0 0 0",
  padding: 0,
};

const listItemStyle = {
  borderLeft: "2px solid var(--color-gold)",
  paddingLeft: 12,
  marginBottom: 4,
  fontFamily: "'Nunito', system-ui, sans-serif",
  fontWeight: 400,
  color: "var(--color-text-muted)",
  lineHeight: 1.6,
};

const SECTIONS = [
  {
    title: "Who We Are",
    body: "Behold is a Catholic faith formation app. We are committed to handling your personal information with care and respect.",
  },
  {
    title: "What We Collect",
    body: (
      <>
        <strong>Account information:</strong> When you create an account, we
        collect your name, email address, and password. Your password is
        encrypted using industry-standard hashing — we never store it in plain
        text and cannot read it.
        <br />
        <br />
        <strong>Usage data:</strong> While you use the app, we collect
        information about how you interact with lessons and prayers — which
        cards you complete, which answers you choose, how long you spend on each
        activity, your streak history, and your progress through the curriculum.
        We use this data to understand how people learn and to improve the app.
        <br />
        <br />
        <strong>No other data:</strong> We do not collect payment information,
        location data, or any data from your device beyond what is described
        above.
      </>
    ),
  },
  {
    title: "How We Use Your Information",
    body: (
      <>
        We use your information to:
        <ul style={listStyle}>
          <li style={listItemStyle}>Create and maintain your account</li>
          <li style={listItemStyle}>Save your progress and streaks</li>
          <li style={listItemStyle}>
            Improve lesson content and the learning experience
          </li>
          <li style={listItemStyle}>
            Send you occasional product updates (you may opt out at any time)
          </li>
        </ul>
        <br />
        We do not sell your personal information. We do not share it with
        advertisers. We do not use it for any purpose other than operating and
        improving Behold.
      </>
    ),
  },
  {
    title: "How We Store Your Information",
    body:
      "Your data is stored securely using Supabase, a third-party database provider. Supabase is GDPR-compliant and processes data under a formal Data Processing Addendum. Data is encrypted in transit and at rest.",
  },
  {
    title: "Your Rights",
    body:
      "You may request access to, correction of, or deletion of your personal data at any time by emailing us. We will respond within 30 days. If you delete your account, all associated data is permanently removed from our systems within 30 days. We retain your data only for as long as your account is active.",
  },
  {
    title: "Children",
    body:
      "Behold is not intended for children under 13. We do not knowingly collect information from children under 13.",
  },
  {
    title: "Changes to This Policy",
    body:
      "If we materially change this policy, we will notify you via email or an in-app notice. Continued use of the app after changes constitutes acceptance.",
  },
  {
    title: "Contact",
    body: (
      <>
        Questions? Email us at:{" "}
        <a href="mailto:privacy@behold.app" className="link-gold">
          privacy@behold.app
        </a>
      </>
    ),
  },
];

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;
  const backUrl = getBackUrl(params?.from);

  return (
    <div
      style={{
        background: "var(--color-bg)",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 2px 12px rgba(60,40,10,0.08)",
        }}
      >
        <Link
          href={backUrl}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 16px",
            borderRadius: 9999,
            background: "var(--color-surface-warm)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            textDecoration: "none",
            fontFamily: "'Nunito', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          <Icon name="arrow-left" size={18} color="var(--color-text)" />
        </Link>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          Privacy Policy
        </h1>
      </header>

      <div
        style={{
          maxWidth: 672,
          margin: "0 auto",
          padding: "40px 24px 64px",
        }}
      >
        <p
          style={{
            fontFamily: "'Nunito', system-ui, sans-serif",
            color: "var(--color-text-muted)",
            marginTop: 0,
            marginBottom: 40,
          }}
        >
          Last updated: March 14, 2026
        </p>

        {SECTIONS.map((section, i) => (
          <section
            key={i}
            style={{
              background: "var(--color-surface-warm)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: 24,
              marginBottom: 16,
              boxShadow: "0 2px 12px rgba(60,40,10,0.08)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 700,
                color: "var(--color-text)",
                marginBottom: 8,
              }}
            >
              {section.title}
            </h2>
            <div
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 400,
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
              }}
            >
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
