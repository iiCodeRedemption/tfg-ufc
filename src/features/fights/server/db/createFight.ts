import { CACHE_TAGS } from "@/data/constants/cache"
import { db } from "@/lib/db"
import { FightMethod, FightType } from "@prisma/client"
import { revalidateTag } from "next/cache"

export type CreateFightData = {
  fightType: FightType
  rounds: number
  championshipFight: boolean
  fighter1Id: string
  fighter2Id: string
  winnerId?: string
  method: FightMethod
  finishRound?: number
  finishTimeSeconds?: number
  eventId: string
}

export async function createFight(data: CreateFightData) {
  try {
    const fighter1 = await db.fighter.findUnique({
      where: { id: data.fighter1Id },
    })

    const fighter2 = await db.fighter.findUnique({
      where: { id: data.fighter2Id },
    })

    if (!fighter1) {
      return {
        error: true,
        message: "Fighter 1 not found",
        fight: null,
      }
    }

    if (!fighter2) {
      return {
        error: true,
        message: "Fighter 2 not found",
        fight: null,
      }
    }

    const event = await db.event.findUnique({
      where: { id: data.eventId },
    })

    if (!event) {
      return {
        error: true,
        message: "Event not found",
        fight: null,
      }
    }

    const fight = await db.fight.create({
      data: {
        fightType: data.fightType,
        rounds: data.rounds,
        championshipFight: data.championshipFight,
        fighter1: { connect: { id: data.fighter1Id } },
        fighter2: { connect: { id: data.fighter2Id } },
        winnerId: data.winnerId,
        method: data.method,
        finishRound: data.finishRound,
        finishTimeSeconds: data.finishTimeSeconds,
        event: { connect: { id: data.eventId } },
      },
    })

    await db.fightParticipant.createMany({
      data: [
        {
          fightId: fight.id,
          fighterId: data.fighter1Id,
          result:
            data.winnerId === data.fighter1Id
              ? "WIN"
              : data.winnerId === data.fighter2Id
              ? "LOSS"
              : "DRAW",
        },
        {
          fightId: fight.id,
          fighterId: data.fighter2Id,
          result:
            data.winnerId === data.fighter2Id
              ? "WIN"
              : data.winnerId === data.fighter1Id
              ? "LOSS"
              : "DRAW",
        },
      ],
    })

    revalidateTag(CACHE_TAGS.fight)
    revalidateTag(`${CACHE_TAGS.fight}:${fight.id}`)
    revalidateTag(
      `${CACHE_TAGS.fight}:${fight.id}:${CACHE_TAGS.participations}`
    )

    if (data.winnerId === data.fighter1Id) {
      revalidateTag(`${CACHE_TAGS.fighter}:${data.fighter1Id}`)
      revalidateTag(
        `${CACHE_TAGS.fighter}:${data.fighter1Id}:${CACHE_TAGS.participations}`
      )
    }

    if (data.winnerId === data.fighter2Id) {
      revalidateTag(`${CACHE_TAGS.fighter}:${data.fighter2Id}`)
      revalidateTag(
        `${CACHE_TAGS.fighter}:${data.fighter2Id}:${CACHE_TAGS.participations}`
      )
    }

    return { error: false, fight }
  } catch (error) {
    console.error("Database error creating fight:", error)
    return {
      error: true,
      message: "Failed to create fight in the database",
      fight: null,
    }
  }
}
