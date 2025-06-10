import { Skeleton } from "@/components/ui/skeleton"

export function FightHeaderSkeleton() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[url('/imgs/logo.webp')] bg-cover bg-center opacity-40"></div>

      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <div className="w-20 h-1.5 bg-red-700 mb-6"></div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-16 w-full mb-6" />

          <div className="flex flex-wrap items-center space-x-6 text-lg mb-8">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-48" />
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <Skeleton className="h-8 w-36 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
