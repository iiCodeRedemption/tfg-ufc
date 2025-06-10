import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteDialog } from "@/components/dialogs/DeleteDialog"
import { deleteFighter } from "@/features/fighters/server/deleteFighter"

export function DeleteFighterButton({ fighterId }: { fighterId: string }) {
  return (
    <DeleteDialog
      title="Delete Fighter"
      description="Are you sure you want to delete this fighter? This action cannot be undone."
      action={deleteFighter.bind(null, fighterId)}
      trigger={
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0 border-gray-700 hover:bg-red-900/30 hover:border-red-900"
        >
          <Trash size={14} className="text-gray-300" />
        </Button>
      }
    />
  )
}
