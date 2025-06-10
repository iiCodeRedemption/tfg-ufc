import { Suspense } from "react"
import { FighterListClient } from "@/features/fighters/components/FighterListClient"
import { FighterGridSkeleton } from "./skeletons/FighterGridSkeleton"
import { getAllFighters } from "@/features/fighters/server/db/getAllFighters"

export function FighterList() {
  return (
    <Suspense fallback={<FighterGridSkeleton count={3} />}>
      <FighterListContent />
    </Suspense>
  )
}

async function FighterListContent() {
  const fighters = await getAllFighters({
    limit: 4,
  })
  return <FighterListClient fighters={fighters} />
}
