import {
  Fight,
  Fighter as PrismaFighter,
  FightMethod,
  FightResult,
  FightStatistics,
  Event,
  FightType,
} from "@prisma/client"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import ReactCountryFlag from "react-country-flag"
import {
  Calendar,
  Clock,
  MapPin,
  Award,
  Zap,
  ExternalLink,
  BarChart2,
  Locate,
  Activity,
  Sword,
  Shield,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate, formatTime } from "@/lib/formatters"
import { FightHeaderSkeleton } from "@/features/fights/components/skeletons/FightHeaderSkeleton"
import { FightDetailsSkeleton } from "@/features/fights/components/skeletons/FightDetailsSkeleton"
import { computeFighterRecord } from "@/features/fighters/utils/computeFightRecord"
import Link from "next/link"
import { getFightById } from "@/features/fights/server/db/getFightById"
import { getWeightClassName } from "@/features/fighters/utils/weightClassUtils"

type Fighter = Partial<PrismaFighter> & {
  id: string
  name: string
  nickname: string | null
  imageUrl: string
  countryCode: string
  fightParticipations?: Array<{
    result: FightResult
    fight: FightWithParticipants
  }>
  fightsAsFighter: Array<{
    participants?: Array<{
      fighterId: string
      result: FightResult
    }>
  }>
  fightsAsOpponent: Array<{
    participants?: Array<{
      fighterId: string
      result: FightResult
    }>
  }>
  ufcDetails?: {
    id: string
    isP4P: boolean
    titleWins: number
    titleLosses: number
    fighterId: string
  } | null
  rizinDetails?: {
    id: string
    gym: string | null
    city: string | null
    debutYear: number | null
    fighterId: string
  } | null
  oneDetails?: {
    id: string
    birthLat: number | null
    birthLong: number | null
    fightingStyle: string | null
    fighterId: string
  } | null
}

type FightWithRelations = Fight & {
  fighter1: Fighter
  fighter2: Fighter
  event: Event | null
  statistics: FightStatistics | null
}

type FightWithParticipants = Fight & {
  id: string
  method: FightMethod
  fighter1?: {
    id: string
    name: string
  }
  fighter2?: {
    id: string
    name: string
  }
  date?: Date
  statistics?: FightStatistics | null
}

export default async function FightPage({
  params,
}: {
  params: Promise<{ fightId: string }>
}) {
  const { fightId } = await params

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0c0101] to-[#150202] text-white pb-20">
      <Suspense fallback={<FightHeaderSkeleton />}>
        <FightHeaderWrapper fightId={fightId} />
      </Suspense>

      <Suspense fallback={<FightDetailsSkeleton />}>
        <FightDetailsWrapper fightId={fightId} />
      </Suspense>
    </main>
  )
}

async function FightHeaderWrapper({ fightId }: { fightId: string }) {
  const fight = await getFightById(fightId)
  if (fight == null) return notFound()

  return (
    <FightHeader
      fight={fight}
      fighter1={fight.fighter1}
      fighter2={fight.fighter2}
      event={fight.event}
    />
  )
}

async function FightDetailsWrapper({ fightId }: { fightId: string }) {
  const fight = await getFightById(fightId)
  if (fight == null) return notFound()

  return (
    <FightDetails
      fight={fight}
      fighter1={fight.fighter1}
      fighter2={fight.fighter2}
      statistics={fight.statistics}
    />
  )
}

function FightHeader({
  fight,
  fighter1,
  fighter2,
  event,
}: {
  fight: FightWithRelations
  fighter1: Fighter
  fighter2: Fighter
  event: Event | null
}) {
  const weightClass = getWeightClassName(
    Math.max(fighter1.weight || 0, fighter2.weight || 0),
  )

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[url('/imgs/logo.webp')] bg-cover bg-center opacity-40"></div>

      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="w-20 h-1.5 bg-red-700 mb-6"></div>
          {fight.fightType === FightType.MAIN_EVENT && (
            <p className="text-xl text-red-600 font-bold mb-2">MAIN EVENT</p>
          )}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            {fighter1.name} vs {fighter2.name}
          </h1>
          <div className="flex flex-wrap items-center space-x-6 text-lg mb-8">
            {event != null && (
              <>
                <EventDetail
                  icon={<Calendar className="w-5 h-5 mr-2" />}
                  text={formatDate(event.date)}
                />
                <EventDetail
                  icon={<Clock className="w-5 h-5 mr-2" />}
                  text={formatTime(event.date)}
                />
                {event.location && (
                  <Link
                    href={`/events/${event.id}`}
                    className="hover:underline"
                  >
                    <EventDetail
                      icon={<MapPin className="w-5 h-5 mr-2" />}
                      text={event.location}
                    />
                  </Link>
                )}
              </>
            )}
          </div>
          <FightBadges
            weightClass={weightClass}
            isTitleFight={fight.championshipFight}
            rounds={fight.rounds}
          />
        </div>
      </div>
    </section>
  )
}

function EventDetail({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center">
      {icon}
      <span className="text-gray-300">{text}</span>
    </div>
  )
}

function FightBadges({
  weightClass,
  isTitleFight,
  rounds,
}: {
  weightClass: string
  isTitleFight: boolean
  rounds: number
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <span className="bg-red-700 px-4 py-1 rounded-full text-lg font-bold">
        {weightClass}
      </span>
      {isTitleFight && (
        <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 px-4 py-1 rounded-full text-lg font-bold uppercase">
          Title Fight
        </span>
      )}
      <span className="bg-gray-800 px-4 py-1 rounded-full text-lg font-bold">
        {rounds} Rounds
      </span>
    </div>
  )
}

function FightDetails({
  fight,
  fighter1,
  fighter2,
  statistics,
}: {
  fight: FightWithRelations
  fighter1: Fighter
  fighter2: Fighter
  statistics: FightStatistics | null
}) {
  return (
    <div className="container mx-auto px-4 -mt-10">
      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <FightersComparison
            fighter1={fighter1}
            fighter2={fighter2}
            fight={fight}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div>
              <div className="w-16 h-1 bg-red-700 mb-4"></div>
              <h3 className="text-2xl font-bold mb-6">Tale of the Tape</h3>
              <TaleOfTheTape fighter1={fighter1} fighter2={fighter2} />
            </div>

            <div>
              <div className="w-16 h-1 bg-red-700 mb-4"></div>
              <h3 className="text-2xl font-bold mb-6">Fight Stats</h3>
              <FightStats statistics={statistics} />
              <LastFightResults
                fighter1={fighter1}
                fighter2={fighter2}
                fight={fight}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type FightOdds = {
  favorite: string
  favoriteOdds: string
  underdogOdds: string
}

function FightersComparison({
  fighter1,
  fighter2,
  fight,
}: {
  fighter1: Fighter
  fighter2: Fighter
  fight: FightWithRelations
}) {
  const hasWinner = !!fight.winnerId
  const odds: FightOdds = hasWinner
    ? {
        favorite:
          fight.winnerId === fighter1.id ? fighter1.name : fighter2.name,
        favoriteOdds: "-150",
        underdogOdds: "+125",
      }
    : {
        favorite: fighter1.name,
        favoriteOdds: "-110",
        underdogOdds: "+110",
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <FighterCard
        fighter={{
          ...fighter1,
          color: "red",
        }}
      />
      <VersusSection
        fighters={[
          { ...fighter1, color: "red" },
          { ...fighter2, color: "blue" },
        ]}
        odds={odds}
      />
      <FighterCard
        fighter={{
          ...fighter2,
          color: "blue",
        }}
      />
    </div>
  )
}

function FighterCard({ fighter }: { fighter: Fighter & { color: string } }) {
  const { name, nickname, imageUrl, countryCode, color } = fighter

  const record = computeFighterRecord(fighter)
  const recordStr = `${record.wins}-${record.losses}-${record.draws}`

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-48 h-48 rounded-full bg-gradient-to-br from-${color}-700 to-${color}-900 mb-6 flex items-center justify-center overflow-hidden border-4 ${
          color === "red" ? "border-red-600" : "border-blue-600"
        }`}
      >
        <Image
          src={imageUrl || `/imgs/logo.webp`}
          alt={name}
          width={200}
          height={200}
          className="object-cover"
        />
      </div>
      <h2 className="text-3xl font-bold mb-1">{name}</h2>
      <div className="flex items-center gap-2 mb-2">
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          className="w-6 h-6 rounded-full shadow-lg"
        />
        <span className="text-gray-400">{nickname || ""}</span>
      </div>
      <div
        className={`text-lg font-bold px-4 py-1 rounded-full ${
          color === "red" ? "bg-red-700" : "bg-blue-700"
        }`}
      >
        {recordStr}
      </div>
    </div>
  )
}

function VersusSection({
  fighters,
  odds,
}: {
  fighters: (Fighter & { color: string })[]
  odds: FightOdds
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-6xl font-bold text-red-600 mb-6">VS</div>
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 p-4 rounded-lg shadow-lg w-full">
        <CardContent className="p-4">
          <p className="text-center text-lg font-bold mb-2">FIGHT ODDS</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-gray-400 mb-1">{fighters[0].name}</p>
              <span
                className={
                  fighters[0].name === odds.favorite
                    ? "text-green-500 font-bold text-xl"
                    : "text-red-500 font-bold text-xl"
                }
              >
                {fighters[0].name === odds.favorite
                  ? odds.favoriteOdds
                  : odds.underdogOdds}
              </span>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-1">{fighters[1].name}</p>
              <span
                className={
                  fighters[1].name === odds.favorite
                    ? "text-green-500 font-bold text-xl"
                    : "text-red-500 font-bold text-xl"
                }
              >
                {fighters[1].name === odds.favorite
                  ? odds.favoriteOdds
                  : odds.underdogOdds}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TaleOfTheTape({
  fighter1,
  fighter2,
}: {
  fighter1: Fighter
  fighter2: Fighter
}) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
      <CardContent className="p-6">
        <ComparisonRow
          label="Height"
          value1={fighter1.height ? `${fighter1.height} cm` : "N/A"}
          value2={fighter2.height ? `${fighter2.height} cm` : "N/A"}
        />
        <ComparisonRow
          label="Weight"
          value1={fighter1.weight ? `${fighter1.weight} kg` : "N/A"}
          value2={fighter2.weight ? `${fighter2.weight} kg` : "N/A"}
        />
        <ComparisonRow
          label="Reach"
          value1={fighter1.reach ? `${fighter1.reach} cm` : "N/A"}
          value2={fighter2.reach ? `${fighter2.reach} cm` : "N/A"}
        />
        <ComparisonRow
          label="Stance"
          value1={fighter1.stance || "N/A"}
          value2={fighter2.stance || "N/A"}
        />
      </CardContent>
    </Card>
  )
}

function hasRealStats(statistics: FightStatistics | null): boolean {
  if (statistics == null) return false
  return Object.values(statistics).some((value) => value !== 0)
}

function FightStats({ statistics }: { statistics: FightStatistics | null }) {
  const hasStats = hasRealStats(statistics)
  const stats = statistics || {
    totalStrikes1: 0,
    totalStrikes2: 0,
    sigStrikes1: 0,
    sigStrikes2: 0,
    takedowns1: 0,
    takedowns2: 0,
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 mb-8">
      <CardContent className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-300">Fight Stats</h3>
          {!hasStats && (
            <span className="text-xs text-gray-500 italic">
              No official statistics recorded for this fight
            </span>
          )}
        </div>

        <ComparisonRow
          label="Total Strikes"
          value1={stats.totalStrikes1}
          value2={stats.totalStrikes2}
          hasStats={hasStats}
        />
        <ComparisonRow
          label="Significant Strikes"
          value1={stats.sigStrikes1}
          value2={stats.sigStrikes2}
          hasStats={hasStats}
        />
        <ComparisonRow
          label="Takedowns"
          value1={stats.takedowns1}
          value2={stats.takedowns2}
          hasStats={hasStats}
        />
        {hasStats && statistics?.knockdowns1 !== undefined && (
          <ComparisonRow
            label="Knockdowns"
            value1={statistics.knockdowns1}
            value2={statistics.knockdowns2}
            hasStats={true}
          />
        )}
        {hasStats && statistics?.submissionAttempts1 !== undefined && (
          <ComparisonRow
            label="Submission Attempts"
            value1={statistics.submissionAttempts1}
            value2={statistics.submissionAttempts2}
            hasStats={true}
          />
        )}
      </CardContent>
    </Card>
  )
}

function ComparisonRow({
  label,
  value1,
  value2,
  hasStats = true,
}: {
  label: string
  value1: string | number | null | undefined
  value2: string | number | null | undefined
  hasStats?: boolean
}) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4 text-center items-center">
      <div className="text-right font-bold text-red-600">
        {hasStats ? value1 || "0" : "N/A"}
      </div>
      <div className="text-gray-400">{label}</div>
      <div className="text-left font-bold text-blue-600">
        {hasStats ? value2 || "0" : "N/A"}
      </div>
    </div>
  )
}

function LastFightResults({
  fighter1,
  fighter2,
  fight,
}: {
  fighter1: Fighter
  fighter2: Fighter
  fight: FightWithRelations
}) {
  const fighter1PrevFights =
    fighter1.fightParticipations?.filter((fp) => fp.fight.id !== fight.id) || []

  const fighter2PrevFights =
    fighter2.fightParticipations?.filter((fp) => fp.fight.id !== fight.id) || []

  if (fighter1PrevFights.length > 0) {
    console.log("Fighter1 previous fight example:", {
      id: fighter1PrevFights[0].fight.id,
      hasStatistics: !!fighter1PrevFights[0].fight.statistics,
      stats: fighter1PrevFights[0].fight.statistics,
    })
  }

  const fighter1PrevFightsData = fighter1PrevFights.map((fp) => {
    const wasFighter1 = fp.fight.fighter1?.id === fighter1.id

    const stats = fp.fight.statistics
      ? {
          totalStrikes: wasFighter1
            ? fp.fight.statistics.totalStrikes1
            : fp.fight.statistics.totalStrikes2,
          sigStrikes: wasFighter1
            ? fp.fight.statistics.sigStrikes1
            : fp.fight.statistics.sigStrikes2,
          takedowns: wasFighter1
            ? fp.fight.statistics.takedowns1
            : fp.fight.statistics.takedowns2,
          knockdowns: wasFighter1
            ? fp.fight.statistics.knockdowns1
            : fp.fight.statistics.knockdowns2,
          submissionAttempts: wasFighter1
            ? fp.fight.statistics.submissionAttempts1
            : fp.fight.statistics.submissionAttempts2,
          reversals: wasFighter1
            ? fp.fight.statistics.reversals1
            : fp.fight.statistics.reversals2,
        }
      : null

    return {
      result: fp.result,
      opponent: getOpponentName(fp.fight, fighter1.id),
      method: fp.fight.method,
      date: fp.fight.date,
      fightId: fp.fight.id,
      fighter: fighter1.name,
      fighterId: fighter1.id,
      wasFighter1,
      stats,
    }
  })

  const fighter2PrevFightsData = fighter2PrevFights.map((fp) => {
    const wasFighter1 = fp.fight.fighter1?.id === fighter2.id

    const stats = fp.fight.statistics
      ? {
          totalStrikes: wasFighter1
            ? fp.fight.statistics.totalStrikes1
            : fp.fight.statistics.totalStrikes2,
          sigStrikes: wasFighter1
            ? fp.fight.statistics.sigStrikes1
            : fp.fight.statistics.sigStrikes2,
          takedowns: wasFighter1
            ? fp.fight.statistics.takedowns1
            : fp.fight.statistics.takedowns2,
          knockdowns: wasFighter1
            ? fp.fight.statistics.knockdowns1
            : fp.fight.statistics.knockdowns2,
          submissionAttempts: wasFighter1
            ? fp.fight.statistics.submissionAttempts1
            : fp.fight.statistics.submissionAttempts2,
          reversals: wasFighter1
            ? fp.fight.statistics.reversals1
            : fp.fight.statistics.reversals2,
        }
      : null

    return {
      result: fp.result,
      opponent: getOpponentName(fp.fight, fighter2.id),
      method: fp.fight.method,
      date: fp.fight.date,
      fightId: fp.fight.id,
      fighter: fighter2.name,
      fighterId: fighter2.id,
      wasFighter1,
      stats,
    }
  })

  const allPrevFights = [...fighter1PrevFightsData, ...fighter2PrevFightsData]

  const uniqueFightIds = new Set()
  const uniquePrevFights = allPrevFights.filter((fight) => {
    if (uniqueFightIds.has(fight.fightId)) {
      return false
    }
    uniqueFightIds.add(fight.fightId)
    return true
  })

  function getOpponentName(
    prevFight: FightWithParticipants,
    currentFighterId: string,
  ) {
    if (prevFight.fighter1?.id === currentFighterId) {
      return prevFight.fighter2?.name || "Unknown Opponent"
    } else {
      return prevFight.fighter1?.name || "Unknown Opponent"
    }
  }

  if (uniquePrevFights.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-red-600" />
          Previous Fight Results
        </h3>
        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400">
              No previous fight data available between these fighters
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-red-600" />
        Previous Fights Between These Fighters
      </h3>
      <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-4">
            {uniquePrevFights.map((prevFight, index) => {
              const color = prevFight.fighterId === fighter1.id ? "red" : "blue"

              return (
                <div
                  key={prevFight.fightId || index}
                  className={
                    prevFight.fighterId === fighter1.id
                      ? "border-l-4 border-red-600 pl-4"
                      : "border-l-4 border-blue-600 pl-4"
                  }
                >
                  <LastFightCard
                    lastFight={prevFight}
                    color={color}
                    fighterName={prevFight.fighter}
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LastFightCard({
  lastFight,
  color,
  fighterName,
}: {
  lastFight: {
    result: FightResult
    opponent: string
    method: FightMethod | string
    date?: Date
    fightId: string
    fighter: string
    fighterId: string
    wasFighter1?: boolean
    stats?: {
      totalStrikes?: number
      sigStrikes?: number
      takedowns?: number
      knockdowns?: number
      submissionAttempts?: number
      reversals?: number
    } | null
  }
  color: string
  fighterName: string
}) {
  if (!lastFight) {
    return (
      <div className="p-2">
        <span className="text-gray-500">No previous fights</span>
      </div>
    )
  }

  const { result, opponent, method, date, fightId, stats } = lastFight

  const methodText =
    typeof method === "string"
      ? method
      : method === FightMethod.KO_TKO
        ? "KO/TKO"
        : method === FightMethod.SUBMISSION
          ? "Submission"
          : method === FightMethod.DECISION
            ? "Decision"
            : String(method)

  const resultConfig = {
    [FightResult.WIN]: {
      badgeColor: "bg-green-700",
      textColor: "text-green-500",
      label: "WIN",
      icon: <Award className="w-4 h-4 mr-1" />,
    },
    [FightResult.LOSS]: {
      badgeColor: "bg-red-700",
      textColor: "text-red-500",
      label: "LOSS",
      icon: <Shield className="w-4 h-4 mr-1" />,
    },
    [FightResult.DRAW]: {
      badgeColor: "bg-yellow-700",
      textColor: "text-yellow-500",
      label: "DRAW",
      icon: <Activity className="w-4 h-4 mr-1" />,
    },
    [FightResult.NO_CONTEST]: {
      badgeColor: "bg-gray-700",
      textColor: "text-gray-400",
      label: "NO CONTEST",
      icon: <Locate className="w-4 h-4 mr-1" />,
    },
  }

  const resultStyle =
    resultConfig[result] || resultConfig[FightResult.NO_CONTEST]

  let outcomeText = ""
  if (result === FightResult.WIN) {
    outcomeText = `${fighterName} defeated ${opponent}`
  } else if (result === FightResult.LOSS) {
    outcomeText = `${opponent} defeated ${fighterName}`
  } else if (result === FightResult.DRAW) {
    outcomeText = `${fighterName} drew with ${opponent}`
  } else {
    outcomeText = `${fighterName} vs ${opponent} (No Contest)`
  }

  const hasStats =
    (stats &&
      ((stats.totalStrikes && stats.totalStrikes > 0) ||
        (stats.sigStrikes && stats.sigStrikes > 0) ||
        (stats.takedowns && stats.takedowns > 0) ||
        (stats.knockdowns && stats.knockdowns > 0))) ||
    (stats?.reversals && stats.reversals > 0) ||
    (stats?.submissionAttempts && stats.submissionAttempts > 0)

  const fightStats = {
    totalStrikes: hasStats && stats?.totalStrikes ? stats.totalStrikes : "N/A",
    sigStrikes: hasStats && stats?.sigStrikes ? stats.sigStrikes : "N/A",
    takedowns: hasStats && stats?.takedowns ? stats.takedowns : "N/A",
    knockdowns: hasStats && stats?.knockdowns ? stats.knockdowns : "N/A",
    submissionAttempts:
      hasStats && stats?.submissionAttempts ? stats.submissionAttempts : "N/A",
    reversals: hasStats && stats?.reversals ? stats.reversals : "N/A",
  }

  return (
    <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-gray-600">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <span
              className={`${resultStyle.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center`}
            >
              {resultStyle.icon}
              {fighterName}&apos;s {resultStyle.label}
            </span>
          </div>
          {date && (
            <div className="flex items-center text-gray-400 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(date)}
            </div>
          )}
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-lg mb-2">{outcomeText}</h4>
          <div className="flex items-center gap-2 mb-1">
            <Sword
              className={`w-4 h-4 ${
                color === "red" ? "text-red-500" : "text-blue-500"
              }`}
            />
            <span
              className={`font-medium ${
                color === "red" ? "text-red-500" : "text-blue-500"
              }`}
            >
              via {methodText}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-900/50 rounded-md p-2 text-sm">
          <div className="flex items-center gap-1 text-gray-300">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span>Total Strikes:</span>
            <span className="font-bold">{fightStats.totalStrikes}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <BarChart2 className="w-3 h-3 text-blue-400" />
            <span>Sig. Strikes:</span>
            <span className="font-bold">{fightStats.sigStrikes}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <Activity className="w-3 h-3 text-green-400" />
            <span>Takedowns:</span>
            <span className="font-bold">{fightStats.takedowns}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <Shield className="w-3 h-3 text-red-400" />
            <span>Knockdowns:</span>
            <span className="font-bold">{fightStats.knockdowns}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <Locate className="w-3 h-3 text-yellow-400" />
            <span>Submission Attempts:</span>
            <span className="font-bold">{fightStats.submissionAttempts}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <Activity className="w-3 h-3 text-green-400" />
            <span>Reversals:</span>
            <span className="font-bold">{fightStats.reversals}</span>
          </div>
        </div>

        <Link
          href={`/fights/${fightId}`}
          className={`flex items-center justify-center gap-1 ${
            color === "red" ? "bg-red-800" : "bg-blue-800"
          } hover:opacity-90 transition-opacity text-white rounded-md px-3 py-1.5 w-full text-sm font-medium`}
        >
          <ExternalLink className="w-3 h-3" />
          View
        </Link>
      </CardContent>
    </Card>
  )
}
