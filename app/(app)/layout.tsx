import { redirect } from "next/navigation";
import { getServerUserId } from "@/lib/supabase/server";
import BottomNav from "@/components/app/BottomNav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getServerUserId();
  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <main style={{ paddingBottom: 80 }}>{children}</main>
      <BottomNav />
    </>
  );
}
