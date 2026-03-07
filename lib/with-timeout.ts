/**
 * Wraps a promise with a timeout. Rejects with a TimeoutError if the promise
 * doesn't resolve within the given ms. Use to prevent Supabase/network calls
 * from hanging indefinitely.
 */
export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message = "Operation timed out"
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new TimeoutError(message)), ms)
    ),
  ]);
}
