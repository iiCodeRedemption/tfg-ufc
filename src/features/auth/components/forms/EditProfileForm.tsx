"use client"

import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { updateUsername } from "@/features/auth/server/actions/updateUsername"
import { User } from "@prisma/client"
import { LoadingSwap } from "@/components/LoadingSwap"

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must not be longer than 20 characters.",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),
})

type FormValues = z.infer<typeof formSchema>

export function EditProfileForm({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username || "",
    },
  })

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        if (user.id == null) {
          throw new Error("User ID not found")
        }

        const result = await updateUsername({
          userId: user.id,
          username: values.username,
        })

        if (result.error) {
          toast.error(result.message || "Failed to update username")
          return
        }

        toast.success("Username updated successfully")
      } catch {
        toast.error("Something went wrong")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a] focus-visible:ring-offset-0"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#d20a0a]" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="bg-[#d20a0a] hover:bg-red-700 text-white w-full"
        >
          <LoadingSwap loading={isPending}>Update</LoadingSwap>
        </Button>
      </form>
    </Form>
  )
}
