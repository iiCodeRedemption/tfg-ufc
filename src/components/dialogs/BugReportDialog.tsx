"use client"

import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoadingSwap } from "@/components/LoadingSwap"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { submitBugReport } from "@/features/mail/server/submitBugReport"
import {
  BugReportFormData,
  bugReportSchema,
} from "@/features/mail/schemas/bugReportSchema"
import { Checkbox } from "@/components/ui/checkbox"

export function BugReportDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<BugReportFormData>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      consentToShareInfo: false,
    },
  })

  const consentToShareInfo = form.watch("consentToShareInfo")

  function onSubmit(data: BugReportFormData) {
    startTransition(async () => {
      const result = await submitBugReport(data)

      if (result.error) {
        toast.error(result.message || "Failed to submit bug report")
        return
      }

      toast.success("Bug report submitted successfully")
      setOpen(false)
      form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-black border-gray-800 text-white max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Report a Bug</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <fieldset disabled={isPending} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Your name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ff4d4d]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Your email</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ff4d4d]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">
                      Bug description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a] min-h-[120px]"
                        placeholder="Please describe the bug in detail. Include what you were doing, what you expected to happen, and what actually happened."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#ff4d4d]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="consentToShareInfo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-800 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-gray-200">
                        I consent to share my name and email address for
                        follow-up communications about this bug report.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </fieldset>

            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !consentToShareInfo}
                className="bg-red-700 hover:bg-red-600 text-white"
              >
                <LoadingSwap loading={isPending}>
                  <span>Submit</span>
                </LoadingSwap>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
