"use server"

import { db } from "@/lib/db"
import { revalidatePath, revalidateTag } from "next/cache"
import { getCurrentUser } from "../getCurrentUser"
import { CACHE_TAGS } from "@/data/constants/cache"

export async function updateUsername({
  userId,
  username,
}: {
  userId: string
  username: string
}) {
  try {
    const existingUser = await db.user.findFirst({
      where: {
        username,
        NOT: {
          id: userId,
        },
      },
    })

    if (existingUser) {
      return {
        error: true,
        message: "Username is already taken",
      }
    }

    const currentUser = await getCurrentUser({ fullUser: true })
    if (currentUser?.username === username) {
      return {
        error: true,
        message: "Username is the same as the current username",
      }
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
      },
    })

    revalidateTag(`${CACHE_TAGS.user}:${userId}`)

    revalidatePath("/profile", "page")
    revalidatePath("/", "layout")

    return {
      error: false,
      message: "Username updated successfully",
    }
  } catch (error) {
    console.error("Error updating username:", error)
    return {
      error: true,
      message: "Failed to update username",
    }
  }
}
