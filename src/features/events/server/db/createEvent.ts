import { db } from "@/lib/db"
import { EventType } from "@prisma/client"

type CreateEventParams = {
  name: string
  date: string
  time: string
  location: string
  description?: string
  type: EventType
  imageUrl: string
  isPPV: boolean
  price?: number
}

export async function createEvent(params: CreateEventParams) {
  try {
    const [year, month, day] = params.date.split("-").map(Number)
    const [hours, minutes] = params.time.split(":").map(Number)
    const eventDate = new Date(year, month - 1, day, hours, minutes)

    const event = await db.event.create({
      data: {
        name: params.name,
        date: eventDate,
        location: params.location,
        description: params.description,
        promotion: params.type,
        imageUrl: params.imageUrl,
        isPPV: params.isPPV,
        price: params.price,
      },
    })

    return { error: false, event }
  } catch (error) {
    console.error("Database error creating event:", error)
    return { error: true, message: "Failed to create event in database" }
  }
}
