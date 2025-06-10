"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { deleteAccount } from "@/features/auth/server/actions/deleteAccount"
import { LoadingSwap } from "@/components/LoadingSwap"

export function DeleteAccountButton({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleDeleteAccount() {
    startTransition(async () => {
      try {
        const result = await deleteAccount({ userId })

        if (result.error) {
          toast.error(result.message || "Failed to delete account")
          setOpen(false)
          return
        }

        toast.success("Account deleted successfully")
        setOpen(false)
        router.push("/login")
      } catch (error) {
        toast.error("Something went wrong")
        console.error(error)
        setOpen(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-700 hover:bg-red-600 text-white"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1a1a1a] border-[#333] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-[#333] hover:bg-[#333] text-white"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isPending}
            className="bg-red-700 hover:bg-red-600 text-white"
          >
            <LoadingSwap loading={isPending}>
              Yes, delete my account
            </LoadingSwap>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
