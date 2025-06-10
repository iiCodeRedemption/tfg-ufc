import { createUser as createUserDb } from "@/features/auth/server/db/createUser"

export async function createUser({
  userId,
  email,
  username,
}: {
  userId: string
  email: string
  username: string
}) {
  const newUserResult = await createUserDb({
    userId,
    email,
    username,
  })

  if (newUserResult.error) {
    return { error: true, message: newUserResult.message }
  }

  return { error: false, message: "User created successfully" }
}
