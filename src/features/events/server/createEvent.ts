"use server"

import { createEvent as createEventDb } from "@/features/events/server/db/createEvent"
import { revalidatePath, revalidateTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { EventFormData } from "@/features/events/types"
import { uploadImageToStorage } from "@/lib/supabase/uploadImage"
import { convertDollarsToCents } from "@/lib/math"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"
import { MAX_UPLOAD_FILE_SIZE } from "@/lib/supabase/data/constants/storage"
import { formatFileSize } from "@/lib/formatters"

export async function createEvent(data: EventFormData) {
  const user = await getCurrentUser({ fullUser: true })
  if (user == null || !canAccessAdmin(user)) {
    return {
      error: true,
      message: "You do not have permission to create an event",
    }
  }

  try {
    let imageUrl = ""

    if (data.image != null && typeof data.image !== "string") {
      if (data.image.size > MAX_UPLOAD_FILE_SIZE) {
        return {
          error: true,
          message: `Image size must be less than ${formatFileSize(MAX_UPLOAD_FILE_SIZE)}`,
        }
      }

      const uploadResult = await uploadImageToStorage({
        file: data.image,
        bucket: "events",
      })

      if (uploadResult.error) {
        return { success: false, error: uploadResult.message }
      }

      imageUrl = uploadResult.imageUrl || ""
    }

    const latitude = 0
    const longitude = 0

    const dbResult = await createEventDb({
      name: data.name,
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description,
      type: data.type,
      imageUrl,
      isPPV: data.isPPV,
      price: data.price != null ? convertDollarsToCents(data.price) : undefined,
      latitude,
      longitude,
    })

    if (dbResult.error || dbResult.event == null) {
      return { error: true, message: dbResult.message }
    }

    revalidateTag(CACHE_TAGS.event)
    revalidatePath("/events", "layout")
    revalidatePath("/", "layout")

    return { error: false, message: "Event created successfully" }
  } catch (error) {
    console.error("Error creating event:", error)
    return { error: true, message: "Failed to create event" }
  }
}
