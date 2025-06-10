import { CACHE_TAGS } from "@/data/constants/cache"
import { db } from "@/lib/db"
import { unstable_cacheTag as cacheTag } from "next/cache"
import { FightWithParticipants } from "@/features/fights/data/types"

export async function getAllFights(): Promise<FightWithParticipants[]> {
  "use cache"
  cacheTag(CACHE_TAGS.fight)

  try {
    const fights = await db.fight.findMany({
      include: {
        fighter1: {
          select: {
            id: true,
            name: true,
            nickname: true,
            imageUrl: true,
            countryCode: true,
            weight: true,
          },
        },
        fighter2: {
          select: {
            id: true,
            name: true,
            nickname: true,
            imageUrl: true,
            countryCode: true,
            weight: true, // Include weight for weight class filtering
          },
        },
        event: {
          select: {
            id: true,
            name: true,
            date: true,
            promotion: true,
          },
        },
        statistics: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return fights
  } catch (error) {
    console.error("Error fetching fights:", error)
    return []
  }
}
