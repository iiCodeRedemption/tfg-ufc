import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FighterCardSkeleton } from "@/features/fights/components/skeletons/FightCardSkeleton"

export function FightDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 -mt-10">
      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FighterCardSkeleton />
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-16 w-16 mb-6" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
            <FighterCardSkeleton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div>
              <div className="w-16 h-1 bg-red-700 mb-4"></div>
              <h3 className="text-2xl font-bold mb-6">Tale of the Tape</h3>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                <CardContent className="p-6">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 gap-4 mb-4 text-center items-center"
                      >
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="w-16 h-1 bg-red-700 mb-4"></div>
              <h3 className="text-2xl font-bold mb-6">Fight Stats</h3>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 mb-8">
                <CardContent className="p-6">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-3 gap-4 mb-4 text-center items-center"
                      >
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ))}
                </CardContent>
              </Card>

              <h3 className="text-xl font-bold mb-4">Last Fight Results</h3>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 text-center">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
