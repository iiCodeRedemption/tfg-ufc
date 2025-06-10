import { EventType } from "@prisma/client"
import { z } from "zod"

export const eventSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  location: z.string().min(3, { message: "Location is required" }),
  description: z.string().optional(),
  type: z.nativeEnum(EventType),
  image: z.any().optional(),
  isPPV: z.boolean(),
  price: z.number().optional(),
})

export type EventFormData = z.infer<typeof eventSchema>
