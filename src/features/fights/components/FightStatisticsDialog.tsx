"use client"

import { useState, useTransition } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
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
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateFightStatistics } from "@/features/fights/server/updateFightStatistics"
import {
  StatisticsFormData,
  statisticsSchema,
} from "@/features/fights/schemas/fightStatisticsSchema"

export function FightStatisticsDialog({
  fight,
  trigger,
  onSuccess,
}: {
  fight: {
    id: string
    fighter1Name: string
    fighter2Name: string
    statistics?: {
      id: string
      totalStrikes1: number
      totalStrikes2: number
      sigStrikes1: number
      sigStrikes2: number
      takedowns1: number
      takedowns2: number
      submissionAttempts1: number
      submissionAttempts2: number
      knockdowns1: number
      knockdowns2: number
      reversals1: number
      reversals2: number
    } | null
  }
  trigger: React.ReactNode
  onSuccess?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const defaultValues = fight.statistics
    ? {
        totalStrikes1: fight.statistics.totalStrikes1,
        totalStrikes2: fight.statistics.totalStrikes2,
        sigStrikes1: fight.statistics.sigStrikes1,
        sigStrikes2: fight.statistics.sigStrikes2,
        takedowns1: fight.statistics.takedowns1,
        takedowns2: fight.statistics.takedowns2,
        submissionAttempts1: fight.statistics.submissionAttempts1,
        submissionAttempts2: fight.statistics.submissionAttempts2,
        knockdowns1: fight.statistics.knockdowns1,
        knockdowns2: fight.statistics.knockdowns2,
        reversals1: fight.statistics.reversals1,
        reversals2: fight.statistics.reversals2,
      }
    : {
        totalStrikes1: 0,
        totalStrikes2: 0,
        sigStrikes1: 0,
        sigStrikes2: 0,
        takedowns1: 0,
        takedowns2: 0,
        submissionAttempts1: 0,
        submissionAttempts2: 0,
        knockdowns1: 0,
        knockdowns2: 0,
        reversals1: 0,
        reversals2: 0,
      }

  const form = useForm<StatisticsFormData>({
    resolver: zodResolver(statisticsSchema),
    defaultValues,
  })

  function onSubmit(data: StatisticsFormData) {
    startTransition(async () => {
      const result = await updateFightStatistics({
        fightId: fight.id,
        data,
      })

      if (result.error) {
        toast.error(result.message || "Failed to update fight statistics")
        return
      }

      toast.success("Fight statistics updated successfully")
      setOpen(false)

      if (onSuccess) {
        onSuccess()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-black border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Fight Statistics: {fight.fighter1Name} vs {fight.fighter2Name}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <fieldset disabled={isPending} className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 grid grid-cols-3 gap-4 pb-2 border-b border-gray-800">
                  <div className="text-right font-semibold text-red-500">
                    {fight.fighter1Name}
                  </div>
                  <div className="text-center font-semibold text-gray-400">
                    Stats
                  </div>
                  <div className="text-left font-semibold text-blue-500">
                    {fight.fighter2Name}
                  </div>
                </div>

                <StatisticRow
                  label="Total Strikes"
                  field1="totalStrikes1"
                  field2="totalStrikes2"
                  form={form}
                />

                <StatisticRow
                  label="Significant Strikes"
                  field1="sigStrikes1"
                  field2="sigStrikes2"
                  form={form}
                />

                <StatisticRow
                  label="Takedowns"
                  field1="takedowns1"
                  field2="takedowns2"
                  form={form}
                />

                <StatisticRow
                  label="Submission Attempts"
                  field1="submissionAttempts1"
                  field2="submissionAttempts2"
                  form={form}
                />

                <StatisticRow
                  label="Knockdowns"
                  field1="knockdowns1"
                  field2="knockdowns2"
                  form={form}
                />

                <StatisticRow
                  label="Reversals"
                  field1="reversals1"
                  field2="reversals2"
                  form={form}
                />
              </div>
            </fieldset>

            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-red-700 hover:bg-red-600 text-white"
                disabled={isPending}
              >
                <LoadingSwap loading={isPending}>
                  {fight.statistics ? "Update" : "Add"}
                </LoadingSwap>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function StatisticRow({
  label,
  field1,
  field2,
  form,
}: {
  label: string
  field1: keyof StatisticsFormData
  field2: keyof StatisticsFormData
  form: UseFormReturn<StatisticsFormData>
}) {
  return (
    <>
      <FormField
        control={form.control}
        name={field1}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="number"
                min={0}
                className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a] text-right"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage className="text-[#ff4d4d]" />
          </FormItem>
        )}
      />

      <div className="flex items-center justify-center">
        <FormLabel className="text-gray-300 m-0">{label}</FormLabel>
      </div>

      <FormField
        control={form.control}
        name={field2}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="number"
                min={0}
                className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage className="text-[#ff4d4d]" />
          </FormItem>
        )}
      />
    </>
  )
}
