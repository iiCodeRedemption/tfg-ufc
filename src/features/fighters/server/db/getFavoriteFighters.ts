import { CACHE_TAGS } from "@/data/constants/cache"
import { unstable_cacheTag as cacheTag } from "next/cache"
import { db } from "@/lib/db"
import { DEFAULT_INCLUDE } from "@/features/fighters/data/constants/defaultDbInclude"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"

export async function getFavoriteFighters() {
  const user = await getCurrentUser()
  if (user == null) return []

  return await getFavoriteFightersInternal(user.id)
}

async function getFavoriteFightersInternal(userId: string) {
  "use cache"
  cacheTag(`${CACHE_TAGS.fighter}:${CACHE_TAGS.favorite}`)

  const favorites = await db.fighterFavorite.findMany({
    where: { userId },
    include: {
      fighter: {
        include: DEFAULT_INCLUDE,
      },
    },
  })

  return favorites.map((favorite) => favorite.fighter)
}
