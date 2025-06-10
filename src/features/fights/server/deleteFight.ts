"use server"

import { db } from "@/lib/db"
import { revalidateTag, revalidatePath } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"

export async function deleteFight(fightId: string) {
  try {
    const fightToDelete = await db.fight.findUnique({
      where: { id: fightId },
      include: {
        fighter1: true,
        fighter2: true,
        event: true,
      },
    })

    if (!fightToDelete) {
      return { error: true, message: "Fight not found" }
    }

    await db.fightParticipant.deleteMany({
      where: { fightId },
    })

    await db.fightStatistics.deleteMany({
      where: { fightId },
    })

    await db.fight.delete({
      where: { id: fightId },
    })

    revalidateTag(CACHE_TAGS.fight)
    revalidateTag(CACHE_TAGS.fighter)

    revalidateTag(`${CACHE_TAGS.fight}:${fightId}`)

    if (fightToDelete.fighter1Id != null) {
      revalidateTag(`${CACHE_TAGS.fighter}:${fightToDelete.fighter1Id}`)
      revalidateTag(
        `${CACHE_TAGS.fighter}:${fightToDelete.fighter1Id}:participations`
      )
    }

    if (fightToDelete.fighter2Id != null) {
      revalidateTag(`${CACHE_TAGS.fighter}:${fightToDelete.fighter2Id}`)
      revalidateTag(
        `${CACHE_TAGS.fighter}:${fightToDelete.fighter2Id}:participations`
      )
    }

    if (fightToDelete.eventId != null) {
      revalidateTag(`${CACHE_TAGS.event}:${fightToDelete.eventId}`)
      revalidateTag(CACHE_TAGS.event)
    }

    revalidatePath("/fights", "layout")
    revalidatePath(`/fights/${fightId}`, "page")

    if (fightToDelete.fighter1Id != null) {
      revalidatePath(`/fighters/${fightToDelete.fighter1Id}`, "page")
    }

    if (fightToDelete.fighter2Id != null) {
      revalidatePath(`/fighters/${fightToDelete.fighter2Id}`, "page")
    }

    if (fightToDelete.eventId != null) {
      revalidatePath(`/events/${fightToDelete.eventId}`, "page")
    }

    return { error: false, message: "Fight deleted successfully" }
  } catch (error) {
    console.error("Error deleting fight:", error)
    return { error: true, message: "Failed to delete fight" }
  }
}
