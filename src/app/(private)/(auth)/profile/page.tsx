import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { EditProfileForm } from "@/features/auth/components/forms/EditProfileForm"
import { DeleteAccountButton } from "@/features/auth/components/DeleteAccountButton"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { Suspense } from "react"
import {
  ProfileInfoSkeleton,
  ProfileFormSkeleton,
  DangerZoneSkeleton,
} from "@/features/auth/components/skeletons/ProfileSkeleton"
import { User } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] text-white px-4 py-16">
      <div className="w-full max-w-2xl">
        <ProfileHeader />
        <Suspense fallback={<ProfileCards user={null} isLoading={true} />}>
          <ProfileData />
        </Suspense>
      </div>
    </div>
  )
}

function ProfileHeader() {
  return (
    <div className="mb-10 flex flex-col gap-2">
      <div className="w-16 h-1 bg-red-700 mb-2" />
      <h1 className="text-3xl md:text-4xl font-bold text-white">My Profile</h1>
      <p className="text-gray-400">
        Manage your account settings and preferences
      </p>
    </div>
  )
}

function ProfileInfo({ user }: { user: User }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg">
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-400">Email</p>
        <p className="text-white font-medium">{user.email}</p>
        {canAccessAdmin(user) && (
          <div className="flex items-center gap-1.5 mt-2">
            <Badge
              variant="outline"
              className="bg-red-900/20 border-red-800 text-red-400 hover:bg-red-900/30"
            >
              <Shield size={14} className="mr-1" />
              Admin
            </Badge>
          </div>
        )}
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d20a0a] text-white text-lg font-bold uppercase">
        {user.username?.[0] || user.email?.[0] || "U"}
      </div>
    </div>
  )
}

function DangerZone({ user }: { user: User }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-red-900/30">
      <div>
        <p className="font-medium text-white">Delete Account</p>
        <p className="text-sm text-gray-400">
          Permanently delete your account and all associated data
        </p>
      </div>
      <DeleteAccountButton userId={user.id} />
    </div>
  )
}

function ProfileCards({
  user,
  isLoading,
}: {
  user: User | null
  isLoading: boolean
}) {
  return (
    <>
      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden mb-8">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800" />
        <CardHeader className="pb-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white">
              Profile Information
            </h2>
            <p className="text-sm text-gray-400">Update your account details</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {isLoading ? (
            <ProfileInfoSkeleton />
          ) : (
            user != null && <ProfileInfo user={user} />
          )}
          <div className="h-px w-full bg-gray-800" />
          {isLoading ? (
            <ProfileFormSkeleton />
          ) : (
            user != null && <EditProfileForm user={user} />
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-900 to-black border-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-800" />
        <CardHeader className="pb-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white">Danger Zone</h2>
            <p className="text-sm text-gray-400">
              Irreversible account actions
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          {isLoading ? (
            <DangerZoneSkeleton />
          ) : (
            user != null && <DangerZone user={user} />
          )}
        </CardContent>
      </Card>
    </>
  )
}

async function ProfileData() {
  const user = await getCurrentUser({ fullUser: true })
  if (user == null) redirect("/login")

  return <ProfileCards user={user} isLoading={false} />
}
