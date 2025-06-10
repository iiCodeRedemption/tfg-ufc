import { CACHE_TAGS } from "@/data/constants/cache"
import { db } from "@/lib/db"
import { unstable_cacheTag as cacheTag } from "next/cache"

export async function getAllFeaturedFights({
  limit = 0,
}: { limit?: number } = {}) {
  "use cache"
  cacheTag(CACHE_TAGS.fight)

  return await db.fight.findMany({
    include: {
      fighter1: true,
      fighter2: true,
    },
    take: limit > 0 ? limit : undefined,
  })
}
