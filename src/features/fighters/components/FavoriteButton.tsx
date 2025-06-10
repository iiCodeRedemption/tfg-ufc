"use client"
import { useTransition } from "react"
import { Heart } from "lucide-react"
import { toggleFighterFavorite } from "@/features/fighters/server/toggleFighterFavorite"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/LoadingSwap"

export function FavoriteButton({
  fighterId,
  isFavorite,
}: {
  fighterId: string
  isFavorite: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleFighterFavorite(fighterId)
      if (result.error) {
        toast.error(result.message)
        return
      }

      toast.success(result.message)
      router.refresh()
    })
  }

  return (
    <Button
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-red-950/30 transition-colors bg-transparent"
      aria-label={isFavorite ? "Unfavorite" : "Favorite"}
      disabled={isPending}
    >
      <LoadingSwap loading={isPending} className="text-red-500 w-8 h-8">
        {isFavorite ? (
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
        ) : (
          <Heart className="w-8 h-8 text-red-500/70 hover:text-red-500" />
        )}
      </LoadingSwap>
    </Button>
  )
}
