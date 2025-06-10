import Image from "next/image"
import React, { Suspense } from "react"
import ReactCountryFlag from "react-country-flag"
import { notFound } from "next/navigation"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { getFighterFavorite } from "@/features/fighters/server/db/getFighterFavorite"
import { FavoriteButton } from "@/features/fighters/components/FavoriteButton"
import { getFighterById } from "@/features/fighters/server/db/getFighterById"
import { UserIcon } from "lucide-react"
import Link from "next/link"

function StatCard({
  title,
  value,
  suffix = "",
}: {
  title: string
  value: string | number
  suffix?: string
}) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-red-950/30">
      <h3 className="text-lg font-medium text-gray-400">{title}</h3>
      <p className="text-3xl font-bold mt-2">
        {value}
        {suffix && <span className="text-xl ml-1 text-gray-400">{suffix}</span>}
      </p>
    </div>
  )
}

export default async function FighterProfilePage({
  params,
}: {
  params: Promise<{ fighterId: string }>
}) {
  const { fighterId } = await params
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0c0101] to-[#150202] text-white">
      <Suspense fallback={<FighterHeaderSkeleton />}>
        <FighterHeader fighterId={fighterId} />
      </Suspense>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <Suspense fallback={<FighterInfoSkeleton />}>
          <FighterInfo fighterId={fighterId} />
        </Suspense>
        <Suspense fallback={<FighterFightsSkeleton />}>
          <FighterFights fighterId={fighterId} />
        </Suspense>
      </div>
    </div>
  )
}

async function FighterHeader({ fighterId }: { fighterId: string }) {
  const fighter = await getFighterById(fighterId)
  if (fighter == null) return notFound()

  const user = await getCurrentUser()
  const isFavorite =
    user != null ? !!(await getFighterFavorite(user.id, fighterId)) : false

  return (
    <div className="relative h-[400px] bg-gradient-to-br from-black via-red-950 to-black">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 h-full flex items-end justify-between pb-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              {fighter.name}
            </h1>
            {user != null ? (
              <FavoriteButton fighterId={fighterId} isFavorite={isFavorite} />
            ) : (
              <Link
                href={`/login?redirectTo=${encodeURIComponent(`/fighters/${fighterId}`)}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-black/30 backdrop-blur-sm rounded-lg border border-red-950/30 hover:bg-black/40 transition-colors gap-2"
              >
                <UserIcon className="h-5 w-5" />
                Login to favorite
              </Link>
            )}
          </div>
          {fighter.nickname && (
            <p className="text-2xl text-red-400 font-medium">
              {fighter.nickname}
            </p>
          )}
          <div className="flex items-center mt-2 space-x-4">
            {fighter.countryCode && (
              <ReactCountryFlag
                countryCode={fighter.countryCode}
                svg
                className="h-7 w-7 rounded-full shadow-lg ring-2 ring-red-500/20"
              />
            )}
          </div>
        </div>
        <div className="relative w-56 h-56">
          <Image
            src={fighter.imageUrl || "/imgs/logo.webp"}
            alt={fighter.name}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  )
}

async function FighterInfo({ fighterId }: { fighterId: string }) {
  const fighter = await getFighterById(fighterId)
  if (!fighter) return notFound()

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-xl shadow-xl p-8 border border-red-950/30 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <StatCard
            title="Height"
            value={fighter.height ? `${fighter.height} cm` : "-"}
          />
          <StatCard
            title="Weight"
            value={fighter.weight ? `${fighter.weight} kg` : "-"}
          />
          <StatCard
            title="Reach"
            value={fighter.reach ? `${fighter.reach} cm` : "-"}
          />
          <StatCard title="Stance" value={fighter.stance || "-"} />
        </div>
        <div className="space-y-4">
          <StatCard title="Gender" value={fighter.gender} />
          <StatCard title="Status" value={fighter.status} />
          {fighter.description && (
            <StatCard title="Description" value={fighter.description} />
          )}
        </div>
      </div>
    </div>
  )
}

function FighterFightsSkeleton() {
  return (
    <div className="mt-12 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-red-950/30 animate-pulse h-20"
        />
      ))}
    </div>
  )
}

async function FighterFights({ fighterId }: { fighterId: string }) {
  const fighter = await getFighterById(fighterId)
  if (
    !fighter ||
    !fighter.fightParticipations ||
    fighter.fightParticipations.length === 0
  ) {
    return (
      <div className="mt-12 text-center text-gray-400 italic">
        No previous fights found.
      </div>
    )
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Previous Fights</h2>
      <div className="space-y-4">
        {fighter.fightParticipations.map((fp: any, idx: number) => (
          <div
            key={idx}
            className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-red-950/30 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-bold text-lg text-white mb-1">
                {fp.fight?.event?.promotion || "Event"}
              </div>
              <div className="text-gray-400 text-sm mb-1">
                Result:{" "}
                <span className="font-semibold text-white">{fp.result}</span>
              </div>
            </div>
            {fp.fight?.id && (
              <a
                href={`/fights/${fp.fight.id}`}
                className="mt-2 md:mt-0 inline-block bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all"
              >
                View Fight
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function FighterHeaderSkeleton() {
  return (
    <div className="bg-gradient-to-br from-black via-red-950 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="w-[220px] h-[220px] bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <div className="h-12 w-3/4 bg-gray-800 rounded animate-pulse mb-4"></div>
            <div className="h-8 w-1/2 bg-gray-800 rounded animate-pulse mb-6"></div>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="h-10 w-32 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-10 w-48 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-48 bg-gray-800 rounded animate-pulse mb-6"></div>
            <div className="h-12 w-32 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FighterInfoSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-xl shadow-xl p-8 border border-red-950/30 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-16 bg-gray-800 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
