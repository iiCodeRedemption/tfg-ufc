import { CACHE_TAGS } from "@/data/constants/cache"
import { db } from "@/lib/db"
import { unstable_cacheTag as cacheTag } from "next/cache"

export async function getFightById(id: string) {
  "use cache"
  cacheTag(`${CACHE_TAGS.fight}:${id}`)

  try {
    const fight = await db.fight.findUnique({
      where: { id },
      include: {
        fighter1: {
          include: {
            fightParticipations: {
              include: {
                fight: {
                  include: {
                    fighter1: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    fighter2: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    statistics: true,
                  },
                },
              },
            },
            fightsAsFighter: {
              include: {
                participants: true,
              },
            },
            fightsAsOpponent: {
              include: {
                participants: true,
              },
            },
            ufcDetails: true,
            rizinDetails: true,
            oneDetails: true,
          },
        },
        fighter2: {
          include: {
            fightParticipations: {
              include: {
                fight: {
                  include: {
                    fighter1: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    fighter2: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    statistics: true,
                  },
                },
              },
            },
            fightsAsFighter: {
              include: {
                participants: true,
              },
            },
            fightsAsOpponent: {
              include: {
                participants: true,
              },
            },
            ufcDetails: true,
            rizinDetails: true,
            oneDetails: true,
          },
        },
        event: true,
        statistics: true,
        participants: true,
      },
    })

    if (fight != null) {
      cacheTag(`${CACHE_TAGS.fighter}:${fight.fighter1Id}`)
      cacheTag(`${CACHE_TAGS.fighter}:${fight.fighter2Id}`)
      cacheTag(
        `${CACHE_TAGS.fighter}:${fight.fighter1Id}:${CACHE_TAGS.participations}`
      )
      cacheTag(
        `${CACHE_TAGS.fighter}:${fight.fighter2Id}:${CACHE_TAGS.participations}`
      )
    }

    return fight
  } catch (error) {
    console.error(`Error fetching fight with id ${id}:`, error)
    return null
  }
}
