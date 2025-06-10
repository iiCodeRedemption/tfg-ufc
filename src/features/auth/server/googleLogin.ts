"use server"

import { createClient } from "@/lib/supabase/server"
import { env } from "@/data/env/client"

export async function googleLogin({
  redirectTo,
}: { redirectTo?: string } = {}) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirectTo=${redirectTo ?? "/"}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  })

  if (error) {
    return { error: true, message: error.message ?? "An error occurred" }
  }

  return { error: false, url: data.url }
}
