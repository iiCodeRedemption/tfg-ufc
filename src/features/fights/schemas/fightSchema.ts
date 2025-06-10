import { FightMethod, FightType } from "@prisma/client"
import { z } from "zod"

export const fightSchema = z.object({
  fightType: z.nativeEnum(FightType),
  rounds: z.coerce.number().min(1).max(12),
  championshipFight: z.boolean(),
  fighter1Id: z.string().min(1, { message: "Fighter 1 is required" }),
  fighter2Id: z.string().min(1, { message: "Fighter 2 is required" }),
  winnerId: z.string().nullable().optional(),
  method: z.nativeEnum(FightMethod),
  finishRound: z.coerce.number().nullable().optional(),
  finishTimeSeconds: z.coerce.number().nullable().optional(),
  eventId: z.string().min(1, { message: "Event is required" }),
})

export type FightFormData = z.infer<typeof fightSchema>
