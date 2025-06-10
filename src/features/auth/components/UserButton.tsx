"use client"

import { useState, useTransition } from "react"
import { Button } from "../../../components/ui/button"
import {
  ChevronDown,
  HeartIcon,
  LogOut,
  Shield,
  User as UserIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUserInitials } from "@/features/auth/utils/getUserInitials"
import { logout } from "@/features/auth/server/logout"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User } from "@prisma/client"
import { canAccessAdmin } from "@/features/auth/server/permissions/canAccessAdmin"

export function UserButton({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  function handleLogout() {
    startTransition(async () => {
      await logout()
      router.refresh()
    })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 h-9 rounded-full bg-[#1a1a1a] border-[#333] hover:bg-[#333] px-3 focus-visible:ring-[#d20a0a]"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d20a0a] text-white text-xs font-bold uppercase">
            {getUserInitials(user.username)}
          </div>
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm text-white">
              {user.username}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-[#1a1a1a] border-[#333] text-white"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">
              {user.username}
            </p>
            <p className="text-xs leading-none text-gray-400">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#333]" />
        <DropdownMenuGroup>
          {canAccessAdmin(user) && (
            <DropdownMenuItem
              asChild
              className="hover:bg-[#333] hover:text-white focus:bg-[#333]"
            >
              <Link href="/admin">
                <Shield className="mr-2 h-4 w-4 text-gray-400" />
                <span>Admin</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            asChild
            className="hover:bg-[#333] hover:text-white focus:bg-[#333]"
          >
            <Link href="/favorites">
              <HeartIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span>Favorites</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="hover:bg-[#333] hover:text-white focus:bg-[#333]"
          >
            <Link href="/profile">
              <UserIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-[#333]" />
        <DropdownMenuItem
          className="text-[#d20a0a] hover:text-white hover:bg-red-500 focus:bg-red-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
