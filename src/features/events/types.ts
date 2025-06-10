import { EventType } from "@prisma/client"

export type EventFormData = {
  name: string
  date: string
  time: string
  location: string
  description?: string
  type: EventType
  image?: File | string | null
  isPPV: boolean
  price?: number
}

export type EventWithDetails = {
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
}
