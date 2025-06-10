import { db } from "@/lib/db"

export async function getFighterFavorite(userId: string, fighterId: string) {
  "use cache"
  return await db.fighterFavorite.findUnique({
    where: { userId_fighterId: { userId, fighterId } },
  })
}
