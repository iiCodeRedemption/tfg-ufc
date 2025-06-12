import { ReactNode } from "react"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default async function PrivateLayout({
  children,
}: {
  children: Readonly<ReactNode>
}) {
  const user = await getCurrentUser()
  if (user == null) return redirect("/login")

  return <>{children}</>
}
