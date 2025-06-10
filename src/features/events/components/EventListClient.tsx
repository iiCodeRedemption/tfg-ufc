import { Event } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { EventCard } from "./EventCard"

export function EventListClient({ events }: { events: Event[] }) {
  if (events.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[200px] text-center">
          <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
          <p className="text-gray-400 text-lg">
            No events available at the moment
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
