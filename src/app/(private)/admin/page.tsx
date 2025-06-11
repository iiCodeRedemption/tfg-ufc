import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { AdminHeader } from "@/features/admin/components/AdminHeader"
import { FightersAdminPanel } from "@/features/admin/components/fighters/FightersAdminPanel"
import { EventsAdminPanel } from "@/features/admin/components/events/EventsAdminPanel"
import { FightsAdminPanel } from "@/features/admin/components/fights/FightsAdminPanel"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab = "fighters" } = await searchParams

  return (
    <div className="flex flex-col w-full gap-8 pb-20">
      <AdminHeader />

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <Tabs defaultValue={tab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger
                value="fighters"
                asChild
                className="data-[state=active]:bg-red-700"
              >
                <Link href="/admin?tab=fighters">FIGHTERS</Link>
              </TabsTrigger>
              <TabsTrigger
                value="events"
                asChild
                className="data-[state=active]:bg-red-700"
              >
                <Link href="/admin?tab=events">EVENTS</Link>
              </TabsTrigger>
              <TabsTrigger
                value="fights"
                asChild
                className="data-[state=active]:bg-red-700"
              >
                <Link href="/admin?tab=fights">FIGHTS</Link>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fighters" className="mt-0">
              <FightersAdminPanel />
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <EventsAdminPanel />
            </TabsContent>

            <TabsContent value="fights" className="mt-0">
              <FightsAdminPanel />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
