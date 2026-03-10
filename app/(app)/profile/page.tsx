import {
  getLessonProgressDataServer,
  getProfileServer,
  getStreakServer,
} from "@/lib/db-server";
import Link from "next/link";
import { getServerUserId } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LESSONS } from "@/content/behold_lesson_content.js";
import Leo from "@/components/mascot/Leo";
import Icon from "@/components/icons/Icon";
import ProgressBar from "@/components/ui/ProgressBar";
import SignOutButton from "@/components/app/SignOutButton";

export const metadata = {
  title: "Behold — Profile",
};

const TIER_ORDER = [
  "Entry",
  "Foundation",
  "Encounter",
  "Church",
  "Moral Life",
  "Depth — Prayer",
];

type TierProgress = {
  tier: string;
  tierColor: string;
  total: number;
  completed: number;
};

function buildTierProgress(
  completedLessonIds: string[]
): TierProgress[] {
  const byTier = new Map<string, { tierColor: string; lessonIds: string[] }>();

  for (const lesson of Object.values(LESSONS)) {
    if (!lesson?.id || !lesson?.tier) continue;
    const tier = lesson.tier as string;
    const tierColor = (lesson.tierColor as string) ?? "#F59E0B";
    if (!byTier.has(tier)) {
      byTier.set(tier, { tierColor, lessonIds: [] });
    }
    byTier.get(tier)!.lessonIds.push(lesson.id);
  }

  return TIER_ORDER.filter((t) => byTier.has(t)).map((tier) => {
    const { tierColor, lessonIds } = byTier.get(tier)!;
    const completed = lessonIds.filter((id) =>
      completedLessonIds.includes(id)
    ).length;
    return {
      tier,
      tierColor,
      total: lessonIds.length,
      completed,
    };
  });
}

const STARTING_LESSON_LABELS: Record<string, string> = {
  K0: "Beginner",
  A1: "Journeying",
  C1: "Confirmed",
  G1: "Formed",
};

function formatJourneySince(createdAt: string | null): string {
  if (!createdAt) return "Journeying since recently";
  const d = new Date(createdAt);
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();
  return `Journeying since ${month} ${year}`;
}

type ProfileData = [
  { first_name: string; created_at: string | null; starting_lesson?: string | null } | null,
  string[],
  { current: number; longest: number },
  number,
];

export default async function ProfilePage() {
  const userId = await getServerUserId();
  if (!userId) {
    redirect("/login");
  }

  let profile: ProfileData[0];
  let completedLessonIds: string[];
  let streak: ProfileData[2];
  let xp: number;

  try {
    const [profileRes, lessonProgress, streakRes] = await Promise.all([
      getProfileServer(userId),
      getLessonProgressDataServer(userId),
      getStreakServer(userId),
    ]);
    profile = profileRes;
    completedLessonIds = lessonProgress.completedLessonIds;
    streak = streakRes;
    xp = lessonProgress.totalXP;
  } catch {
    profile = { first_name: "", created_at: null, starting_lesson: null };
    completedLessonIds = [];
    streak = { current: 0, longest: 0 };
    xp = 0;
  }

  const tierProgress = buildTierProgress(completedLessonIds);
  const lessonsDone = completedLessonIds.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0C4A6E 0%, #0369A1 40%, #FAF7F2 100%)",
        paddingBottom: 100,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        {/* SECTION 1 — HERO */}
        <section
          style={{
            textAlign: "center",
            paddingTop: 24,
            paddingBottom: 32,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <Leo state="idle" size="session" />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              margin: "0 0 8px 0",
            }}
          >
            {profile?.first_name || "Friend"}
          </h1>
          <p
            style={{
              fontFamily: "'Nunito', system-ui, sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
            }}
          >
            {formatJourneySince(profile?.created_at ?? null)}
          </p>
        </section>

        {/* SECTION 2 — STATS TILES */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: 20,
              textAlign: "center",
            }}
          >
            <Icon name="streak" size={28} color="white" />
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "white",
                margin: "8px 0 4px 0",
              }}
            >
              {streak.current}
            </p>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.9)",
                margin: 0,
              }}
            >
              day streak
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: 20,
              textAlign: "center",
            }}
          >
            <Icon name="star" size={28} color="white" />
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "white",
                margin: "8px 0 4px 0",
              }}
            >
              {streak.longest}
            </p>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.9)",
                margin: 0,
              }}
            >
              personal best
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: 20,
              textAlign: "center",
            }}
          >
            <Icon name="star" size={28} color="white" />
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "white",
                margin: "8px 0 4px 0",
              }}
            >
              {xp}
            </p>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.9)",
                margin: 0,
              }}
            >
              total XP
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: 20,
              textAlign: "center",
            }}
          >
            <Icon name="learn" size={28} color="white" />
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 800,
                fontSize: 24,
                color: "white",
                margin: "8px 0 4px 0",
              }}
            >
              {lessonsDone}
            </p>
            <p
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.9)",
                margin: 0,
              }}
            >
              lessons done
            </p>
          </div>
        </section>

        {/* DISABLED — level selection onboarding. Commented out for now, revisit later.
        SECTION — YOUR STARTING POINT
        <section
          style={{
            background: "white",
            borderRadius: 20,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#2C2016",
              margin: "0 0 12px 0",
            }}
          >
            Your starting point
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 15,
                color: "#2C2016",
              }}
            >
              {profile?.starting_lesson
                ? STARTING_LESSON_LABELS[profile.starting_lesson] ?? profile.starting_lesson
                : "Beginner"}
            </span>
            <Link
              href="/onboarding/level?from=profile"
              style={{
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontSize: 14,
                color: "#C8932A",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Update
            </Link>
          </div>
        </section>
        */}

        {/* SECTION 3 — TIER PROGRESS */}
        <section
          style={{
            background: "white",
            borderRadius: 20,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            padding: 24,
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#2C2016",
              margin: "0 0 20px 0",
            }}
          >
            Tier progress
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {tierProgress.map((t) => (
              <div key={t.tier}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: t.tierColor,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#2C2016",
                    }}
                  >
                    {t.tier}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Nunito', system-ui, sans-serif",
                      fontSize: 14,
                      color: "#8C7A62",
                      marginLeft: "auto",
                    }}
                  >
                    {t.completed} / {t.total} lessons
                  </span>
                </div>
                <ProgressBar
                  value={t.total > 0 ? (t.completed / t.total) * 100 : 0}
                  color={t.tierColor}
                  height={8}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 — SIGN OUT */}
        <section style={{ textAlign: "center" }}>
          <SignOutButton />
        </section>
      </div>
    </div>
  );
}
