"use server";

import { calculateCurrentHearts } from "@/lib/hearts";
import {
  getHeartsStatusServer,
  syncHeartsToDb,
} from "@/lib/db-server";
import { getServerUserId } from "@/lib/supabase/server";

/**
 * Recomputes hearts on the server and persists if refilled.
 * Call from the client after local calculateCurrentHearts indicates a sync is needed.
 */
export async function syncHeartsToDbForSessionUser(userId: string): Promise<void> {
  try {
    const sessionUserId = await getServerUserId();
    if (!sessionUserId || sessionUserId !== userId) return;

    const { hearts: rawHearts, lastLostAt } = await getHeartsStatusServer(userId);
    const { currentHearts } = calculateCurrentHearts(rawHearts, lastLostAt);
    if (currentHearts > rawHearts) {
      await syncHeartsToDb(userId, currentHearts);
    }
  } catch {
    // background sync — never throw to client
  }
}
