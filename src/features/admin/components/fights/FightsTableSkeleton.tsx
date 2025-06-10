export function FightsTableSkeleton() {
  return (
    <div className="rounded-md border border-gray-800 overflow-hidden">
      <div className="w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="border-b border-gray-800">
            <tr className="border-b transition-colors hover:bg-gray-800/50">
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Event
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Fighters
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Type
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Result
              </th>
              <th className="h-10 px-4 text-left align-middle font-medium text-gray-300 bg-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {Array.from({ length: 3 }).map((_, index) => (
              <tr
                key={index}
                className="border-b transition-colors hover:bg-gray-800/50"
              >
                <td className="p-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-32 bg-gray-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                    <div className="h-5 w-12 bg-gray-800 rounded-full animate-pulse mt-1" />
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-800 animate-pulse" />
                      <div className="flex flex-col gap-1">
                        <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                        <div className="h-3 w-14 bg-gray-800 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-4 w-6 bg-gray-800 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-800 animate-pulse" />
                      <div className="flex flex-col gap-1">
                        <div className="h-4 w-20 bg-gray-800 rounded animate-pulse" />
                        <div className="h-3 w-14 bg-gray-800 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="h-5 w-20 bg-gray-800 rounded-full animate-pulse" />
                  <div className="h-3 w-16 bg-gray-800 rounded animate-pulse mt-2" />
                </td>
                <td className="p-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <div className="h-8 w-8 bg-gray-800 rounded animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
