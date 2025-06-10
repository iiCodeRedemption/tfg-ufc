export function FightCardSkeleton() {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-xl border border-red-950/30 p-8">
      <div className="flex items-center mb-6">
        <div className="h-6 w-6 bg-gray-800 rounded animate-pulse mr-2"></div>
        <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
        <div className="ml-4 h-6 w-24 bg-gray-800 rounded-full animate-pulse"></div>
        <div className="ml-4 h-6 w-20 bg-gray-800 rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800/50 rounded-lg p-6 animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-32 bg-gray-700 rounded"></div>
              <div className="h-6 w-24 bg-gray-700 rounded"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                  <div className="h-4 w-24 bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="h-8 w-16 bg-gray-700 rounded"></div>
              <div className="flex items-center gap-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-700 rounded"></div>
                  <div className="h-4 w-24 bg-gray-700 rounded"></div>
                </div>
                <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
