"use server"

import { db } from "@/lib/db"
import { createClient } from "@/lib/supabase/server"
import { getUserById } from "@/features/auth/server/db/getUserById"
import { sendAccountDeletedEmail } from "@/features/mail/server/actions/sendAccountDeletedEmail"

export async function deleteAccount({ userId }: { userId: string }) {
  try {
    const user = await getUserById(userId)

    if (user == null) {
      return {
        error: true,
        message: "User not found",
      }
    }

    await db.user.delete({
      where: {
        id: userId,
      },
    })

    const supabase = await createClient()

    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) {
      console.error("Error deleting user from Supabase:", error)
      return {
        error: true,
        message: "Failed to delete account authentication data",
      }
    }

    await supabase.auth.signOut()

    await sendAccountDeletedEmail({
      to: user.email,
    })

    return {
      error: false,
      message: "Account deleted successfully",
    }
  } catch (error) {
    console.error("Error deleting account:", error)
    return {
      error: true,
      message: "Failed to delete account",
    }
  }
}
