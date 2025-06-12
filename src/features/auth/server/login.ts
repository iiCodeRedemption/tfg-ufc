"use server"

import { LoginFormData } from "@/features/auth/schemas/loginSchema"
import { loginSchema } from "@/features/auth/schemas/loginSchema"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function login(
  unsafeData: LoginFormData,
  { redirectTo }: { redirectTo?: string } = {},
) {
  const { success, data } = loginSchema.safeParse(unsafeData)
  if (!success) {
    return { error: true, message: "Invalid login data" }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) {
    return { error: true, message: error.message || "An error ocurred" }
  }

  revalidatePath("/", "layout")
  redirect(redirectTo || "/")
}
