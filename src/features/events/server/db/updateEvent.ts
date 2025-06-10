import { db } from "@/lib/db"
import { EventType, Prisma } from "@prisma/client"

type UpdateEventParams = {
  id: string
  name: string
  date: string
  time: string
  location: string
  description?: string
  type: EventType
  imageUrl?: string
  isPPV: boolean
  price?: number
  latitude?: number
  longitude?: number
}

export async function updateEvent(params: UpdateEventParams) {
  try {
    const [year, month, day] = params.date.split("-").map(Number)
    const [hours, minutes] = params.time.split(":").map(Number)
    const eventDate = new Date(year, month - 1, day, hours, minutes)

    const updateData: Prisma.EventUpdateInput = {
      name: params.name,
      date: eventDate,
      promotion: params.type,
      latitude: params.latitude,
      longitude: params.longitude,
      description: params.description,
      isPPV: params.isPPV,
      price: params.isPPV ? params.price : null,
    }

    if (params.imageUrl) {
      updateData.imageUrl = params.imageUrl
    }

    const event = await db.event.update({
      where: { id: params.id },
      data: updateData,
    })

    return { error: false, event }
  } catch (error) {
    console.error("Database error updating event:", error)
    return { error: true, message: "Failed to update event in database" }
  }
}
