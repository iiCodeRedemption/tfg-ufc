import { Fight, EventType } from "@prisma/client"

type FighterBasic = {
  id: string
  name: string
  nickname: string | null
  imageUrl: string
  countryCode: string
  weight?: number | null
}

type EventBasic = {
  id: string
  name: string
  date: Date
  promotion: EventType
} | null

export type FightWithParticipants = Fight & {
  fighter1: FighterBasic
  fighter2: FighterBasic
  event?: EventBasic
  statistics?: any | null
  weightClass?: string
  status?: string
}
