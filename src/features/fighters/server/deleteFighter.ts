"use server"

import { revalidateTag, revalidatePath } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { deleteFighter as deleteFighterDb } from "@/features/fighters/server/db/deleteFighter"
import { deleteImageFromStorage } from "@/lib/supabase/deleteImage"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"

export async function deleteFighter(fighterId: string) {
  const user = await getCurrentUser({ fullUser: true })
  if (user == null || !canAccessAdmin(user)) {
    return {
      error: true,
      message: "You do not have permission to create an event",
    }
  }

  try {
    const result = await deleteFighterDb(fighterId)

    if (result.error || result.fighter == null) {
      return { error: true, message: result.error }
    }

    if (result.fighter.imageUrl != null) {
      const deleteResult = await deleteImageFromStorage({
        imageUrl: result.fighter.imageUrl,
        bucket: "fighters",
      })

      if (deleteResult.error) {
        console.error("Error deleting fighter image:", deleteResult.message)
        return { error: true, message: "Failed to delete fighter image" }
      }
    }

    revalidateTag(`${CACHE_TAGS.fighter}:${fighterId}`)
    revalidateTag(CACHE_TAGS.fighter)

    revalidatePath("/admin")

    return { error: false }
  } catch (error) {
    console.error("Error deleting fighter:", error)
    return { error: true, message: "Failed to delete fighter" }
  }
}
