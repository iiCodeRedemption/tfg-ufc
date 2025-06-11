"use server"

import { db } from "@/lib/db"
import { deleteImageFromStorage } from "@/lib/supabase/deleteImage"
import { revalidatePath, revalidateTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { getEventById } from "@/features/events/server/db/getEventById"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"

export async function deleteEvent(eventId: string) {
  const user = await getCurrentUser({ fullUser: true })
  if (user == null || !canAccessAdmin(user)) {
    return {
      error: true,
      message: "You do not have permission to create an event",
    }
  }

  try {
    const event = await getEventById(eventId)

    if (!event) {
      return { error: true, message: "Event not found" }
    }

    if (event.imageUrl != null) {
      const deleteResult = await deleteImageFromStorage({
        imageUrl: event.imageUrl,
        bucket: "events",
      })
      if (deleteResult.error) {
        console.error("Error deleting image:", deleteResult.message)
      }
    }

    await db.event.delete({
      where: {
        id: eventId,
      },
    })

    revalidateTag(CACHE_TAGS.event)

    revalidatePath("/events", "layout")
    revalidatePath("/", "layout")

    return { error: false, message: "Event deleted successfully" }
  } catch (error) {
    console.error("Error deleting event:", error)
    return { error: true, message: "Failed to delete event" }
  }
}
