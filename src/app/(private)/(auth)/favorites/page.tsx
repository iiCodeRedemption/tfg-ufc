import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FighterCard } from "@/features/fighters/components/FighterCard"
import { ArrowRight, AlertCircle } from "lucide-react"
import { Suspense } from "react"
import { FighterGridSkeleton } from "@/features/fighters/components/skeletons/FighterGridSkeleton"
import { getFavoriteFighters } from "@/features/fighters/server/db/getFavoriteFighters"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "UFC Demo | Favorites",
  description: "View your favorite UFC fighters",
}

export default function FavoritesPage() {
  return (
    <div className="flex flex-col w-full gap-16 pb-20">
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/ufc-octagon.jpg')] bg-cover bg-center opacity-40"></div>

        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
          <div className="w-20 h-1.5 bg-red-700 mb-6"></div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
            YOUR <span className="text-red-600">FAVORITES</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            All your followed fighters in one place. Never lose track of your
            favorites.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="w-16 h-1 bg-red-700 mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Saved Fighters
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            <Link href="/fighters" className="flex items-center gap-2">
              View all fighters <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <Suspense fallback={<FighterGridSkeleton count={4} />}>
          <FavoritesFightersSection />
        </Suspense>
      </section>
    </div>
  )
}

async function FavoritesFightersSection() {
  const favoriteFighters = await getFavoriteFighters()

  if (favoriteFighters.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden border-0 shadow-lg">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <AlertCircle className="text-red-600" size={24} />
          </div>
          <p className="text-gray-400 text-lg mb-6">
            You haven&apos;t favorited any fighters yet
          </p>
          <Button
            asChild
            className="bg-red-700 hover:bg-red-600 text-white font-bold"
          >
            <Link href="/fighters">Browse fighters</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favoriteFighters.map((fighter) => (
        <FighterCard key={fighter.id} fighter={fighter} />
      ))}
    </div>
  )
}
