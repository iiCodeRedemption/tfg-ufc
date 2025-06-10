import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export function ProfileInfoSkeleton() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg">
      <div>
        <p className="text-sm font-medium text-gray-400">Email</p>
        <Skeleton className="h-6 w-48 bg-[#333]" />
      </div>
      <Skeleton className="h-10 w-10 rounded-full bg-[#333]" />
    </div>
  )
}

export function DangerZoneSkeleton() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-red-900/30">
      <div>
        <p className="font-medium text-white">Delete Account</p>
        <p className="text-sm text-gray-400">
          Permanently delete your account and all associated data
        </p>
      </div>
      <Skeleton className="h-10 w-32 bg-red-900/30" />
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <>
      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden mb-8">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardHeader className="pb-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white">
              Profile Information
            </h2>
            <p className="text-sm text-gray-400">Update your account details</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <ProfileInfoSkeleton />
          <div className="h-px w-full bg-gray-800" />
          <ProfileFormSkeleton />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800"></div>
        <CardHeader className="pb-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white">Danger Zone</h2>
            <p className="text-sm text-gray-400">
              Irreversible account actions
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <DangerZoneSkeleton />
        </CardContent>
      </Card>
    </>
  )
}
