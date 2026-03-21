"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function SignOutButton({
  lightOnBlue,
}: {
  /** High-contrast white treatment for blue gradient backgrounds (e.g. profile). */
  lightOnBlue?: boolean;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      style={
        lightOnBlue
          ? {
              color: "white",
              border: "2px solid rgba(255,255,255,0.9)",
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }
          : undefined
      }
    >
      Sign out
    </Button>
  );
}
