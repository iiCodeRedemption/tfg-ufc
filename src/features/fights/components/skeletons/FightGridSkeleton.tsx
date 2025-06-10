import { Card } from "@/components/ui/card"

export function FightGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card
          key={i}
          className="relative h-[280px] overflow-hidden rounded-lg border-0 bg-gradient-to-br from-gray-900 to-black animate-pulse"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 to-red-800"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center gap-8">
              <div className="text-right">
                <div className="w-24 h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="w-16 h-1 bg-gray-800 rounded ml-auto animate-pulse"></div>
              </div>

              <div className="w-16 h-8 bg-gray-800 rounded-lg animate-pulse"></div>

              <div className="text-left">
                <div className="w-24 h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="w-16 h-1 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 flex">
            <div className="w-1/2 h-full bg-gray-800 animate-pulse"></div>
            <div className="w-1/2 h-full bg-gray-800 animate-pulse"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="w-full h-[1px] bg-gray-800 mb-3 animate-pulse"></div>
            <div className="w-full h-10 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </Card>
      ))}
    </div>
  )
}
