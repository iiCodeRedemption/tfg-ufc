import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { PromotionBadge } from "@/features/admin/components/PromotionBadge"
import { DeleteEventButton } from "@/features/admin/components/events/DeleteEventButton"
import { formatDate, formatTime } from "@/lib/formatters"
import { getAllEvents } from "@/features/events/server/db/getAllEvents"

export async function EventsTable() {
  const events = await getAllEvents()

  return (
    <div className="rounded-md border border-gray-800 overflow-hidden">
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b border-gray-800">
            <tr className="border-b transition-colors hover:bg-gray-800/50">
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Event
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Date
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Location
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Promotion
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {events.length > 0 ? (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b transition-colors hover:bg-gray-800/50"
                >
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded overflow-hidden relative">
                        <Image
                          src={event.imageUrl}
                          alt={event.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium text-white">
                        {event.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-gray-300">
                    <div className="flex flex-col">
                      <span>{formatDate(event.date)}</span>
                      <span className="text-xs text-gray-400">
                        {formatTime(event.date)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-gray-300">
                    <span>{event.location}</span>
                  </td>
                  <td className="p-4 align-middle">
                    <PromotionBadge promotion={event.promotion} />
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-700"
                        >
                          <Pencil size={14} className="text-gray-300" />
                        </Button>
                      </Link>
                      <DeleteEventButton eventId={event.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="h-24 text-center text-gray-400">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
