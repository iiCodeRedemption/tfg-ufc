export function FighterGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative h-[320px] overflow-hidden rounded-lg border-0 bg-gradient-to-br from-gray-900 to-black hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/20 z-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          <div className="absolute inset-0 z-0 bg-gray-800 animate-pulse opacity-40" />

          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-red-800 z-20" />

          <div className="absolute top-4 left-4 z-20">
            <div className="h-7 w-16 bg-gradient-to-r from-red-700 to-red-900 rounded animate-pulse" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 space-y-2">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-4 bg-gray-700 rounded-sm animate-pulse" />
              <div className="h-6 w-28 bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="h-4 w-20 bg-red-400 animate-pulse rounded" />

            <div className="pt-2 flex items-center justify-between">
              <div className="h-5 w-16 bg-gray-300 animate-pulse rounded" />
              <div className="h-6 w-14 bg-gradient-to-r from-green-600 to-green-800 animate-pulse rounded" />
            </div>

            <div className="pt-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-3" />
              <div className="h-6 w-full bg-red-700 animate-pulse rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
