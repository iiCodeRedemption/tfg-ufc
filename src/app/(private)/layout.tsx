import { ReactNode } from "react"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"
import { notFound } from "next/navigation"

export default async function PrivateLayout({
  children,
}: {
  children: Readonly<ReactNode>
}) {
  const user = await getCurrentUser()
  if (user == null) return notFound()

  return <>{children}</>
}
