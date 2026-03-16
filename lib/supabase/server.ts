import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";

export const createServerSupabaseClient = cache(async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
});

export const getServerUserId = cache(async (): Promise<string | null> => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  return data?.user?.id ?? null;
});

const ADMIN_EMAILS = ["marconino4@gmail.com"];

export const isAdminUser = cache(async (): Promise<boolean> => {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  const email = data?.user?.email?.toLowerCase();
  return email != null && ADMIN_EMAILS.includes(email);
});
