import { EventType } from "@prisma/client"

export function detectFighterType(fighter: {
  ufcDetails?: { id?: string } | null
  rizinDetails?: { id?: string } | null
  oneDetails?: { id?: string } | null
}): EventType {
  if (fighter.ufcDetails) return EventType.UFC
  if (fighter.rizinDetails) return EventType.RIZIN
  if (fighter.oneDetails) return EventType.ONE

  return EventType.UFC
}
