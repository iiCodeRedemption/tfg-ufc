import { db } from "@/lib/db"
import { EventType, FighterStatus, Gender } from "@prisma/client"
import { detectFighterType } from "@/features/fighters/utils/detectFighterType"

type UpdateFighterParams = {
  id: string
  name: string
  nickname?: string
  description?: string
  imageUrl?: string
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

export async function updateFighter(params: UpdateFighterParams) {
  try {
    const fighter = await db.$transaction(async (tx) => {
      const currentFighter = await tx.fighter.findUnique({
        where: { id: params.id },
        include: {
          ufcDetails: true,
          rizinDetails: true,
          oneDetails: true,
        },
      })

      if (!currentFighter) {
        throw new Error("Fighter not found")
      }

      const currentPromotion = detectFighterType(currentFighter)

      if (currentPromotion && currentPromotion !== params.promotion) {
        if (currentPromotion === EventType.UFC && currentFighter.ufcDetails) {
          await tx.uFCFighter.delete({
            where: { fighterId: params.id },
          })
        }

        if (
          currentPromotion === EventType.RIZIN &&
          currentFighter.rizinDetails
        ) {
          await tx.rIZINFighter.delete({
            where: { fighterId: params.id },
          })
        }

        if (currentPromotion === EventType.ONE && currentFighter.oneDetails) {
          await tx.oNEFighter.delete({
            where: { fighterId: params.id },
          })
        }
      }

      const fighter = await tx.fighter.update({
        where: { id: params.id },
        data: {
          name: params.name,
          nickname: params.nickname,
          description: params.description,
          ...(params.imageUrl && { imageUrl: params.imageUrl }),
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
        const existingUFCDetails = await tx.uFCFighter.findUnique({
          where: { fighterId: fighter.id },
        })

        if (existingUFCDetails) {
          await tx.uFCFighter.update({
            where: { fighterId: fighter.id },
            data: {
              isP4P: params.isP4P || false,
              titleWins: params.titleWins || 0,
              titleLosses: params.titleLosses || 0,
            },
          })
        } else {
          await tx.uFCFighter.create({
            data: {
              fighterId: fighter.id,
              isP4P: params.isP4P || false,
              titleWins: params.titleWins || 0,
              titleLosses: params.titleLosses || 0,
            },
          })
        }
      }

      if (params.promotion === EventType.RIZIN) {
        const existingRIZINDetails = await tx.rIZINFighter.findUnique({
          where: { fighterId: fighter.id },
        })

        if (existingRIZINDetails) {
          await tx.rIZINFighter.update({
            where: { fighterId: fighter.id },
            data: {
              gym: params.gym,
              city: params.city,
              debutYear: params.debutYear,
            },
          })
        } else {
          await tx.rIZINFighter.create({
            data: {
              fighterId: fighter.id,
              gym: params.gym,
              city: params.city,
              debutYear: params.debutYear,
            },
          })
        }
      }

      if (params.promotion === EventType.ONE) {
        const existingONEDetails = await tx.oNEFighter.findUnique({
          where: { fighterId: fighter.id },
        })

        if (existingONEDetails) {
          await tx.oNEFighter.update({
            where: { fighterId: fighter.id },
            data: {
              birthLat: params.birthLat,
              birthLong: params.birthLong,
              fightingStyle: params.fightingStyle,
            },
          })
        } else {
          await tx.oNEFighter.create({
            data: {
              fighterId: fighter.id,
              gym: params.gym,
              birthLat: params.birthLat,
              birthLong: params.birthLong,
              fightingStyle: params.fightingStyle,
            },
          })
        }
      }

      return fighter
    })

    return { error: false, fighter }
  } catch (error) {
    console.error("Database error updating fighter:", error)
    return { error: true, message: "Failed to update fighter in database" }
  }
}
