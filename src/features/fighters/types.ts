import { EventType, FighterStatus, Gender } from "@prisma/client"
import { z } from "zod"
import { fighterSchema } from "@/features/fighters/schemas/fighterSchema"
import { FighterWithDetails } from "@/features/fighters/data/types"
import { detectFighterType } from "./utils/detectFighterType"

export type FighterFormData = z.infer<typeof fighterSchema>

export function extractFighterFormData(
  fighter?: FighterWithDetails,
): FighterFormData {
  if (fighter == null) {
    return {
      name: "",
      nickname: "",
      description: "",
      image: null,
      countryCode: "",
      height: "",
      reach: "",
      weight: "",
      stance: "",
      status: FighterStatus.ACTIVE,
      promotion: EventType.UFC,
      gender: Gender.MALE,
      isP4P: false,
      titleWins: 0,
      titleLosses: 0,
      gym: "",
      city: "",
      debutYear: undefined,
      birthLat: undefined,
      birthLong: undefined,
      fightingStyle: "",
    }
  }

  return {
    name: fighter.name,
    nickname: fighter.nickname || "",
    description: fighter.description || "",
    image: fighter.imageUrl || null,
    countryCode: fighter.countryCode,
    height: fighter.height?.toString() || "",
    reach: fighter.reach?.toString() || "",
    weight: fighter.weight?.toString() || "",
    stance: fighter.stance || "",
    status: fighter.status,
    promotion: detectFighterType(fighter),
    isP4P: fighter.ufcDetails?.isP4P || false,
    titleWins: fighter.ufcDetails?.titleWins || 0,
    titleLosses: fighter.ufcDetails?.titleLosses || 0,
    gym: fighter.rizinDetails?.gym || "",
    city: fighter.rizinDetails?.city || "",
    debutYear: fighter.rizinDetails?.debutYear || undefined,
    birthLat: fighter.oneDetails?.birthLat || undefined,
    birthLong: fighter.oneDetails?.birthLong || undefined,
    fightingStyle: fighter.oneDetails?.fightingStyle || "",
    gender: fighter.gender,
  }
}
