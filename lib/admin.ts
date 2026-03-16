export const ADMIN_EMAILS = ["marconino4@gmail.com"];

export function isAdminEmail(email: string | null | undefined): boolean {
  const lower = email?.toLowerCase();
  return lower != null && ADMIN_EMAILS.includes(lower);
}
