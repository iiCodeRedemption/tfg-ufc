import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EventForm } from "@/features/events/components/EventForm"
import { getEventById } from "@/features/events/server/db/getEventById"

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const event = await getEventById(id)
  if (event == null) return notFound()

  const formattedDate = new Date(event.date).toISOString().split("T")[0]
  const formattedTime = new Date(event.date).toTimeString().substring(0, 5)

  const eventData = {
    id: event.id,
    name: event.name,
    date: formattedDate,
    time: formattedTime,
    location: event.name.split(":")[0],
    description: event.description ?? "",
    type: event.promotion,
    imageUrl: event.imageUrl,
    isPPV: event.isPPV,
    price: event.price ?? undefined,
  }

  return (
    <div className="flex flex-col w-full gap-8 pb-20">
      <section className="w-full">
        <div className="w-16 h-1 bg-red-700 mb-4"></div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Edit Event
        </h1>
        <p className="text-gray-400">Update event details</p>
      </section>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <div className="mb-8">
            <Link href="/admin?tab=events">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
          </div>

          <EventForm event={eventData} />
        </CardContent>
      </Card>
    </div>
  )
}
