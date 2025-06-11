import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Suspense } from "react"
import { EventHeaderSkeleton } from "@/features/events/components/skeletons/EventHeaderSkeleton"
import { FightCardSkeleton } from "@/features/events/components/skeletons/FightCardSkeleton"
import { VenueInfoSkeleton } from "@/features/events/components/skeletons/VenueInfoSkeleton"
import { formatDate, formatTime } from "@/lib/formatters"
import { FightCardTabs } from "@/features/events/components/FightCardTabs"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getEventById } from "@/features/events/server/db/getEventById"

export default async function EventPage({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0c0101] to-[#150202] text-white">
      <Suspense fallback={<EventHeaderSkeleton />}>
        <EventHeader eventId={eventId} />
      </Suspense>

      <Suspense fallback={<FightCardSkeleton />}>
        <FightCard eventId={eventId} />
      </Suspense>

      <Suspense fallback={<VenueInfoSkeleton />}>
        <VenueInfo eventId={eventId} />
      </Suspense>
    </div>
  )
}

async function EventHeader({ eventId }: { eventId: string }) {
  const event = await getEventById(eventId)
  if (event == null) return notFound()

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 z-10" />

      <div className="absolute inset-0">
        <Image
          src={event.imageUrl}
          alt={event.name}
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="relative z-20 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative w-[280px] h-[280px] bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 shadow-2xl">
                <Image
                  className="object-contain"
                  alt={event.name}
                  fill
                  src={event.imageUrl}
                  priority
                />
              </div>
            </div>

            <div className="w-full lg:w-2/3 space-y-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {event.name}
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-red-700 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-xl px-6 py-4 border border-red-500/20">
                  <Calendar className="h-6 w-6 mr-3 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-semibold">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-xl px-6 py-4 border border-red-500/20">
                  <Clock className="h-6 w-6 mr-3 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="font-semibold">{formatTime(event.date)}</p>
                  </div>
                </div>

                {event.location != null && (
                  <Link
                    href={`https://maps.google.com/?q=${event.location}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-xl px-6 py-4 border border-red-500/20">
                      <MapPin className="h-6 w-6 mr-3 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="font-semibold">{event.location}</p>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-xl px-6 py-4 border border-red-500/20">
                  <div className="h-6 w-6 mr-3 flex items-center justify-center">
                    <span className="text-red-500 font-bold">P</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Promotion</p>
                    <p className="font-semibold">{event.promotion}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

async function FightCard({ eventId }: { eventId: string }) {
  const event = await getEventById(eventId)
  if (event == null) return notFound()

  return <FightCardTabs event={event} />
}

async function VenueInfo({ eventId }: { eventId: string }) {
  const event = await getEventById(eventId)
  if (event == null) return notFound()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-500/20 p-8">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Event Information
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">
                About the event
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full mb-4" />
              <p className="text-gray-300 leading-relaxed">
                {event.description ?? "No description available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
