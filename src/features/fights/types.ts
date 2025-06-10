import { FightMethod, FightType } from "@prisma/client"

export type FightFormData = {
  fightType: FightType
  rounds: number
  championshipFight: boolean
  fighter1Id: string
  fighter2Id: string
  winnerId?: string | null
  method: FightMethod
  finishRound?: number | null
  finishTimeSeconds?: number | null
  eventId: string
}
