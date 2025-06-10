import { Suspense } from "react"
import { HeaderClient } from "@/components/layouts/HeaderClient"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { UserSkeleton } from "@/features/auth/components/skeletons/UserSkeleton"
import { UserButton } from "@/features/auth/components/UserButton"
import { AppLink } from "@/components/AppLink"
import { Search } from "lucide-react"

export async function Header() {
  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-[1920px] mx-auto px-4">
        <HeaderClient>
          <Suspense fallback={<UserSkeleton />}>
            <UserContent />
          </Suspense>
        </HeaderClient>
      </div>
    </nav>
  )
}

async function UserContent() {
  const user = await getCurrentUser({ fullUser: true })

  if (user) {
    return <UserButton user={user} />
  }

  return (
    <>
      <AppLink
        href="/login"
        className="text-white hover:text-[#d20a0a] font-bold uppercase transition-colors"
        underline={false}
      >
        Connect
      </AppLink>
      <button
        aria-label="Search"
        className="hover:text-[#d20a0a] transition-colors rounded-full p-2 hover:bg-[#1a1a1a]"
      >
      </button>
    </>
  )
}
