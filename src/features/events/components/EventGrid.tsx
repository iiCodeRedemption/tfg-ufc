"use client"

import { useState } from "react"
import { Event } from "@prisma/client"
import { Card, CardContent } from "@/components/ui/card"
import { FilterDropdown } from "@/components/FilterDropdown"
import { AlertTriangle } from "lucide-react"
import { EventCard } from "@/features/events/components/EventCard"
import {
  PROMOTIONS,
  PROMOTION_NAMES,
} from "@/features/fighters/data/constants/promotions"

const FILTERS = {
  PROMOTIONS: [
    { label: "All events", value: "" },
    ...Object.entries(PROMOTIONS).map(([, value]) => ({
      label: PROMOTION_NAMES[value],
      value: value,
    })),
  ],
  YEARS: [
    { label: "All years", value: "" },
    ...Array.from({ length: 5 }, (_, i) => {
      const year = 2021 + i
      return { label: year.toString(), value: year.toString() }
    }),
  ],
}

export function EventGrid({
  events,
  defaultPromotion = "",
}: {
  events: Event[]
  defaultPromotion?: string
}) {
  const [selectedPromotion, setSelectedPromotion] = useState(defaultPromotion)
  const [selectedYear, setSelectedYear] = useState("")

  const filteredEvents = events.filter((event) => {
    const matchesPromotion =
      !selectedPromotion || event.promotion === selectedPromotion
    const matchesYear =
      !selectedYear ||
      new Date(event.date).getFullYear().toString() === selectedYear

    return matchesPromotion && matchesYear
  })

  return (
    <div className="flex flex-col gap-10">
      {events.length > 0 ? (
        <>
          <Card className="bg-[#1a1a1a] border-2 border-red-700 shadow-lg shadow-red-900/20 rounded-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-600 via-red-800 to-red-700"></div>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <p className="text-gray-300 mb-2 text-lg">Promotion</p>
                  <FilterDropdown
                    label="Select a promotion..."
                    options={FILTERS.PROMOTIONS}
                    value={selectedPromotion}
                    onChange={setSelectedPromotion}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-300 mb-2 text-lg">Year</p>
                  <FilterDropdown
                    label="Select a year..."
                    options={FILTERS.YEARS}
                    value={selectedYear}
                    onChange={setSelectedYear}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="bg-[#1a1a1a] border-2 border-red-700/50 rounded-xl p-8 max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Events Found
                  </h3>
                  <p className="text-gray-400">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <NoEvents />
      )}
    </div>
  )
}

function NoEvents() {
  return (
    <div className="text-center">
      <div className="bg-[#1a1a1a] border-2 border-red-700/50 rounded-xl p-8 max-w-2xl mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No events available
        </h3>
        <p className="text-gray-400">
          There are currently no events in the database.
        </p>
      </div>
    </div>
  )
}
