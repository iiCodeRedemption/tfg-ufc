import { Skeleton } from "@/components/ui/skeleton"

export function UserSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-full bg-[#333]" />
      <Skeleton className="h-4 w-20 bg-[#333]" />
    </div>
  )
}
