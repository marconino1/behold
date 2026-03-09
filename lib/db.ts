import { createClient } from "@/lib/supabase/client";
import { calculateCurrentHearts } from "@/lib/hearts";

export async function getHeartsStatus(
  userId: string
): Promise<{ hearts: number; lastLostAt: string | null }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("hearts_status")
    .select("hearts, last_lost_at")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return { hearts: 5, lastLostAt: null };
  return {
    hearts: data.hearts ?? 5,
    lastLostAt: data.last_lost_at ?? null,
  };
}

export async function loseHeart(
  userId: string
): Promise<{ hearts: number; lastLostAt: string }> {
  const supabase = createClient();
  const status = await getHeartsStatus(userId);
  const { currentHearts } = calculateCurrentHearts(
    status.hearts,
    status.lastLostAt
  );

  if (currentHearts <= 0) {
    return {
      hearts: 0,
      lastLostAt: status.lastLostAt ?? new Date().toISOString(),
    };
  }

  const newHearts = currentHearts - 1;
  const now = new Date().toISOString();

  const { error } = await supabase.from("hearts_status").upsert(
    {
      user_id: userId,
      hearts: newHearts,
      last_lost_at: now,
      updated_at: now,
    },
    { onConflict: "user_id" }
  );

  if (error) throw error;
  return { hearts: newHearts, lastLostAt: now };
}

export async function getUserProgress(userId: string): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId);

  if (error) throw error;
  return (data ?? []).map((row) => row.lesson_id);
}

export async function completeLesson(
  userId: string,
  lessonId: string,
  xpEarned: number,
  _heartsRemaining: number,
  perfect: boolean
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      xp_earned: xpEarned,
      perfect,
    },
    { onConflict: "user_id,lesson_id" }
  );

  if (error) throw error;
}

export async function logPrayer(userId: string, lessonId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("prayer_log").insert({
    user_id: userId,
    lesson_id: lessonId,
  });

  if (error) {
    if (error.code === "23505") return;
    throw error;
  }
}

export async function hasPrayedToday(
  userId: string,
  lessonId: string
): Promise<boolean> {
  const supabase = createClient();
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("prayer_log")
    .select("id")
    .eq("user_id", userId)
    .eq("lesson_id", lessonId)
    .gte("prayed_at", `${today}T00:00:00.000Z`)
    .lt("prayed_at", `${tomorrow}T00:00:00.000Z`)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data != null;
}

export async function getStreak(
  userId: string
): Promise<{ current: number; longest: number }> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("streaks")
    .select("current_streak, longest_streak")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return {
    current: data?.current_streak ?? 0,
    longest: data?.longest_streak ?? 0,
  };
}

export async function getProfile(
  userId: string
): Promise<{ first_name: string; created_at: string } | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, created_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    first_name: data.first_name ?? "",
    created_at: data.created_at,
  };
}
