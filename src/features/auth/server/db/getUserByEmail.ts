import { db } from "@/lib/db"

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
  })
}
