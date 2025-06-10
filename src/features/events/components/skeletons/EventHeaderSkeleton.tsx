export function EventHeaderSkeleton() {
  return (
    <div className="bg-gradient-to-br from-black via-red-950 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="w-[300px] h-[300px] bg-gray-800 rounded-lg animate-pulse"></div>
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
