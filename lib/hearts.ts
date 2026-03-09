const REFILL_INTERVAL_MS = 5 * 60 * 60 * 1000; // 5 hours

export function calculateCurrentHearts(
  hearts: number,
  lastLostAt: string | null
): { currentHearts: number; nextRefillAt: Date | null } {
  if (hearts >= 5 || lastLostAt === null) {
    return { currentHearts: 5, nextRefillAt: null };
  }

  const lastLost = new Date(lastLostAt);
  const now = new Date();
  const elapsedMs = now.getTime() - lastLost.getTime();
  const intervalsPassed = Math.floor(elapsedMs / REFILL_INTERVAL_MS);
  const heartsRefilled = Math.min(intervalsPassed, 5 - hearts);
  const newHearts = Math.min(5, hearts + heartsRefilled);

  if (newHearts >= 5) {
    return { currentHearts: 5, nextRefillAt: null };
  }

  const nextRefillAt = new Date(
    lastLost.getTime() + (heartsRefilled + 1) * REFILL_INTERVAL_MS
  );

  return { currentHearts: newHearts, nextRefillAt };
}
