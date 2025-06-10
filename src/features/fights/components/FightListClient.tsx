import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { FightWithParticipants } from "@/features/fights/data/types"
import { FightCard } from "./FightCard"

export function FightListClient({
  fights,
}: {
  fights: FightWithParticipants[]
}) {
  if (fights.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8 flex flex-col items-center justify-center min-h-[200px] text-center">
          <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
          <p className="text-gray-400 text-lg">
            No featured fights available at the moment
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {fights.map((fight) => (
        <FightCard key={fight.id} fight={fight} />
      ))}
    </div>
  )
}
