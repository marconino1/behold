import {
  getUserProgressServer,
  getProfileServer,
  getStreakServer,
  getTotalXPServer,
} from "@/lib/db-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { withTimeout } from "@/lib/with-timeout";
import { DAY_PLAN } from "@/content/behold_lesson_content.js";
import PathScreen from "@/components/dashboard/PathScreen";

export const metadata = {
  title: "Behold — Your Path",
};

const DB_TIMEOUT_MS = 8000;

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data } = await withTimeout(
    supabase.auth.getSession(),
    5000,
    "Session check timed out"
  ).catch(() => ({ data: { session: null } }));

  const userId = data?.session?.user?.id;
  if (!userId) {
    redirect("/login");
  }

  const [profile, completedLessonIds, streak, xp] = await withTimeout(
    Promise.all([
      getProfileServer(userId),
      getUserProgressServer(userId),
      getStreakServer(userId),
      getTotalXPServer(userId),
    ]),
    DB_TIMEOUT_MS,
    "Loading your progress timed out"
  ).catch(() => [
    { first_name: "", created_at: null },
    [] as string[],
    { current: 0, longest: 0 },
    0,
  ]);

  return (
    <PathScreen
      firstName={profile?.first_name ?? ""}
      streak={streak.current}
      xp={xp}
      completedLessonIds={completedLessonIds}
      dayPlan={DAY_PLAN}
    />
  );
}
