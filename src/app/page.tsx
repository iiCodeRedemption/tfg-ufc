import { FighterList } from "@/features/fighters/components/FighterList"
import { EventList } from "@/features/events/components/EventList"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FightList } from "@/features/fights/components/FightList"

export default function HomePage() {
  return (
    <div className="flex flex-col w-full gap-16 pb-20">
      <HeroSection />
      <FeaturedFights />
      <FeaturedFightersSection />
      <UpcomingEventsSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[url('/imgs/logo.webp')] bg-cover bg-center opacity-40"></div>

      <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
        <div className="w-20 h-1.5 bg-red-700 mb-6"></div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight">
          WITNESS <span className="text-red-600">GREATNESS</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl">
          Your ultimate destination for the world&apos;s premier MMA events,
          fighter profiles, and latest news.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            size="lg"
            className="bg-red-700 hover:bg-red-600 text-white font-bold rounded px-8 uppercase"
          >
            <Link href="/events">Upcoming events</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 font-bold rounded px-8 uppercase"
          >
            <Link href="/fighters">Fighters</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function FeaturedFights() {
  return (
    <section className="w-full space-y-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="w-16 h-1 bg-red-700 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Fights</h2>
        </div>
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-white"
        >
          <Link href="/fights" className="flex items-center gap-2">
            View all <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <FightList />
    </section>
  )
}

function FeaturedFightersSection() {
  return (
    <section className="w-full space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="w-16 h-1 bg-red-700 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Fighters
          </h2>
        </div>
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-white"
        >
          <Link href="/fighters" className="flex items-center gap-2">
            View all <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <FighterList />
    </section>
  )
}

async function UpcomingEventsSection() {
  return (
    <section className="w-full space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="w-16 h-1 bg-red-700 mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Upcoming events
          </h2>
        </div>
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-white"
        >
          <Link href="/events" className="flex items-center gap-2">
            View all <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <EventList />
        </CardContent>
      </Card>
    </section>
  )
}
