import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { DeleteFighterButton } from "@/features/admin/components/fighters/DeleteFighterButton"
import { StatusBadge } from "@/features/fighters/components/StatusBadge"
import { detectFighterType } from "@/features/fighters/utils/detectFighterType"
import { getAllFighters } from "@/features/fighters/server/db/getAllFighters"

export async function FightersTable() {
  const fighters = await getAllFighters()

  return (
    <div className="rounded-md border border-gray-800 overflow-hidden">
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b border-gray-800">
            <tr className="border-b transition-colors hover:bg-gray-800/50">
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Fighter
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Country
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Status
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Type
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {fighters.length > 0 ? (
              fighters.map((fighter) => (
                <tr
                  key={fighter.id}
                  className="border-b transition-colors hover:bg-gray-800/50"
                >
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden relative">
                        <Image
                          src={fighter.imageUrl}
                          alt={fighter.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-white">
                          {fighter.name}
                        </span>
                        {fighter.nickname && (
                          <span className="text-xs text-gray-400">
                            &#39;{fighter.nickname}&#39;
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 align-middle text-gray-300">
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://flagcdn.com/w20/${fighter.countryCode.toLowerCase()}.png`}
                        alt={`${fighter.countryCode} flag`}
                        width={20}
                        height={15}
                        className="rounded-sm"
                      />
                      {fighter.countryCode}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <StatusBadge status={fighter.status} />
                  </td>
                  <td className="p-4 align-middle text-gray-300">
                    {detectFighterType(fighter)}
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/fighters/${fighter.id}/edit`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-gray-700"
                        >
                          <Pencil size={14} className="text-gray-300" />
                        </Button>
                      </Link>
                      <DeleteFighterButton fighterId={fighter.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="h-24 text-center text-gray-400">
                  No fighters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
