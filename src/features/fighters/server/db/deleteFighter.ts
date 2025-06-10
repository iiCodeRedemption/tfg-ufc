import { CACHE_TAGS } from "@/data/constants/cache"
import { db } from "@/lib/db"
import { revalidateTag } from "next/cache"

export async function deleteFighter(fighterId: string) {
  try {
    const fighter = await db.fighter.findUnique({
      where: { id: fighterId },
    })

    if (!fighter) {
      return {
        error: "Fighter not found",
        fighter: null,
      }
    }

    await db.fighter.delete({
      where: { id: fighterId },
    })

    revalidateTag(CACHE_TAGS.fighter)

    return {
      error: null,
      fighter,
    }
  } catch (error) {
    console.error("Database error when deleting fighter:", error)
    return {
      error: "Failed to delete fighter from database",
      fighter: null,
    }
  }
}
