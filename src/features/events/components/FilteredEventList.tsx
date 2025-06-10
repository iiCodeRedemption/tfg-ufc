"use client"

import { useState } from "react"
import { EventList } from "@/features/events/components/EventList"
import { Card, CardContent } from "@/components/ui/card"
import { FilterDropdown } from "@/components/FilterDropdown"
import { Event } from "@prisma/client"

const FILTERS = {
  PROMOTIONS: [
    { label: "All events", value: "" },
    { label: "UFC", value: "UFC" },
    { label: "ONE CHAMPIONSHIP", value: "ONE" },
    { label: "RIZIN", value: "RIZIN" },
  ],
  YEARS: [
    { label: "All years", value: "" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
  ],
}

export function FilteredEventList({ events }: { events: Event[] }) {
  const [selectedPromotion, setSelectedPromotion] = useState("")
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
    <div className="flex flex-col lg:flex-row w-full text-white items-center justify-around min-h-screen p-8 gap-8">
      <Card className="w-full lg:w-1/4 p-5 rounded-2xl shadow-lg border-4 border-red-700">
        <CardContent className="flex flex-col gap-6">
          <FilterDropdown
            label="Select a promotion..."
            options={FILTERS.PROMOTIONS}
            value={selectedPromotion}
            onChange={setSelectedPromotion}
          />
          <FilterDropdown
            label="Select a year..."
            options={FILTERS.YEARS}
            value={selectedYear}
            onChange={setSelectedYear}
          />
        </CardContent>
      </Card>

      <Card className="w-full lg:w-2/3 p-5 rounded-2xl shadow-lg border-4 border-red-700">
        <CardContent className="p-5">
          <EventList />
        </CardContent>
      </Card>
    </div>
  )
}
