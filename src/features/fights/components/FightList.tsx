import { Suspense } from "react"
import { FightListClient } from "@/features/fights/components/FightListClient"
import { FightGridSkeleton } from "@/features/fights/components/skeletons/FightGridSkeleton"
import { getAllFeaturedFights } from "@/features/fights/server/db/getAllFeaturedFights"

export function FightList() {
  return (
    <Suspense fallback={<FightGridSkeleton count={3} />}>
      <FightListContent />
    </Suspense>
  )
}

async function FightListContent() {
  const fights = await getAllFeaturedFights({ limit: 5 })
  return <FightListClient fights={fights} />
}
