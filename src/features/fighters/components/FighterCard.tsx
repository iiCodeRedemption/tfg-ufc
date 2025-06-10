"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReactCountryFlag from "react-country-flag"
import { FighterStatus } from "@prisma/client"
import { detectFighterType } from "@/features/fighters/utils/detectFighterType"
import { STATUS_MAP } from "@/features/fighters/data/constants/statuses"
import { FighterWithDetails } from "@/features/fighters/data/types"
import { computeFighterRecord } from "@/features/fighters/utils/computeFightRecord"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FighterCard({ fighter }: { fighter: FighterWithDetails }) {
  const promotion = detectFighterType(fighter)
  const record = computeFighterRecord(fighter)

  return (
    <Card className="group relative h-[320px] overflow-hidden rounded-lg border-0 bg-gradient-to-br from-gray-900 to-black hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <Image
        src={fighter.imageUrl}
        alt={fighter.name}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110 opacity-40"
      />

      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-red-800 z-20" />

      <div className="absolute top-4 left-4 z-20">
        <Badge
          variant="outline"
          className="bg-gradient-to-r from-red-700 to-red-900 text-white border-0 font-semibold px-3 py-1"
        >
          {promotion}
        </Badge>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-2">
        <div className="flex items-center gap-2 mb-1.5">
          <ReactCountryFlag
            countryCode={fighter.countryCode}
            svg
            className="rounded-sm h-5"
          />
          <h2 className="text-xl font-bold text-white tracking-wide">
            {fighter.name}
          </h2>
        </div>

        {fighter.nickname && (
          <p className="text-red-400 text-sm font-medium italic">
            &quot;{fighter.nickname}&quot;
          </p>
        )}

        <div className="pt-2 flex items-center justify-between">
          <p className="text-gray-300 font-semibold tracking-wide">
            <span className="text-green-500">{record.wins}</span> -
            <span className="text-red-500">{record.losses}</span> -
            <span className="text-gray-500">{record.draws}</span>
          </p>

          <Badge
            variant="outline"
            className={`
              ${
                fighter.status === FighterStatus.CHAMPION
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-700 text-black"
                  : fighter.status === FighterStatus.ACTIVE
                  ? "bg-gradient-to-r from-green-600 to-green-800 text-white"
                  : "bg-gradient-to-r from-gray-600 to-gray-800 text-white"
              } 
              border-0 font-medium shadow-md px-2 py-0.5
            `}
          >
            {STATUS_MAP[fighter.status]}
          </Badge>
        </div>

        <div className="pt-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-3"></div>
          <Button
            asChild
            variant="default"
            className="w-full bg-red-700 hover:bg-red-600 text-white uppercase"
          >
            <Link href={`/fighters/${fighter.id}`}>View profile</Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
