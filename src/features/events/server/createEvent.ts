"use server"

import { createEvent as createEventDb } from "@/features/events/server/db/createEvent"
import { revalidatePath, revalidateTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { EventFormData } from "@/features/events/types"
import { uploadImageToStorage } from "@/lib/supabase/uploadImage"
import { convertDollarsToCents } from "@/lib/math"

export async function createEvent(data: EventFormData) {
  try {
    let imageUrl = ""

    if (data.image && typeof data.image !== "string" && data.image !== null) {
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
