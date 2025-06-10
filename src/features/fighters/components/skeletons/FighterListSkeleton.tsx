export function FighterListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      ))}
    </div>
  )
}
