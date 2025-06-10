"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FilterDropdown } from "@/components/FilterDropdown"
import { AlertTriangle, Search, ArrowUpDown } from "lucide-react"
import { FighterWithDetails } from "@/features/fighters/data/types"
import { FighterCard } from "@/features/fighters/components/FighterCard"
import { WEIGHT_CLASSES } from "@/features/fighters/data/constants/weightClasses"
import { Input } from "@/components/ui/input"
import {
  PROMOTIONS,
  PROMOTION_NAMES,
} from "@/features/fighters/data/constants/promotions"
import { COUNTRIES } from "@/data/constants/countries"
import ReactCountryFlag from "react-country-flag"
import { filterByWeightClass } from "@/features/fighters/utils/weightClassUtils"

const FILTERS = {
  WEIGHT_CLASSES: [
    { label: "All weight classes", value: "" },
    ...WEIGHT_CLASSES,
  ],
  PROMOTIONS: [
    { label: "All promotions", value: "" },
    ...Object.entries(PROMOTIONS).map(([, value]) => ({
      label: PROMOTION_NAMES[value],
      value: value,
    })),
  ],
  GENDER: [
    { label: "All genders", value: "" },
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
  ],
  STATUS: [
    { label: "All statuses", value: "" },
    { label: "Active", value: "active" },
    { label: "Champion", value: "champion" },
    { label: "Inactive", value: "inactive" },
    { label: "Retired", value: "retired" },
  ],
  SORT_OPTIONS: [
    { label: "Default", value: "" },
    { label: "Name (A-Z)", value: "name_asc" },
    { label: "Name (Z-A)", value: "name_desc" },
    { label: "P4P Ranking (Best First)", value: "p4p_asc" },
    { label: "P4P Ranking (Worst First)", value: "p4p_desc" },
    { label: "Division Ranking (Best First)", value: "division_asc" },
    { label: "Division Ranking (Worst First)", value: "division_desc" },
  ],
}

export function FighterGrid({
  fighters,
  defaultPromotion = "",
}: {
  fighters: FighterWithDetails[]
  defaultPromotion?: string
}) {
  const [selectedWeightClass, setSelectedWeightClass] = useState("")
  const [selectedPromotion, setSelectedPromotion] = useState(defaultPromotion)
  const [selectedGender, setSelectedGender] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [searchName, setSearchName] = useState("")
  const [sortBy, setSortBy] = useState("")

  const countryOptions = useMemo(() => {
    const allCountries = COUNTRIES.sort((a, b) =>
      a.name.localeCompare(b.name),
    ).map((country) => ({
      label: country.name,
      value: country.code,
      code: country.code,
    }))

    return [{ label: "All countries", value: "" }, ...allCountries]
  }, [])

  const filteredFighters = useMemo(() => {
    let filtered = fighters.filter((fighter) => {
      if (!filterByWeightClass(fighter, selectedWeightClass)) {
        return false
      }

      if (selectedPromotion) {
        const hasPromotion =
          fighter.ufcDetails || fighter.rizinDetails || fighter.oneDetails
        if (hasPromotion == null) return false

        if (selectedPromotion === "UFC" && !fighter.ufcDetails) return false
        if (selectedPromotion === "RIZIN" && !fighter.rizinDetails) return false
        if (selectedPromotion === "ONE" && !fighter.oneDetails) return false
      }

      if (selectedGender && fighter.gender !== selectedGender) {
        return false
      }

      if (selectedCountry && fighter.countryCode !== selectedCountry) {
        return false
      }

      if (selectedStatus) {
        const isChampion = fighter.status === "CHAMPION"
        const isActive = fighter.status === "ACTIVE"

        if (selectedStatus === "champion" && !isChampion) return false
        if (selectedStatus === "active" && !isActive) return false
        if (selectedStatus === "inactive" && fighter.status !== "INACTIVE")
          return false
        if (selectedStatus === "retired" && fighter.status !== "RETIRED")
          return false
      }

      if (
        searchName &&
        !fighter.name.toLowerCase().includes(searchName.toLowerCase())
      ) {
        return false
      }

      return true
    })

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "name_asc":
            return a.name.localeCompare(b.name)
          case "name_desc":
            return b.name.localeCompare(a.name)
          case "p4p_asc":
            const aP4P = a.ufcDetails?.isP4P ? 1 : 0
            const bP4P = b.ufcDetails?.isP4P ? 1 : 0
            return aP4P - bP4P
          case "p4p_desc":
            const aP4PDesc = a.ufcDetails?.isP4P ? 1 : 0
            const bP4PDesc = b.ufcDetails?.isP4P ? 1 : 0
            return bP4PDesc - aP4PDesc
          case "division_asc":
            const aDiv = a.ufcDetails?.titleWins || 0
            const bDiv = b.ufcDetails?.titleWins || 0
            return aDiv - bDiv
          case "division_desc":
            const aDivDesc = a.ufcDetails?.titleWins || 0
            const bDivDesc = b.ufcDetails?.titleWins || 0
            return bDivDesc - aDivDesc
          default:
            return 0
        }
      })
    }

    return filtered
  }, [
    fighters,
    selectedWeightClass,
    selectedPromotion,
    selectedGender,
    selectedCountry,
    selectedStatus,
    searchName,
    sortBy,
  ])

  return (
    <div className="flex flex-col gap-10">
      {fighters.length > 0 ? (
        <>
          <Card className="bg-[#1a1a1a] border-2 border-red-700 shadow-lg shadow-red-900/20 rounded-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-600 via-red-800 to-red-700"></div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-300 mb-2 text-lg">Search Fighter</p>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search by fighter name..."
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                      className="pl-10 bg-[#2a2a2a] border-red-700/30 text-white placeholder-gray-400 focus:border-red-700 focus:ring-2 focus:ring-red-700/20"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-gray-300 mb-2 text-lg flex items-center gap-2">
                    <ArrowUpDown className="w-5 h-5" />
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <p className="text-gray-300 mb-2 text-lg">Weight Class</p>
                  <FilterDropdown
                    label="Select a weight class..."
                    options={FILTERS.WEIGHT_CLASSES}
                    value={selectedWeightClass}
                    onChange={setSelectedWeightClass}
                  />
                </div>

                <div>
                  <p className="text-gray-300 mb-2 text-lg">Promotion</p>
                  <FilterDropdown
                    label="Select a promotion..."
                    options={FILTERS.PROMOTIONS}
                    value={selectedPromotion}
                    onChange={setSelectedPromotion}
                  />
                </div>

                <div>
                  <p className="text-gray-300 mb-2 text-lg">Gender</p>
                  <FilterDropdown
                    label="Select gender..."
                    options={FILTERS.GENDER}
                    value={selectedGender}
                    onChange={setSelectedGender}
                  />
                </div>

                <div>
                  <p className="text-gray-300 mb-2 text-lg">Country</p>
                  <FilterDropdown
                    label="Select a country..."
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    renderOption={(option) =>
                      option.code ? (
                        <div className="flex items-center gap-2">
                          <ReactCountryFlag
                            countryCode={option.code}
                            svg
                            className="rounded-sm h-4 w-6"
                          />
                          <span>{option.label}</span>
                        </div>
                      ) : (
                        option.label
                      )
                    }
                    filterFunction={(value, search) => {
                      const option = countryOptions.find(
                        (opt) => opt.value === value,
                      )
                      return (
                        option?.label
                          .toLowerCase()
                          .includes(search.toLowerCase()) || false
                      )
                    }}
                  />
                </div>

                <div>
                  <p className="text-gray-300 mb-2 text-lg">Status</p>
                  <FilterDropdown
                    label="Select status..."
                    options={FILTERS.STATUS}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-700/20">
                <p className="text-gray-400 text-sm">
                  Showing {filteredFighters.length} of {fighters.length}{" "}
                  fighters
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFighters.length > 0 ? (
              filteredFighters.map((fighter) => (
                <FighterCard key={fighter.id} fighter={fighter} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="bg-[#1a1a1a] border-2 border-red-700/50 rounded-xl p-8 max-w-2xl mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No Fighters Found
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
        <NoFighters />
      )}
    </div>
  )
}

function NoFighters() {
  return (
    <div className="text-center">
      <div className="bg-[#1a1a1a] border-2 border-red-700/50 rounded-xl p-8 max-w-2xl mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          No fighters available
        </h3>
        <p className="text-gray-400">
          There are currently no fighters in the database.
        </p>
      </div>
    </div>
  )
}
