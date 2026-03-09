import { createServerSupabaseClient } from "@/lib/supabase/server";
import { withTimeout } from "@/lib/with-timeout";

const DB_QUERY_TIMEOUT_MS = 5000;

export async function getUserProgressServer(
  userId: string
): Promise<string[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = (await withTimeout(
    supabase.from("lesson_progress").select("lesson_id").eq("user_id", userId).then(r => r),
    DB_QUERY_TIMEOUT_MS,
    "getUserProgress timed out"
  ).catch(() => ({ data: null, error: { message: "timeout" } }))) as {
    data: any;
    error: any;
  };

  if (error) return [];
  return (data ?? []).map((row: { lesson_id: string }) => row.lesson_id);
}

export async function getProfileServer(
  userId: string
): Promise<{ first_name: string; created_at: string | null } | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = (await withTimeout(
    supabase
      .from("profiles")
      .select("first_name, created_at")
      .eq("id", userId)
      .maybeSingle()
      .then(r => r),
    DB_QUERY_TIMEOUT_MS,
    "getProfile timed out"
  ).catch(() => ({ data: null, error: { message: "timeout" } }))) as {
    data: any;
    error: any;
  };

  if (error || !data) return null;
  return {
    first_name: data.first_name ?? "",
    created_at: data.created_at ?? null,
  };
}

export async function getStreakServer(
  userId: string
): Promise<{ current: number; longest: number }> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = (await withTimeout(
    supabase
      .from("streaks")
      .select("current_streak, longest_streak")
      .eq("user_id", userId)
      .maybeSingle()
      .then(r => r),
    DB_QUERY_TIMEOUT_MS,
    "getStreak timed out"
  ).catch(() => ({ data: null, error: { message: "timeout" } }))) as {
    data: any;
    error: any;
  };

  if (error) return { current: 0, longest: 0 };
  return {
    current: data?.current_streak ?? 0,
    longest: data?.longest_streak ?? 0,
  };
}

export async function getHeartsStatusServer(
  userId: string
): Promise<{ hearts: number; lastLostAt: string | null }> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = (await withTimeout(
    supabase
      .from("hearts_status")
      .select("hearts, last_lost_at")
      .eq("user_id", userId)
      .maybeSingle()
      .then((r) => r),
    DB_QUERY_TIMEOUT_MS,
    "getHeartsStatus timed out"
  ).catch(() => ({ data: null, error: { message: "timeout" } }))) as {
    data: { hearts: number; last_lost_at: string | null } | null;
    error: any;
  };

  if (error || !data) return { hearts: 5, lastLostAt: null };
  return {
    hearts: data.hearts ?? 5,
    lastLostAt: data.last_lost_at ?? null,
  };
}

export async function getTotalXPServer(userId: string): Promise<number> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = (await withTimeout(
    supabase.from("lesson_progress").select("xp_earned").eq("user_id", userId).then(r => r),
    DB_QUERY_TIMEOUT_MS,
    "getTotalXP timed out"
  ).catch(() => ({ data: null, error: { message: "timeout" } }))) as {
    data: any;
    error: any;
  };

  if (error) return 0;
  return (data ?? []).reduce(
    (sum: number, row: { xp_earned: number | null }) => sum + (row.xp_earned ?? 0),
    0
  );
}
