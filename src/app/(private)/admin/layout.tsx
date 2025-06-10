import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { ReactNode } from "react"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage fighters, events and fights",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getCurrentUser({ fullUser: true })

  if (user == null) return redirect("/login")
  if (!canAccessAdmin(user)) return notFound()

  return <>{children}</>
}
