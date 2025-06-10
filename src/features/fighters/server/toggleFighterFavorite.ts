"use server"

import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { db } from "@/lib/db"
import { revalidatePath, revalidateTag } from "next/cache"
import { getFighterFavorite } from "@/features/fighters/server/db/getFighterFavorite"
import { getFighterById } from "@/features/fighters/server/db/getFighterById"
import { CACHE_TAGS } from "@/data/constants/cache"

export async function toggleFighterFavorite(fighterId: string) {
  try {
    const user = await getCurrentUser()
    if (user == null) {
      return {
        error: true,
        message: "You can't favorite a fighter if you're not logged in",
      }
    }

    const fighter = await getFighterById(fighterId)
    if (fighter == null) return { error: true, message: "Fighter not found" }

    const favorite = await getFighterFavorite(user.id, fighterId)

    if (favorite == null) {
      await db.fighterFavorite.create({
        data: {
          userId: user.id,
          fighterId,
        },
      })
    } else {
      await db.fighterFavorite.delete({
        where: { id: favorite.id },
      })
    }

    revalidateTag(`${CACHE_TAGS.fighter}:${CACHE_TAGS.favorite}`)
    revalidatePath(`/fighters/${fighterId}`)
    revalidatePath("/favorites")

    return {
      error: false,
      message: `Fighter ${favorite == null ? "added" : "removed"} from favorites`,
    }
  } catch (error) {
    console.error("Error toggling fighter favorite:", error)
    return { error: true, message: "Failed to add fighter to favorites" }
  }
}
