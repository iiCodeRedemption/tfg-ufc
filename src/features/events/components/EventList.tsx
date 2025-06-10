import { Suspense } from "react"
import { EventListClient } from "@/features/events/components/EventListClient"
import { EventGridSkeleton } from "@/features/events/components/skeletons/EventGridSkeleton"
import { getAllEvents } from "../server/db/getAllEvents"

export function EventList() {
  return (
    <Suspense fallback={<EventGridSkeleton count={3} direction="column" />}>
      <EventListContent />
    </Suspense>
  )
}

async function EventListContent() {
  const events = await getAllEvents({ limit: 3 })
  return <EventListClient events={events} />
}
