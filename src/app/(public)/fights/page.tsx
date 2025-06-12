import { Metadata } from "next"
import { FightsGrid } from "@/features/fights/components/FightsGrid"
import { Suspense } from "react"
import { FightGridSearchSkeleton } from "@/features/fights/components/skeletons/FightGridSearchSkeleton"
import { getAllFights } from "@/features/fights/server/db/getAllFights"
import { getAllEvents } from "@/features/events/server/db/getAllEvents"

export const metadata: Metadata = {
  title: "UFC Demo | Fights",
  description: "Browse all upcoming and past UFC fights across divisions",
}

export default function FightsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0c0101] to-[#150202]">
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-24">
        <div className="relative mb-16">
          <div className="flex flex-col items-center">
            <div className="w-24 h-1 bg-red-700 mb-4"></div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight text-center uppercase">
              Epic <span className="text-red-600">Fights</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl text-center mb-8">
              Browse upcoming and historical MMA bouts. Filter by event, weight
              class, and status to find the fights you&apos;re looking for.
            </p>
            <div className="w-36 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent"></div>
          </div>
        </div>

        <Suspense fallback={<FightGridSearchSkeleton />}>
          <FightsSection />
        </Suspense>
      </div>
    </main>
  )
}

async function FightsSection() {
  const [fights, events] = await Promise.all([getAllFights(), getAllEvents()])
  return <FightsGrid fights={fights} events={events} />
}
