import { db } from "@/lib/db"
import { unstable_cacheTag as cacheTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"

export async function getEventById(eventId: string) {
  "use cache"
  cacheTag(CACHE_TAGS.event)

  return await db.event.findUnique({
    where: { id: eventId },
    include: {
      fights: {
        include: {
          fighter1: true,
          fighter2: true,
          statistics: true,
        },
        orderBy: {
          fightType: "asc",
        },
      },
    },
  })
}
