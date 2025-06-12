import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FightWithParticipants } from "@/features/fights/data/types"

export function FightCard({ fight }: { fight: FightWithParticipants }) {
  return (
    <Card className="group relative h-[280px] overflow-hidden rounded-lg border-0 bg-gradient-to-br from-gray-900 to-black hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-black/30"></div>
          <Image
            src={fight.fighter1.imageUrl || "/imgs/logo.webp"}
            alt={fight.fighter1.name}
            fill
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>
        <div className="w-1/2 h-full relative">
          <div className="absolute inset-0 bg-gradient-to-bl from-red-950/30 to-black/30"></div>
          <Image
            src={fight.fighter2.imageUrl || "/imgs/logo.webp"}
            alt={fight.fighter2.name}
            fill
            className="object-cover object-left scale-x-[-1] transform"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent"></div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center gap-4 md:gap-8 w-full max-w-[90%] px-2">
          <div className="text-right w-[40%] pl-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg truncate pl-1">
              {fight.fighter1.name}
            </h3>
            <div className="h-1 w-24 bg-red-700 ml-auto shadow-lg shadow-red-700/20"></div>
          </div>

          <div className="relative shrink-0 z-10">
            <div className="absolute inset-0 bg-red-700/20 blur-xl"></div>
            <div className="relative bg-black/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-lg border border-red-700/50 shadow-lg shadow-red-700/10">
              <span className="text-red-500 font-bold text-xl sm:text-2xl tracking-wider drop-shadow-lg">
                VS
              </span>
            </div>
          </div>

          <div className="text-left w-[40%] pr-2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg truncate pr-1">
              {fight.fighter2.name}
            </h3>
            <div className="h-1 w-24 bg-red-700 shadow-lg shadow-red-700/20"></div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 to-red-800"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-3"></div>
        <Button
          asChild
          variant="default"
          className="w-full bg-red-700 hover:bg-red-600 text-white uppercase"
        >
          <Link href={`/fights/${fight.id}`}>View details</Link>
        </Button>
      </div>
    </Card>
  )
}
