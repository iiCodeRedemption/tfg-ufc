import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export function LoadingSwap({
  loading,
  children,
  className = "",
}: {
  loading: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <>
      {loading ? (
        <Loader2 className={cn("animate-spin", className)} />
      ) : (
        children
      )}
    </>
  )
}
