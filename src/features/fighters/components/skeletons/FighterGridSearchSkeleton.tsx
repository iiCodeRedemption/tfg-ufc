import { FighterGridSkeleton } from "@/features/fighters/components/skeletons/FighterGridSkeleton"

export function FighterGridSearchSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] border-2 border-red-700 shadow-lg shadow-red-900/20 rounded-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-red-600 via-red-800 to-red-700"></div>
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="w-32 h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
              <div className="w-full h-12 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div>
              <div className="w-24 h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
              <div className="w-full h-12 bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="w-24 h-6 bg-gray-800 rounded mb-2 animate-pulse"></div>
                <div className="w-full h-12 bg-gray-800 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-red-700/20">
            <div className="w-48 h-4 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <FighterGridSkeleton count={6} />
    </div>
  )
}
