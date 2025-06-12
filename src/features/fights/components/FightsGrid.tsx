"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FilterDropdown } from "@/components/FilterDropdown"
import { Search, Scale, Clock, AlertTriangle } from "lucide-react"
import { FightWithParticipants } from "@/features/fights/data/types"
import { FightCard } from "@/features/fights/components/FightCard"
import { Event, FightType } from "@prisma/client"

import { WEIGHT_CLASSES as FIGHTER_WEIGHT_CLASSES } from "@/features/fighters/data/constants/weightClasses"
import { getWeightClassName } from "@/features/fighters/utils/weightClassUtils"

const FILTERS = {
  WEIGHT_CLASSES: [
    { label: "All weight classes", value: "" },
    ...FIGHTER_WEIGHT_CLASSES.map((wc) => ({
      label: wc.name,
      value: wc.name,
    })).reverse(),
  ],
  SORT_OPTIONS: [
    { label: "Date (Newest First)", value: "date_desc" },
    { label: "Date (Oldest First)", value: "date_asc" },
    { label: "Main Event", value: "main_event" },
  ],
}

export function FightsGrid({
  fights,
  events,
}: {
  fights: FightWithParticipants[]
  events: Event[]
}) {
  const [selectedWeightClass, setSelectedWeightClass] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date_desc")

  const eventOptions = useMemo(() => {
    return [
      { label: "All events", value: "" },
      ...events.map((event) => ({ label: event.name, value: event.name })),
    ]
  }, [events])

  const filteredFights = useMemo(() => {
    let filtered = fights.filter((fight) => {
      if (selectedWeightClass) {
        if (fight.weightClass === selectedWeightClass) {
          return true
        }

        const fighter1Weight = fight.fighter1?.weight || 0
        const fighter2Weight = fight.fighter2?.weight || 0
        const maxWeight = Math.max(fighter1Weight, fighter2Weight)

        if (maxWeight > 0) {
          const calculatedWeightClass = getWeightClassName(maxWeight)
          return calculatedWeightClass === selectedWeightClass
        }

        return false
      }

      if (searchQuery) {
        const search = searchQuery.toLowerCase()
        const fighter1Match = fight.fighter1?.name
          .toLowerCase()
          .includes(search)
        const fighter2Match = fight.fighter2?.name
          .toLowerCase()
          .includes(search)
        const eventMatch = fight.event?.name.toLowerCase().includes(search)

        if (!fighter1Match && !fighter2Match && !eventMatch) {
          return false
        }
      }

      return true
    })

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "date_asc":
            if (a.event?.date && b.event?.date) {
              return (
                new Date(a.event.date).getTime() -
                new Date(b.event.date).getTime()
              )
            }
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
          case "date_desc":
            if (a.event?.date && b.event?.date) {
              return (
                new Date(b.event.date).getTime() -
                new Date(a.event.date).getTime()
              )
            }
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          case "title_first":
            const aTitleFight = a.championshipFight || false
            const bTitleFight = b.championshipFight || false
            return aTitleFight === bTitleFight ? 0 : aTitleFight ? -1 : 1
          case "main_event":
            const aMainEvent = a.fightType === FightType.MAIN_EVENT || false
            const bMainEvent = b.fightType === FightType.MAIN_EVENT || false
            return aMainEvent === bMainEvent ? 0 : aMainEvent ? -1 : 1
          default:
            return 0
        }
      })
    }

    if (selectedEvent) {
      filtered = filtered.filter((fight) => {
        return fight.event?.name === selectedEvent
      })
    }

    return filtered
  }, [
    fights,
    selectedWeightClass,
    selectedStatus,
    selectedEvent,
    searchQuery,
    sortBy,
  ])

  return (
    <div className="flex flex-col gap-10">
      {fights.length > 0 ? (
        <>
          <Card className="bg-[#1a1a1a] border-2 border-red-700 shadow-lg shadow-red-900/20 rounded-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-600 via-red-800 to-red-700"></div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-300 mb-2 text-lg">Search Fights</p>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by fighters or event..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-red-700/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-gray-300 mb-2 text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Sort By
                  </p>
                  <FilterDropdown
                    label="Select sorting option..."
                    options={FILTERS.SORT_OPTIONS}
                    value={sortBy}
                    onChange={setSortBy}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-300 mb-2 text-lg flex items-center gap-2">
                    <Scale className="w-5 h-5" />
                    Weight Class
                  </p>
                  <FilterDropdown
                    label="Select weight class..."
                    options={FILTERS.WEIGHT_CLASSES}
                    value={selectedWeightClass}
                    onChange={setSelectedWeightClass}
                  />
                </div>

                <div>
                  <p className="text-gray-300 mb-2 text-lg">Event</p>
                  <FilterDropdown
                    label="Select event..."
                    options={eventOptions}
                    value={selectedEvent}
                    onChange={setSelectedEvent}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-700/20">
                <p className="text-gray-400 text-sm">
                  Showing {filteredFights.length} of {fights.length} fights
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFights.length > 0 ? (
              filteredFights.map((fight) => (
                <FightCard key={fight.id} fight={fight} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="bg-[#1a1a1a] border-2 border-red-700/50 rounded-xl p-8 max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Fights Found
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
        <div className="text-center">
          <div className="bg-[#1a1a1a] border-2 border-red-700/50 rounded-xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Fights Available
            </h3>
            <p className="text-gray-400">
              There are currently no fights in the database.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
