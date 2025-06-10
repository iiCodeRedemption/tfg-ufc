"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  revalidatePath("/", "layout")
}
