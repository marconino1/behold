"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { withTimeout } from "@/lib/with-timeout";

export type WaitlistResult = { ok: true } | { ok: false; error: "duplicate" | "invalid" };

const WAITLIST_TIMEOUT_MS = 5000;

export async function addToWaitlist(email: string): Promise<WaitlistResult> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: "invalid" };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await withTimeout(
    supabase.from("waitlist").insert({
      email: trimmed,
      source: "landing",
    }),
    WAITLIST_TIMEOUT_MS,
    "Waitlist signup timed out"
  ).catch(() => ({ error: { code: "timeout" } }));

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "duplicate" };
    }
    return { ok: false, error: "invalid" };
  }

  return { ok: true };
}
