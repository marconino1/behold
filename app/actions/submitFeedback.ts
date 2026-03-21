"use server";

import {
  FEEDBACK_TYPES,
  type FeedbackType,
  MAX_FEEDBACK_MESSAGE_LENGTH,
} from "@/lib/feedback";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type SubmitFeedbackResult = { error: string } | { ok: true };

export async function submitFeedback(
  type: string,
  message: string
): Promise<SubmitFeedbackResult> {
  if (!FEEDBACK_TYPES.includes(type as FeedbackType)) {
    return { error: "Please choose a valid feedback type." };
  }

  const trimmed = message.trim();
  if (!trimmed) {
    return { error: "Please enter a message." };
  }
  if (trimmed.length > MAX_FEEDBACK_MESSAGE_LENGTH) {
    return {
      error: `Message must be ${MAX_FEEDBACK_MESSAGE_LENGTH} characters or less.`,
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be signed in to send feedback." };
  }

  const { error: insertError } = await supabase.from("feedback").insert({
    user_id: user.id,
    type,
    message: trimmed,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  return { ok: true };
}
