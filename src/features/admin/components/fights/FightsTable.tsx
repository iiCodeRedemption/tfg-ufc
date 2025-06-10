import Image from "next/image"
import { FightTypeBadge } from "@/features/fights/components/FightTypeBadge"
import { PromotionBadge } from "@/features/admin/components/PromotionBadge"
import { DeleteFightButton } from "@/features/admin/components/fights/DeleteFightButton"
import { fightMethodToString } from "@/features/admin/utils/fightMethodToString"
import { formatTimeSeconds } from "@/lib/formatters"
import { FightStatisticsDialog } from "@/features/fights/components/FightStatisticsDialog"
import { Button } from "@/components/ui/button"
import { BarChart } from "lucide-react"
import { getAllFights } from "@/features/fights/server/db/getAllFights"

export async function FightsTable() {
  const fights = await getAllFights()

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
                Fighters
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Type
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Result
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {fights.length > 0 ? (
              fights.map((fight) => (
                <tr
                  key={fight.id}
                  className="border-b transition-colors hover:bg-gray-800/50"
                >
                  <td className="p-4 align-middle">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {fight.event?.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {fight.event?.date &&
                          new Date(fight.event.date).toLocaleDateString()}
                      </span>
                      {fight.event?.promotion && (
                        <PromotionBadge promotion={fight.event.promotion} />
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden relative">
                          <Image
                            src={fight.fighter1?.imageUrl || ""}
                            alt={fight.fighter1?.name || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white">
                            {fight.fighter1?.name}
                          </span>
                          {fight.fighter1?.nickname && (
                            <span className="text-xs text-gray-400">
                              &apos;{fight.fighter1.nickname}&apos;
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center text-gray-500">
                        VS
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden relative">
                          <Image
                            src={fight.fighter2?.imageUrl || ""}
                            alt={fight.fighter2?.name || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white">
                            {fight.fighter2?.name}
                          </span>
                          {fight.fighter2?.nickname && (
                            <span className="text-xs text-gray-400">
                              &apos;{fight.fighter2.nickname}&apos;
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <FightTypeBadge fightType={fight.fightType} />
                    <div className="text-xs text-gray-400 mt-1">
                      {fight.rounds} {fight.rounds === 1 ? "round" : "rounds"}
                      {fight.championshipFight && (
                        <span className="ml-1 text-yellow-500">(Title)</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    {fight.winnerId ? (
                      <div className="flex flex-col">
                        <span className="text-white">
                          {fight.winnerId === fight.fighter1?.id
                            ? fight.fighter1?.name
                            : fight.fighter2?.name}{" "}
                          wins
                        </span>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <span>{fightMethodToString(fight.method)}</span>
                          {fight.finishRound && (
                            <span>
                              • R{fight.finishRound}
                              {fight.finishTimeSeconds
                                ? ` (${formatTimeSeconds(
                                    fight.finishTimeSeconds,
                                  )})`
                                : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">TBD</span>
                    )}
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <FightStatisticsDialog
                        fight={{
                          id: fight.id,
                          fighter1Name: fight.fighter1?.name || "",
                          fighter2Name: fight.fighter2?.name || "",
                          statistics: fight.statistics,
                        }}
                        trigger={
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                            title="Fight Statistics"
                          >
                            <BarChart size={16} />
                          </Button>
                        }
                      />
                      <DeleteFightButton fightId={fight.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="h-24 text-center text-gray-400">
                  No fights found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
