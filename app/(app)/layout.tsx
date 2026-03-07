import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { withTimeout } from "@/lib/with-timeout";
import BottomNav from "@/components/app/BottomNav";

const AUTH_TIMEOUT_MS = 5000;

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lightweight session check: getSession reads from cookies (no network).
  // Proxy already validated auth for protected routes; this is a fast sanity check.
  const supabase = await createServerSupabaseClient();
  const { data } = await withTimeout(
    supabase.auth.getSession(),
    AUTH_TIMEOUT_MS,
    "Session check timed out"
  ).catch(() => ({ data: { session: null } }));

  if (!data?.session) {
    redirect("/login");
  }

  return (
    <>
      <main style={{ paddingBottom: 80 }}>{children}</main>
      <BottomNav />
    </>
  );
}
