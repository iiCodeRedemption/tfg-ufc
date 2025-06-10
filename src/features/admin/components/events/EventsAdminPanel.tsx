import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Suspense } from "react"
import { EventsTable } from "@/features/admin/components/events/EventsTable"
import { EventsTableSkeleton } from "@/features/admin/components/events/EventsTableSkeleton"

export function EventsAdminPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Events Management</h2>
        <Link href="/admin/events/new">
          <Button className="bg-red-700 hover:bg-red-600 flex items-center gap-2 text-white">
            <Plus size={16} />
            Add
          </Button>
        </Link>
      </div>

      <Suspense fallback={<EventsTableSkeleton />}>
        <EventsTable />
      </Suspense>
    </div>
  )
}
