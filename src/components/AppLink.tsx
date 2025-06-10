import { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function AppLink({
  href,
  underline = true,
  className,
  children,
}: {
  href: string
  underline?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn("text-[#d20a0a]", underline && "underline", className)}
    >
      {children}
    </Link>
  )
}
