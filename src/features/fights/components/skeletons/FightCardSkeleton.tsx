import { Skeleton } from "@/components/ui/skeleton"

export function FighterCardSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="w-48 h-48 rounded-full mb-6" />
      <Skeleton className="h-8 w-40 mb-1" />
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
  )
}
