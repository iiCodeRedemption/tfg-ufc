import { Metadata } from "next"
import { FighterGrid } from "@/features/fighters/components/FighterGrid"
import { Suspense } from "react"
import { FighterGridSearchSkeleton } from "@/features/fighters/components/skeletons/FighterGridSearchSkeleton"
import { getAllFighters } from "@/features/fighters/server/db/getAllFighters"

export const metadata: Metadata = {
  title: "Fighters",
  description: "Browse all UFC fighters across divisions and weight classes",
}

export default async function FightersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0c0101] to-[#150202]">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-24">
        <div className="relative mb-16">
          <div className="flex flex-col items-center">
            <div className="w-24 h-1 bg-red-700 mb-4"></div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight text-center uppercase">
              Elite <span className="text-red-600">Fighters</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl text-center mb-8">
              Browse the world&apos;s top mixed martial artists across all
              divisions. Filter by weight class and promotion to find exactly
              who you&apos;re looking for.
            </p>
            <div className="w-36 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent"></div>
          </div>
        </div>

        <Suspense fallback={<FighterGridSearchSkeleton />}>
          <FighterSection params={params} />
        </Suspense>
      </div>
    </main>
  )
}

async function FighterSection({
  params,
}: {
  params: { [key: string]: string | string[] | undefined }
}) {
  const fighters = await getAllFighters()

  return (
    <FighterGrid
      fighters={fighters}
      defaultPromotion={params.promotion as string | undefined}
    />
  )
}
