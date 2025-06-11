import { db } from "@/lib/db"
import { EventType, FighterStatus, Gender } from "@prisma/client"

type CreateFighterParams = {
  name: string
  nickname?: string
  description?: string
  imageUrl: string
  countryCode: string
  height?: number
  weight?: number
  reach?: number
  stance?: string
  gender: Gender
  status: FighterStatus
  promotion: EventType
  isP4P?: boolean
  titleWins?: number
  titleLosses?: number
  gym?: string
  city?: string
  debutYear?: number
  birthLat?: number
  birthLong?: number
  fightingStyle?: string
}

export async function createFighter(params: CreateFighterParams) {
  try {
    const existingFighter = await db.fighter.findUnique({
      where: { name: params.name },
    })

    if (existingFighter != null) {
      return { error: true, message: "A fighter with this name already exists" }
    }

    const fighter = await db.$transaction(async (tx) => {
      const fighter = await tx.fighter.create({
        data: {
          name: params.name,
          nickname: params.nickname,
          description: params.description,
          imageUrl: params.imageUrl,
          countryCode: params.countryCode,
          height: params.height,
          weight: params.weight,
          reach: params.reach,
          stance: params.stance,
          gender: params.gender,
          status: params.status,
        },
      })

      if (params.promotion === EventType.UFC) {
        await tx.uFCFighter.create({
          data: {
            fighterId: fighter.id,
            isP4P: params.isP4P || false,
            titleWins: params.titleWins || 0,
            titleLosses: params.titleLosses || 0,
          },
        })
      } else if (params.promotion === EventType.RIZIN) {
        await tx.rIZINFighter.create({
          data: {
            fighterId: fighter.id,
            gym: params.gym,
            city: params.city,
            debutYear: params.debutYear,
          },
        })
      } else if (params.promotion === EventType.ONE) {
        await tx.oNEFighter.create({
          data: {
            fighterId: fighter.id,
            birthLat: params.birthLat,
            birthLong: params.birthLong,
            fightingStyle: params.fightingStyle,
          },
        })
      }

      return fighter
    })

    return { error: false, fighter }
  } catch (error) {
    console.error("Database error creating fighter:", error)
    return { error: true, message: "Failed to create fighter in database" }
  }
}
