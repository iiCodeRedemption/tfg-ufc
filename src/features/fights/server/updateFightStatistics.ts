"use server"

import { db } from "@/lib/db"
import { revalidateTag, revalidatePath } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { statisticsSchema } from "@/features/fights/schemas/fightStatisticsSchema"
import { z } from "zod"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"

export async function updateFightStatistics({
  fightId,
  data,
}: {
  fightId: string
  data: z.infer<typeof statisticsSchema>
}) {
  const user = await getCurrentUser({ fullUser: true })
  if (user == null || !canAccessAdmin(user)) {
    return {
      error: true,
      message: "You do not have permission to create an event",
    }
  }

  try {
    const existingStats = await db.fightStatistics.findUnique({
      where: { fightId: fightId },
      include: {
        fight: {
          include: {
            fighter1: true,
            fighter2: true,
            event: true,
          },
        },
      },
    })

    if (existingStats) {
      await db.fightStatistics.update({
        where: { fightId: fightId },
        data: {
          totalStrikes1: data.totalStrikes1,
          totalStrikes2: data.totalStrikes2,
          sigStrikes1: data.sigStrikes1,
          sigStrikes2: data.sigStrikes2,
          takedowns1: data.takedowns1,
          takedowns2: data.takedowns2,
          submissionAttempts1: data.submissionAttempts1,
          submissionAttempts2: data.submissionAttempts2,
          knockdowns1: data.knockdowns1,
          knockdowns2: data.knockdowns2,
          reversals1: data.reversals1,
          reversals2: data.reversals2,
        },
      })
    } else {
      await db.fightStatistics.create({
        data: {
          fightId: fightId,
          totalStrikes1: data.totalStrikes1,
          totalStrikes2: data.totalStrikes2,
          sigStrikes1: data.sigStrikes1,
          sigStrikes2: data.sigStrikes2,
          takedowns1: data.takedowns1,
          takedowns2: data.takedowns2,
          submissionAttempts1: data.submissionAttempts1,
          submissionAttempts2: data.submissionAttempts2,
          knockdowns1: data.knockdowns1,
          knockdowns2: data.knockdowns2,
          reversals1: data.reversals1,
          reversals2: data.reversals2,
        },
      })
    }

    revalidateTag(CACHE_TAGS.fight)
    revalidateTag(`${CACHE_TAGS.fight}:${fightId}`)
    revalidateTag(`${CACHE_TAGS.fight}:${fightId}:${CACHE_TAGS.participations}`)

    if (existingStats?.fight.fighter1Id != null) {
      revalidateTag(`${CACHE_TAGS.fighter}:${existingStats.fight.fighter1Id}`)
    }

    if (existingStats?.fight.fighter2Id != null) {
      revalidateTag(`${CACHE_TAGS.fighter}:${existingStats.fight.fighter2Id}`)
    }

    if (existingStats?.fight.eventId != null) {
      revalidateTag(`${CACHE_TAGS.event}:${existingStats.fight.eventId}`)
      revalidateTag(CACHE_TAGS.event)
    }

    revalidatePath(`/fights/${fightId}`, "page")

    if (existingStats?.fight.fighter1Id != null) {
      revalidatePath(`/fighters/${existingStats.fight.fighter1Id}`, "page")
    }

    if (existingStats?.fight.fighter2Id != null) {
      revalidatePath(`/fighters/${existingStats.fight.fighter2Id}`, "page")
    }

    if (existingStats?.fight.eventId != null) {
      revalidatePath(`/events/${existingStats.fight.eventId}`, "page")
    }

    const previousFights = await db.fight.findMany({
      where: {
        eventId: existingStats?.fight.eventId,
        id: {
          not: fightId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    if (previousFights.length > 0) {
      previousFights.forEach((fight) => {
        revalidateTag(`${CACHE_TAGS.fight}:${fight.id}`)
        revalidateTag(
          `${CACHE_TAGS.fight}:${fight.id}:${CACHE_TAGS.participations}`,
        )
      })
    }

    return { error: false, message: "Fight statistics updated successfully" }
  } catch (error) {
    console.error("Error updating fight statistics:", error)
    return { error: true, message: "Failed to update fight statistics" }
  }
}
