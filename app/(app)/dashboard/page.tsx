import {
  getHeartsStatusServer,
  getLessonProgressDataServer,
  getProfileServer,
  getStreakServer,
} from "@/lib/db-server";
import { getServerUserId, isAdminUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DAY_PLAN, SECTION_CONFIG } from "@/content/behold_lesson_content.js";
import { calculateCurrentHearts } from "@/lib/hearts";
import PathScreen from "@/components/dashboard/PathScreen";

export const metadata = {
  title: "Behold — Your Path",
};

export default async function DashboardPage() {
  const userId = await getServerUserId();
  if (!userId) {
    redirect("/login");
  }

  let profile: Awaited<ReturnType<typeof getProfileServer>>;
  let lessonProgress: Awaited<ReturnType<typeof getLessonProgressDataServer>>;
  let streak: Awaited<ReturnType<typeof getStreakServer>>;
  let heartsStatus: Awaited<ReturnType<typeof getHeartsStatusServer>>;

  try {
    [profile, lessonProgress, streak, heartsStatus] = await Promise.all([
      getProfileServer(userId),
      getLessonProgressDataServer(userId),
      getStreakServer(userId),
      getHeartsStatusServer(userId),
    ]);
  } catch {
    profile = null;
    lessonProgress = { completedLessonIds: [], skippedLessonIds: [], totalXP: 0 };
    streak = { current: 0, longest: 0 };
    heartsStatus = { hearts: 5, lastLostAt: null };
  }

  const completedLessonIds = lessonProgress.completedLessonIds;
  const skippedLessonIds = lessonProgress.skippedLessonIds;
  const xp = lessonProgress.totalXP;

  // DISABLED — level selection onboarding. New users go straight to dashboard.
  // if (!profile?.onboarding_complete) {
  //   redirect("/onboarding/level");
  // }

  const { currentHearts, nextRefillAt } = calculateCurrentHearts(
    heartsStatus.hearts,
    heartsStatus.lastLostAt
  );

  const startingLesson = profile?.starting_lesson ?? "K0";
  const isAdmin = await isAdminUser();

  return (
    <PathScreen
      firstName={profile?.first_name ?? ""}
      streak={streak.current}
      xp={xp}
      completedLessonIds={completedLessonIds}
      skippedLessonIds={skippedLessonIds}
      startingLesson={startingLesson}
      dayPlan={DAY_PLAN}
      sectionConfig={SECTION_CONFIG}
      isAdmin={isAdmin}
      currentHearts={currentHearts}
      nextRefillAt={nextRefillAt?.toISOString() ?? null}
    />
  );
}
