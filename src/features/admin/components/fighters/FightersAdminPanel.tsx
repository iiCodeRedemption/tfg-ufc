import Link from "next/link"
import { Plus } from "lucide-react"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { FightersTable } from "@/features/admin/components/fighters/FightersTable"
import { FightersTableSkeleton } from "@/features/admin/components/fighters/FightersTableSkeleton"

export function FightersAdminPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Fighters Management</h2>
        <Link href="/admin/fighters/new">
          <Button className="bg-red-700 hover:bg-red-600 flex items-center gap-2 text-white">
            <Plus size={16} />
            Add
          </Button>
        </Link>
      </div>

      <Suspense fallback={<FightersTableSkeleton />}>
        <FightersTable />
      </Suspense>
    </div>
  )
}
