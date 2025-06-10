import { unstable_cacheTag as cacheTag } from "next/cache"
import { DEFAULT_INCLUDE } from "@/features/fighters/data/constants/defaultDbInclude"
import { db } from "@/lib/db"
import { CACHE_TAGS } from "@/data/constants/cache"
import { FighterStatus } from "@prisma/client"

export async function getAllFighters({
  limit = 0,
  excludeStatus,
}: { limit?: number; excludeStatus?: FighterStatus } = {}) {
  "use cache"
  cacheTag(CACHE_TAGS.fighter)

  return await db.fighter.findMany({
    include: DEFAULT_INCLUDE,
    take: limit > 0 ? limit : undefined,
    where: {
      status: excludeStatus ? { not: excludeStatus } : undefined,
    },
  })
}
