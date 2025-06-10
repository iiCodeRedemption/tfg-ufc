import { createClient } from "@/lib/supabase/server"
import { getUserById } from "@/features/auth/server/db/getUserById"
import { User } from "@prisma/client"
import { User as UserSupabase } from "@supabase/supabase-js"

export async function getCurrentUser(): Promise<UserSupabase | null>
export async function getCurrentUser({
  fullUser,
}: {
  fullUser: true
}): Promise<User | null>
export async function getCurrentUser({
  fullUser,
}: {
  fullUser: false
}): Promise<UserSupabase | null>
export async function getCurrentUser({
  fullUser = false,
}: {
  fullUser?: boolean
} = {}): Promise<User | UserSupabase | null> {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || user == null) {
    return null
  }

  return fullUser ? await getUserById(user.id) : user
}
