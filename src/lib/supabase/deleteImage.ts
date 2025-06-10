import { createClient } from "@/lib/supabase/server"
import { Bucket } from "@/lib/supabase/types/bucket"

export const deleteImageFromStorage = async ({
  imageUrl,
  bucket,
}: {
  imageUrl: string
  bucket: Bucket
}): Promise<{ error: boolean; message?: string }> => {
  if (!imageUrl) {
    return { error: false }
  }

  try {
    const supabase = await createClient()

    const publicUrlBase = `/storage/v1/object/public/${bucket}/`
    const index = imageUrl.indexOf(publicUrlBase)

    let imagePath: string

    if (index !== -1) {
      imagePath = imageUrl.substring(index + publicUrlBase.length)
    } else {
      try {
        const url = new URL(imageUrl)
        const pathSegments = url.pathname.split("/")
        const fileName = pathSegments[pathSegments.length - 1]
        imagePath = `images/${fileName}`
      } catch {
        return {
          error: true,
          message: `Invalid image URL format: ${imageUrl}`,
        }
      }
    }

    const { error } = await supabase.storage.from(bucket).remove([imagePath])

    if (error) {
      return {
        error: true,
        message: `Storage error: ${error.message}`,
      }
    }

    return { error: false }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return {
      error: true,
      message: `Failed to delete image: ${errorMessage}`,
    }
  }
}
