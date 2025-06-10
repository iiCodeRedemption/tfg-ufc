import { db } from "@/lib/db"

export async function createUser({
  userId,
  username,
  email,
}: {
  userId: string
  username: string
  email: string
}) {
  const newUser = await db.user.create({
    data: {
      id: userId,
      email: email,
      username: username,
    },
  })

  if (newUser == null) {
    return { error: true, message: "Failed to create user" }
  }

  return { error: false, message: "User created successfully" }
}
