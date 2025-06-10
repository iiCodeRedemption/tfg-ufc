import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { DeleteDialog } from "@/components/dialogs/DeleteDialog"
import { deleteFight } from "@/features/fights/server/deleteFight"

export function DeleteFightButton({ fightId }: { fightId: string }) {
  return (
    <DeleteDialog
      title="Delete Fight"
      description="Are you sure you want to delete this fight? This action cannot be undone."
      action={deleteFight.bind(null, fightId)}
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
