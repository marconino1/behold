"use server";

import { completeOnboardingServer } from "@/lib/db-server";
import { getServerUserId } from "@/lib/supabase/server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function completeOnboardingAction(
  startingLesson: string
): Promise<{ success: false; error: string } | void> {
  try {
    const userId = await getServerUserId();
    if (!userId) {
      redirect("/login");
    }

    await completeOnboardingServer(userId, startingLesson);
  } catch (err) {
    if (isRedirectError(err)) throw err;
    const message = err instanceof Error ? err.message : String(err);
    console.error("[completeOnboardingAction] error:", err);
    return { success: false, error: message };
  }
  redirect("/dashboard");
}
