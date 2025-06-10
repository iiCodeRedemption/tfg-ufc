export function EventGridSkeleton({
  count = 6,
  direction = "row",
}: {
  count?: number
  direction?: "row" | "column"
}) {
  return (
    <div
      className={`grid gap-8 ${
        direction === "row" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
        >
          <div className="bg-gray-900 overflow-hidden border-0 shadow-xl">
            <div className="h-3 bg-gray-800"></div>
            <div className="relative">
              <div className="absolute top-0 right-0">
                <div className="w-24 h-24 bg-gray-800 rotate-45 translate-x-10 -translate-y-10 opacity-90"></div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-800 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="flex-grow space-y-4">
                    <div className="h-8 w-3/4 bg-gray-800 rounded animate-pulse"></div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-800 animate-pulse"></div>
                        <div className="h-5 w-32 bg-gray-800 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-800 animate-pulse"></div>
                        <div className="h-5 w-24 bg-gray-800 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-10 w-32 bg-gray-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
