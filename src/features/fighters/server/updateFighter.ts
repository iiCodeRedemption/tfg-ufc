"use server"

import { createClient } from "@/lib/supabase/server"
import { updateFighter as updateFighterDb } from "@/features/fighters/server/db/updateFighter"
import { EventType } from "@prisma/client"
import { FighterFormData } from "@/features/fighters/types"
import { revalidatePath, revalidateTag } from "next/cache"
import { CACHE_TAGS } from "@/data/constants/cache"
import { deleteImageFromStorage } from "@/lib/supabase/deleteImage"
import { getFighterById } from "./db/getFighterById"

export async function updateFighter(fighterId: string, data: FighterFormData) {
  try {
    let imageUrl: string | undefined = undefined

    const existingFighter = await getFighterById(fighterId)
    if (existingFighter == null) {
      return { error: true, message: "Fighter not found" }
    }

    if (data.image && typeof data.image !== "string") {
      const supabase = await createClient()

      if (existingFighter.imageUrl != null) {
        const deleteResult = await deleteImageFromStorage({
          imageUrl: existingFighter.imageUrl,
          bucket: "fighters",
        })
        if (deleteResult.error) {
          console.error("Error removing old image:", deleteResult.message)
          return { error: true, message: "Failed to remove old image" }
        }
      }

      const arrayBuffer = await data.image.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      const fileName = `${Date.now()}-${data.image.name}`

      const { error } = await supabase.storage
        .from("fighters")
        .upload(`images/${fileName}`, buffer, {
          contentType: data.image.type,
        })

      if (error != null) {
        return { error: true, message: "Failed to upload image" }
      }

      const { data: urlData } = supabase.storage
        .from("fighters")
        .getPublicUrl(`images/${fileName}`)

      imageUrl = urlData.publicUrl
    }

    const height = parseFloat(data.height)
    const weight = parseFloat(data.weight)
    const reach = data.reach ? parseFloat(data.reach) : undefined

    const dbResult = await updateFighterDb({
      id: fighterId,
      name: data.name,
      nickname: data.nickname,
      description: data.description,
      imageUrl,
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
      return { error: true, message: dbResult.message }
    }

    revalidateTag(CACHE_TAGS.fighter)
    revalidateTag(`${CACHE_TAGS.fighter}:${fighterId}`)

    revalidatePath(`/fighters/${fighterId}`, "page")
    revalidatePath("/fighters", "layout")

    return { error: false, message: "Fighter updated successfully" }
  } catch (error) {
    console.error("Error updating fighter:", error)
    return { error: true, message: "Failed to update fighter" }
  }
}
