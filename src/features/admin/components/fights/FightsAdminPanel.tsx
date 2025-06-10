import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Suspense } from "react"
import { FightsTable } from "./FightsTable"
import { FightsTableSkeleton } from "./FightsTableSkeleton"
import { FightDialog } from "@/features/fights/components/FightDialog"
import { getAllFighters } from "@/features/fighters/server/db/getAllFighters"
import { getAllEvents } from "@/features/events/server/db/getAllEvents"

export async function FightsAdminPanel() {
  const fighters = await getAllFighters()
  const events = await getAllEvents()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Fights Management</h2>
        <FightDialog
          fighters={fighters}
          events={events}
          trigger={
            <Button className="bg-red-700 hover:bg-red-600 flex items-center gap-2 text-white">
              <Plus size={16} />
              Add
            </Button>
          }
        />
      </div>

      <Suspense fallback={<FightsTableSkeleton />}>
        <FightsTable />
      </Suspense>
    </div>
  )
}
