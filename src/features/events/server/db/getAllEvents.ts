import { db } from "@/lib/db"
import { unstable_cacheTag as cacheTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"

export async function getAllEvents({ limit = 0 }: { limit?: number } = {}) {
  "use cache"
  cacheTag(CACHE_TAGS.event)

  return await db.event.findMany({
    take: limit > 0 ? limit : undefined,
    orderBy: { date: "desc" },
  })
}
