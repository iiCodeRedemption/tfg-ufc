import { Prisma } from "@prisma/client"

export type FighterWithDetails = Prisma.FighterGetPayload<{
  include: {
    ufcDetails: true
    rizinDetails: true
    oneDetails: true
    fightsAsFighter: {
      include: {
        participants: {
          select: {
            result: true
            fighterId: true
          }
        }
        event: {
          select: {
            promotion: true
          }
        }
      }
    }
    fightsAsOpponent: {
      include: {
        participants: {
          select: {
            result: true
            fighterId: true
          }
        }
        event: {
          select: {
            promotion: true
          }
        }
      }
    }
  }
}>
