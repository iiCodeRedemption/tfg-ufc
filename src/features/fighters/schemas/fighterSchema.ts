import { z } from "zod"
import { EventType, FighterStatus, Gender } from "@prisma/client"

export const fighterSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .refine(
      (name) => /^[a-zA-Z0-9\s\-']+$/.test(name),
      "Name can only contain letters, numbers, spaces, hyphens, and apostrophes"
    ),
  nickname: z.string().optional(),
  description: z.string().optional(),
  countryCode: z.string().min(2, "Country code is required"),
  height: z.string().min(1, "Height is required"),
  reach: z.string().optional(),
  weight: z.string().min(1, "Weight is required"),
  stance: z.string().optional(),
  status: z.nativeEnum(FighterStatus),
  promotion: z.nativeEnum(EventType),
  gender: z.nativeEnum(Gender),
  image: z.any().optional(),
  isP4P: z.boolean().optional(),
  titleWins: z.number().optional(),
  titleLosses: z.number().optional(),
  gym: z.string().optional(),
  city: z.string().optional(),
  debutYear: z.number().optional(),
  birthLat: z.number().optional(),
  birthLong: z.number().optional(),
  fightingStyle: z.string().optional(),
})
