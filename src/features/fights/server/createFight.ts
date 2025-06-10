"use server"

import { createFight as createFightDb } from "@/features/fights/server/db/createFight"
import { revalidateTag, revalidatePath } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { FightFormData } from "@/features/fights/types"

export async function createFight(data: FightFormData) {
  try {
    if (data.fighter1Id === data.fighter2Id) {
      return { error: true, message: "Fighter cannot fight against themselves" }
    }

    const dbResult = await createFightDb({
      fightType: data.fightType,
      rounds: data.rounds,
      championshipFight: data.championshipFight,
      fighter1Id: data.fighter1Id,
      fighter2Id: data.fighter2Id,
      winnerId: data.winnerId || undefined,
      method: data.method,
      finishRound: data.finishRound || undefined,
      finishTimeSeconds: data.finishTimeSeconds || undefined,
      eventId: data.eventId,
    })

    if (dbResult.error || dbResult.fight == null) {
      return { error: true, message: dbResult.message }
    }

    revalidateTag(CACHE_TAGS.fight)
    revalidateTag(CACHE_TAGS.fighter)

    revalidateTag(`${CACHE_TAGS.fight}:${dbResult.fight.id}`)
    revalidateTag(`${CACHE_TAGS.fighter}:${data.fighter1Id}`)
    revalidateTag(`${CACHE_TAGS.fighter}:${data.fighter2Id}`)

    revalidateTag(
      `${CACHE_TAGS.fighter}:${data.fighter1Id}:${CACHE_TAGS.participations}`
    )
    revalidateTag(
      `${CACHE_TAGS.fighter}:${data.fighter2Id}:${CACHE_TAGS.participations}`
    )

    if (data.eventId != null) {
      revalidateTag(`${CACHE_TAGS.event}:${data.eventId}`)
      revalidateTag(CACHE_TAGS.event)
    }

    revalidatePath("/fights", "layout")
    revalidatePath(`/fights/${dbResult.fight.id}`, "page")

    revalidatePath(`/fighters/${data.fighter1Id}`, "page")
    revalidatePath(`/fighters/${data.fighter2Id}`, "page")

    if (data.eventId != null) {
      revalidatePath(`/events/${data.eventId}`, "page")
    }

    return { error: false, message: "Fight created successfully" }
  } catch (error) {
    console.error("Error creating fight:", error)
    return { error: true, message: "Failed to create fight" }
  }
}
