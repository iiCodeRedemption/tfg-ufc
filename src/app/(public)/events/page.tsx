import { Metadata } from "next"
import { EventGrid } from "@/features/events/components/EventGrid"
import { Suspense } from "react"
import { EventGridSearchSkeleton } from "@/features/events/components/skeletons/EventGridSearchSkeleton"
import { getAllEvents } from "@/features/events/server/db/getAllEvents"

export const metadata: Metadata = {
  title: "UFC Demo | Events",
  description: "Browse upcoming and past MMA events across major promotions",
}

export default async function EventPage({
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
              Upcoming <span className="text-red-600">Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl text-center mb-8">
              Browse the latest events from the world&apos;s top MMA promotions.
              Filter by promotion and year to find exactly what you&apos;re
              looking for.
            </p>
            <div className="w-36 h-1 bg-gradient-to-r from-transparent via-red-700 to-transparent"></div>
          </div>
        </div>

        <Suspense fallback={<EventGridSearchSkeleton />}>
          <EventSection params={params} />
        </Suspense>
      </div>
    </main>
  )
}

async function EventSection({
  params,
}: {
  params: { [key: string]: string | string[] | undefined }
}) {
  const events = await getAllEvents()
  return (
    <EventGrid
      events={events}
      defaultPromotion={params.promotion as string | undefined}
    />
  )
}
