"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { RegisterSchema } from "@/features/auth/schemas/registerSchema"
import { registerSchema } from "@/features/auth/schemas/registerSchema"
import { createUser } from "@/features/auth/server/createUser"
import { getUserByEmail } from "@/features/auth/server/db/getUserByEmail"
import { sendWelcomeEmail } from "@/features/mail/server/actions/sendWelcomeEmail"

export async function register(unsafeData: RegisterSchema) {
  const { success, data } = registerSchema.safeParse(unsafeData)
  if (!success) {
    return { error: true, message: "Invalid register data" }
  }

  const supabase = await createClient()

  const existingUser = await getUserByEmail(data.email)
  if (existingUser != null) {
    return { error: true, message: "User already exists" }
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (error) {
    return { error: true, message: error.message ?? "An error occurred" }
  }

  if (user == null || user.email == null) {
    return { error: true, message: "Failed to create user" }
  }

  const createUserResult = await createUser({
    userId: user.id,
    email: user.email,
    username: data.username,
  })

  if (createUserResult.error) {
    return { error: true, message: createUserResult.message }
  }

  await sendWelcomeEmail({
    to: user.email,
  })

  revalidatePath("/", "layout")
  return { error: false }
}
