"use server"

import { createFighter as createFighterDb } from "@/features/fighters/server/db/createFighter"
import { EventType } from "@prisma/client"
import { FighterFormData } from "@/features/fighters/types"
import { revalidatePath, revalidateTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { uploadImageToStorage } from "@/lib/supabase/uploadImage"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"
import { MAX_UPLOAD_FILE_SIZE } from "@/lib/supabase/data/constants/storage"
import { formatFileSize } from "@/lib/formatters"

export async function createFighter(data: FighterFormData) {
  const user = await getCurrentUser({ fullUser: true })
  if (user == null || !canAccessAdmin(user)) {
    return {
      error: true,
      message: "You do not have permission to create an event",
    }
  }

  try {
    let imageUrl = ""

    if (data.image != null && typeof data.image !== "string") {
      if (data.image.size > MAX_UPLOAD_FILE_SIZE) {
        return {
          error: true,
          message: `Image size must be less than ${formatFileSize(MAX_UPLOAD_FILE_SIZE)}`,
        }
      }

      const uploadResult = await uploadImageToStorage({
        file: data.image,
        bucket: "fighters",
      })

      if (uploadResult.error) {
        return { success: false, error: uploadResult.message }
      }

      imageUrl = uploadResult.imageUrl || ""
    }

    const height = parseFloat(data.height)
    const weight = parseFloat(data.weight)
    const reach = data.reach ? parseFloat(data.reach) : undefined

    const dbResult = await createFighterDb({
      name: data.name,
      nickname: data.nickname,
      description: data.description,
      imageUrl: imageUrl,
      countryCode: data.countryCode,
      height,
      weight,
      reach,
      stance: data.stance,
      gender: data.gender,
      status: data.status,
      promotion: data.promotion,
      isP4P: data.promotion === EventType.UFC ? data.isP4P : undefined,
      titleWins: data.promotion === EventType.UFC ? data.titleWins : undefined,
      titleLosses:
        data.promotion === EventType.UFC ? data.titleLosses : undefined,
      gym:
        data.promotion === EventType.RIZIN || data.promotion === EventType.ONE
          ? data.gym
          : undefined,
      city: data.promotion === EventType.RIZIN ? data.city : undefined,
      debutYear:
        data.promotion === EventType.RIZIN ? data.debutYear : undefined,
      birthLat: data.promotion === EventType.ONE ? data.birthLat : undefined,
      birthLong: data.promotion === EventType.ONE ? data.birthLong : undefined,
      fightingStyle:
        data.promotion === EventType.ONE ? data.fightingStyle : undefined,
    })

    if (dbResult.error || dbResult.fighter == null) {
      return {
        error: true,
        message: dbResult.message || "Failed to create fighter",
      }
    }

    revalidateTag(CACHE_TAGS.fighter)
    revalidateTag(`${CACHE_TAGS.fighter}:${dbResult.fighter.id}`)
    revalidateTag(
      `${CACHE_TAGS.fighter}:${dbResult.fighter.id}:${CACHE_TAGS.participations}`,
    )

    revalidatePath("/", "layout")

    return { error: false, message: "Fighter created successfully" }
  } catch (error) {
    console.error("Error creating fighter:", error)
    return { error: true, message: "Failed to create fighter" }
  }
}
