import { createClient } from "@/lib/supabase/server"
import { Bucket } from "@/lib/supabase/types/bucket"

export const uploadImageToStorage = async ({
  file,
  bucket = "fighters",
  folder = "images",
}: {
  file: File
  bucket?: Bucket
  folder?: string
}): Promise<{ error: boolean; imageUrl?: string; message?: string }> => {
  if (!file) {
    return { error: false }
  }

  try {
    const supabase = await createClient()

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    const filename = `${crypto.randomUUID()}-${file.name}`
    const filePath = `${folder}/${filename}`

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
      })

    if (uploadError) {
      return {
        error: true,
        message: `Failed to upload image: ${uploadError.message}`,
      }
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return {
      error: false,
      imageUrl: urlData.publicUrl,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      error: true,
      message: `Failed to upload image: ${errorMessage}`,
    }
  }
}
