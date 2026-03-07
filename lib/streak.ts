import { createClient } from "@/lib/supabase/client";

function getTodayString(): string {
  return new Date().toLocaleDateString("en-CA");
}

function getYesterdayString(): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString("en-CA");
}

function getTodayRange(): { start: string; end: string } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

export async function checkAndUpdateStreak(userId: string): Promise<number> {
  try {
    const supabase = createClient();
    const today = getTodayString();
    const yesterday = getYesterdayString();
    const { start: todayStart, end: todayEnd } = getTodayRange();

    const { data: streakRow, error: streakError } = await supabase
      .from("streaks")
      .select("current_streak, longest_streak, last_activity_date")
      .eq("user_id", userId)
      .maybeSingle();

    if (streakError || !streakRow) {
      return 0;
    }

    const { data: lessonToday } = await supabase
      .from("lesson_progress")
      .select("id")
      .eq("user_id", userId)
      .gte("completed_at", todayStart)
      .lt("completed_at", todayEnd)
      .limit(1)
      .maybeSingle();

    const { data: prayerToday } = await supabase
      .from("prayer_log")
      .select("id")
      .eq("user_id", userId)
      .gte("prayed_at", todayStart)
      .lt("prayed_at", todayEnd)
      .limit(1)
      .maybeSingle();

    const hasLessonToday = lessonToday != null;
    const hasPrayerToday = prayerToday != null;
    const bothDoneToday = hasLessonToday && hasPrayerToday;

    if (!bothDoneToday) {
      return streakRow.current_streak ?? 0;
    }

    const lastActivity = streakRow.last_activity_date
      ? new Date(streakRow.last_activity_date).toISOString().slice(0, 10)
      : null;

    if (lastActivity === today) {
      return streakRow.current_streak ?? 0;
    }

    let newCurrent = 1;
    let newLongest = streakRow.longest_streak ?? 0;

    if (lastActivity === yesterday) {
      newCurrent = (streakRow.current_streak ?? 0) + 1;
      newLongest = Math.max(newLongest, newCurrent);
    }

    const { error: updateError } = await supabase
      .from("streaks")
      .update({
        current_streak: newCurrent,
        longest_streak: newLongest,
        last_activity_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (updateError) {
      return streakRow.current_streak ?? 0;
    }

    return newCurrent;
  } catch {
    return 0;
  }
}

export async function getStreakStatus(
  userId: string
): Promise<{ current: number; longest: number; completedToday: boolean }> {
  try {
    const supabase = createClient();
    const { start: todayStart, end: todayEnd } = getTodayRange();

    const { data: streakRow, error: streakError } = await supabase
      .from("streaks")
      .select("current_streak, longest_streak")
      .eq("user_id", userId)
      .maybeSingle();

    if (streakError) {
      return { current: 0, longest: 0, completedToday: false };
    }

    const { data: lessonToday } = await supabase
      .from("lesson_progress")
      .select("id")
      .eq("user_id", userId)
      .gte("completed_at", todayStart)
      .lt("completed_at", todayEnd)
      .limit(1)
      .maybeSingle();

    const { data: prayerToday } = await supabase
      .from("prayer_log")
      .select("id")
      .eq("user_id", userId)
      .gte("prayed_at", todayStart)
      .lt("prayed_at", todayEnd)
      .limit(1)
      .maybeSingle();

    const completedToday =
      lessonToday != null && prayerToday != null;

    return {
      current: streakRow?.current_streak ?? 0,
      longest: streakRow?.longest_streak ?? 0,
      completedToday,
    };
  } catch {
    return { current: 0, longest: 0, completedToday: false };
  }
}
