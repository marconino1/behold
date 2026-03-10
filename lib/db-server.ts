import { createServerSupabaseClient } from "@/lib/supabase/server";

const DB_QUERY_TIMEOUT_MS = 5000;

async function withAbortTimeout<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  timeoutMs = DB_QUERY_TIMEOUT_MS
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const result = await fn(controller.signal);
    clearTimeout(timeoutId);
    return result;
  } catch (e) {
    clearTimeout(timeoutId);
    throw e;
  }
}

export async function getUserProgressServer(
  userId: string
): Promise<string[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await withAbortTimeout((signal) =>
    supabase
      .from("lesson_progress")
      .select("lesson_id, status")
      .eq("user_id", userId)
      .abortSignal(signal)
  ).catch(() => ({ data: null, error: { message: "timeout" } })) as {
    data: Array<{ lesson_id: string; status?: string | null }>;
    error: any;
  };

  if (error) return [];
  return (data ?? [])
    .filter(
      (row) =>
        row.status !== "skipped" &&
        (row.status === "completed" || row.status == null)
    )
    .map((row) => row.lesson_id);
}

export async function getSkippedLessonIdsServer(
  userId: string
): Promise<string[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await withAbortTimeout((signal) =>
    supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", userId)
      .eq("status", "skipped")
      .abortSignal(signal)
  ).catch(() => ({ data: null, error: { message: "timeout" } })) as {
    data: Array<{ lesson_id: string }> | null;
    error: any;
  };

  if (error) return [];
  return (data ?? []).map((row) => row.lesson_id);
}

/** Single query for lesson_progress; returns completedIds, skippedIds, totalXP */
export async function getLessonProgressDataServer(userId: string): Promise<{
  completedLessonIds: string[];
  skippedLessonIds: string[];
  totalXP: number;
}> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await withAbortTimeout((signal) =>
    supabase
      .from("lesson_progress")
      .select("lesson_id, status, xp_earned")
      .eq("user_id", userId)
      .abortSignal(signal)
  ).catch(() => ({ data: null, error: { message: "timeout" } })) as {
    data: Array<{ lesson_id: string; status?: string | null; xp_earned?: number | null }>;
    error: any;
  };

  if (error) {
    return { completedLessonIds: [], skippedLessonIds: [], totalXP: 0 };
  }
  const rows = data ?? [];
  const completedLessonIds = rows
    .filter(
      (r) =>
        r.status !== "skipped" &&
        (r.status === "completed" || r.status == null)
    )
    .map((r) => r.lesson_id);
  const skippedLessonIds = rows
    .filter((r) => r.status === "skipped")
    .map((r) => r.lesson_id);
  const totalXP = rows.reduce(
    (sum, r) => sum + (r.xp_earned ?? 0),
    0
  );
  return { completedLessonIds, skippedLessonIds, totalXP };
}

export async function getProfileServer(
  userId: string
): Promise<{
  first_name: string;
  created_at: string | null;
  onboarding_complete: boolean;
  starting_lesson: string | null;
} | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await withAbortTimeout((signal) =>
    supabase
      .from("profiles")
      .select("first_name, created_at, onboarding_complete, starting_lesson")
      .eq("id", userId)
      .maybeSingle()
      .abortSignal(signal)
  ).catch(() => ({ data: null, error: { message: "timeout" } })) as {
    data: any;
    error: any;
  };

  if (error || !data) return null;
  return {
    first_name: data.first_name ?? "",
    created_at: data.created_at ?? null,
    onboarding_complete: data.onboarding_complete ?? false,
    starting_lesson: data.starting_lesson ?? null,
  };
}

export async function getStreakServer(
  userId: string
): Promise<{ current: number; longest: number }> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await withAbortTimeout((signal) =>
    supabase
      .from("streaks")
      .select("current_streak, longest_streak")
      .eq("user_id", userId)
      .maybeSingle()
      .abortSignal(signal)
  ).catch(() => ({ data: null, error: { message: "timeout" } })) as {
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
  const { data, error } = await withAbortTimeout((signal) =>
    supabase
      .from("hearts_status")
      .select("hearts, last_lost_at")
      .eq("user_id", userId)
      .maybeSingle()
      .abortSignal(signal)
  ).catch(() => ({ data: null, error: { message: "timeout" } })) as {
    data: { hearts: number; last_lost_at: string | null } | null;
    error: any;
  };

  if (error || !data) return { hearts: 5, lastLostAt: null };
  return {
    hearts: data.hearts ?? 5,
    lastLostAt: data.last_lost_at ?? null,
  };
}

export async function completeOnboardingServer(
  userId: string,
  startingLesson: string
): Promise<void> {
  const supabase = await createServerSupabaseClient();
  const { LESSON_ORDER } = await import("@/content/behold_lesson_content.js");

  const startIdx = LESSON_ORDER.indexOf(startingLesson);
  const toSkip =
    startIdx <= 0 ? [] : LESSON_ORDER.slice(0, startIdx);

  const { error: profileError } = await withAbortTimeout((signal) =>
    supabase
      .from("profiles")
      .update({
        onboarding_complete: true,
        starting_lesson: startingLesson,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .abortSignal(signal)
  );

  if (profileError) {
    console.error("[completeOnboardingServer] profiles update error:", profileError);
    throw profileError;
  }

  const { data: existing, error: existingError } = await withAbortTimeout((signal) =>
    supabase
      .from("lesson_progress")
      .select("lesson_id, status")
      .eq("user_id", userId)
      .abortSignal(signal)
  );

  if (existingError) {
    console.error("[completeOnboardingServer] lesson_progress select error:", existingError);
    throw existingError;
  }

  const completedSet = new Set(
    (existing ?? []).filter((r) => r.status === "completed" || r.status == null).map((r) => r.lesson_id)
  );

  const { error: deleteError } = await withAbortTimeout((signal) =>
    supabase
      .from("lesson_progress")
      .delete()
      .eq("user_id", userId)
      .eq("status", "skipped")
      .abortSignal(signal)
  );

  if (deleteError) {
    console.error("[completeOnboardingServer] delete skipped error:", deleteError);
    throw deleteError;
  }

  const rows = toSkip
    .filter((id) => !completedSet.has(id))
    .map((id) => ({
      user_id: userId,
      lesson_id: id,
      status: "skipped",
      xp_earned: 0,
      perfect: false,
    }));

  if (rows.length > 0) {
    const { error: upsertError } = await withAbortTimeout((signal) =>
      supabase
        .from("lesson_progress")
        .upsert(rows, { onConflict: "user_id,lesson_id" })
        .abortSignal(signal)
    );
    if (upsertError) {
      console.error("[completeOnboardingServer] lesson_progress bulk upsert error:", upsertError);
      throw upsertError;
    }
  }
}

export async function getTotalXPServer(userId: string): Promise<number> {
  const { totalXP } = await getLessonProgressDataServer(userId);
  return totalXP;
}
