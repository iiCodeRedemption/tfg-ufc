"use server"

import { createClient } from "@/lib/supabase/server"
import { updateEvent as updateEventDb } from "@/features/events/server/db/updateEvent"
import { revalidatePath, revalidateTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { deleteImageFromStorage } from "@/lib/supabase/deleteImage"
import { EventFormData } from "@/features/events/types"
import { convertDollarsToCents } from "@/lib/math"
import { getEventById } from "@/features/events/server/db/getEventById"

export async function updateEvent(eventId: string, data: EventFormData) {
  try {
    let imageUrl: string | undefined = undefined

    const existingEvent = await getEventById(eventId)
    if (existingEvent == null) {
      return { error: true, message: "Event not found" }
    }

    if (data.image && typeof data.image !== "string") {
      const supabase = await createClient()

      if (existingEvent.imageUrl != null) {
        const deleteResult = await deleteImageFromStorage({
          imageUrl: existingEvent.imageUrl,
          bucket: "events",
        })
        if (deleteResult.error) {
          console.error("Error removing old image:", deleteResult.message)
          return { error: true, message: "Failed to remove old image" }
        }
      }

      const arrayBuffer = await data.image.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const fileName = `${Date.now()}-${data.image.name}`

      const { error } = await supabase.storage
        .from("events")
        .upload(`images/${fileName}`, buffer, {
          contentType: data.image.type,
        })

      if (error != null) {
        return { error: true, message: "Failed to upload image" }
      }

      const { data: urlData } = supabase.storage
        .from("events")
        .getPublicUrl(`images/${fileName}`)

      imageUrl = urlData.publicUrl
    }

    const latitude = existingEvent.latitude || 0
    const longitude = existingEvent.longitude || 0

    const dbResult = await updateEventDb({
      id: eventId,
      name: data.name,
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description,
      type: data.type,
      imageUrl,
      isPPV: data.isPPV,
      price:
        data.price != null && data.price !== existingEvent.price
          ? convertDollarsToCents(data.price)
          : existingEvent.price ?? undefined,
      latitude,
      longitude,
    })

    if (dbResult.error || dbResult.event == null) {
      return { error: true, message: dbResult.message }
    }

    revalidateTag(CACHE_TAGS.event)
    revalidateTag(`${CACHE_TAGS.event}:${eventId}`)

    revalidatePath(`/events/${eventId}`, "page")
    revalidatePath("/", "layout")

    return { error: false, message: "Event updated successfully" }
  } catch (error) {
    console.error("Error updating event:", error)
    return { error: true, message: "Failed to update event" }
  }
}
