export function VenueInfoSkeleton() {
  return (
    <>
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-xl border border-red-950/30 p-8">
            <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="h-12 w-full bg-gray-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl shadow-xl border border-red-950/30 p-8">
          <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800/20 rounded-lg p-6">
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 w-32 bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
