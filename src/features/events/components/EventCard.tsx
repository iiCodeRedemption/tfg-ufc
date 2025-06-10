"use client"

import Image from "next/image"
import { Event } from "@prisma/client"
import { formatDate } from "@/lib/formatters"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="bg-black border border-gray-800 hover:border-red-700 overflow-hidden transition-all duration-300 p-0">
      <Link href={`/events/${event.id}`}>
        <div className="flex flex-col md:flex-row items-start gap-4 p-6">
          <div className="flex-shrink-0 w-full md:w-20 h-20 flex items-center justify-center bg-gray-900 rounded-lg overflow-hidden mb-2 md:mb-0">
            <Image
              src={`/imgs/promotions/${event.promotion.toLowerCase()}.png`}
              alt={event.promotion}
              width={50}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="flex-grow space-y-3">
            <h3 className="text-xl font-bold text-white">{event.name}</h3>

            <div className="flex flex-wrap gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-red-500" />
                <span className="text-sm">
                  {formatDate(new Date(event.date))}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-red-500" />
                <span className="text-sm">{event.promotion}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="flex justify-end">
              <div className="px-3 py-1 text-xs font-semibold rounded bg-red-700 text-white">
                View details
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
