import { CACHE_TAGS } from "@/data/constants/cache"
import { unstable_cacheTag as cacheTag } from "next/cache"
import { DEFAULT_INCLUDE } from "@/features/fighters/data/constants/defaultDbInclude"
import { db } from "@/lib/db"

export async function getFighterById(id: string) {
  "use cache"
  cacheTag(`${CACHE_TAGS.fighter}:${id}`)
  cacheTag(`${CACHE_TAGS.fighter}:${id}:${CACHE_TAGS.participations}`)

  return await db.fighter.findUnique({
    where: { id },
    include: DEFAULT_INCLUDE,
  })
}
