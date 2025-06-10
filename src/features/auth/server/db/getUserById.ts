import { CACHE_TAGS } from "@/data/constants/cache"
import { db } from "@/lib/db"
import { unstable_cacheTag as cacheTag } from "next/cache"

export async function getUserById(id: string) {
  "use cache"
  cacheTag(`${CACHE_TAGS.user}:${id}`)

  return await db.user.findUnique({
    where: {
      id,
    },
  })
}
