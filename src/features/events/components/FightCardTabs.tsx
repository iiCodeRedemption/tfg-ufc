"use client"

import { useState } from "react"
import { Award } from "lucide-react"
import { FightCard } from "@/features/fights/components/FightCard"
import { formatTime } from "@/lib/formatters"
import { Event, Fight, FightType } from "@prisma/client"

type FightWithRelations = Fight & {
  fighter1: any
  fighter2: any
  statistics: any
}

type EventWithFights = Event & {
  fights: FightWithRelations[]
}

export function FightCardTabs({ event }: { event: EventWithFights }) {
  const [activeCard, setActiveCard] = useState("main")

  const mainCardFights = event.fights.filter(
    (fight) => fight.fightType === FightType.MAIN_EVENT,
  )
  const prelimCardFights = event.fights.filter(
    (fight) => fight.fightType === FightType.PRELIMS,
  )
  const earlyPrelimFights = event.fights.filter(
    (fight) => fight.fightType === FightType.EARLY_PRELIMS,
  )

  return (
    <>
      <div className="bg-black/40 backdrop-blur-sm border-y border-red-950/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <button
              className={`py-4 px-6 font-bold transition-all ${
                activeCard === "main"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white hover:bg-red-950/20"
              }`}
              onClick={() => setActiveCard("main")}
            >
              MAIN CARD
            </button>
            <button
              className={`py-4 px-6 font-bold transition-all ${
                activeCard === "prelim"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white hover:bg-red-950/20"
              }`}
              onClick={() => setActiveCard("prelim")}
            >
              PRELIMS
            </button>
            <button
              className={`py-4 px-6 font-bold transition-all ${
                activeCard === "early"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white hover:bg-red-950/20"
              }`}
              onClick={() => setActiveCard("early")}
            >
              EARLY PRELIMS
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-xl border border-red-950/30 p-8">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-bold">
              {activeCard === "main"
                ? "MAIN CARD"
                : activeCard === "prelim"
                  ? "PRELIMINARY CARD"
                  : "EARLY PRELIMS"}
            </h2>
            {activeCard === "main" && (
              <div className="ml-4 bg-red-950/40 px-3 py-1 rounded-full text-sm border border-red-950/30">
                {formatTime(event.date)}
              </div>
            )}
            <div className="ml-4 bg-red-950/40 px-3 py-1 rounded-full text-sm border border-red-950/30">
              {activeCard === "main"
                ? "PPV"
                : activeCard === "prelim"
                  ? "ESPN"
                  : "ESPN+"}
            </div>
          </div>

          {activeCard === "main" && (
            <div className="space-y-6">
              {mainCardFights.length === 0 ? (
                <div className="text-center text-gray-400 italic py-8">
                  No fights scheduled for the Main Card.
                </div>
              ) : (
                mainCardFights.map((fight) => (
                  <FightCard key={fight.id} fight={fight} />
                ))
              )}
            </div>
          )}
          {activeCard === "prelim" && (
            <div className="space-y-6">
              {prelimCardFights.length === 0 ? (
                <div className="text-center text-gray-400 italic py-8">
                  No fights scheduled for the Prelims.
                </div>
              ) : (
                prelimCardFights.map((fight) => (
                  <FightCard key={fight.id} fight={fight} />
                ))
              )}
            </div>
          )}
          {activeCard === "early" && (
            <div className="space-y-6">
              {earlyPrelimFights.length === 0 ? (
                <div className="text-center text-gray-400 italic py-8">
                  No fights scheduled for the Early Prelims.
                </div>
              ) : (
                earlyPrelimFights.map((fight) => (
                  <FightCard key={fight.id} fight={fight} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
