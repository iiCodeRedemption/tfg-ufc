import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FighterForm } from "@/features/fighters/components/forms/FighterForm"
import { getFighterById } from "@/features/fighters/server/db/getFighterById"

export default async function EditFighterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const fighter = await getFighterById(id)
  if (fighter == null) return notFound()

  return (
    <div className="flex flex-col w-full gap-8 pb-20">
      <section className="w-full">
        <div className="w-16 h-1 bg-red-700 mb-4"></div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Edit Fighter
        </h1>
        <p className="text-gray-400">Update fighter profile</p>
      </section>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <div className="mb-8">
            <Link href="/admin?tab=fighters">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
          </div>

          <FighterForm fighter={fighter} />
        </CardContent>
      </Card>
    </div>
  )
}
