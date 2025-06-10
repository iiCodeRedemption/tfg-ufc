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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FightMethod, FightType } from "@prisma/client"
import { toast } from "sonner"
import { createFight } from "@/features/fights/server/createFight"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FighterWithDetails } from "@/features/fighters/data/types"
import { EventWithDetails } from "@/features/events/data/types"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import React from "react"
import {
  FightFormData,
  fightSchema,
} from "@/features/fights/schemas/fightSchema"

export function FightDialog({
  fighters,
  events,
  trigger,
}: {
  fighters: FighterWithDetails[]
  events: EventWithDetails[]
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [hasWinner, setHasWinner] = useState(false)

  const form = useForm<FightFormData>({
    resolver: zodResolver(fightSchema),
    defaultValues: {
      fightType: FightType.MAIN_EVENT,
      rounds: 3,
      championshipFight: false,
      fighter1Id: "",
      fighter2Id: "",
      winnerId: null,
      method: FightMethod.DECISION,
      finishRound: null,
      finishTimeSeconds: null,
      eventId: "",
    },
  })

  const selectedMethod = form.watch("method")
  const needsFinishDetails = selectedMethod !== FightMethod.DECISION
  const fighter1Id = form.watch("fighter1Id")
  const fighter2Id = form.watch("fighter2Id")
  const isSameFighter = !!(
    fighter1Id &&
    fighter2Id &&
    fighter1Id === fighter2Id
  )

  function onSubmit(data: FightFormData) {
    if (!hasWinner) {
      data.winnerId = null
    }

    if (!needsFinishDetails) {
      data.finishRound = null
      data.finishTimeSeconds = null
    }

    startTransition(async () => {
      const result = await createFight(data)

      if (result.error) {
        toast.error(result.message || "Failed to create fight")
        return
      }

      toast.success("Fight added successfully")
      setOpen(false)

      form.reset()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-black border-gray-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Fight</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <fieldset disabled={isPending} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="eventId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Event</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                            <SelectValue placeholder="Select event" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              {event.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fightType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Fight Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                            <SelectValue placeholder="Select fight type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={FightType.MAIN_EVENT}>
                            Main Event
                          </SelectItem>
                          <SelectItem value={FightType.CO_MAIN_EVENT}>
                            Co-Main Event
                          </SelectItem>
                          <SelectItem value={FightType.PRELIMS}>
                            Prelims
                          </SelectItem>
                          <SelectItem value={FightType.EARLY_PRELIMS}>
                            Early Prelims
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fighter1Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Fighter 1</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          if (
                            form.getValues("winnerId") ===
                            form.getValues("fighter1Id")
                          ) {
                            form.setValue("winnerId", null)
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                            <SelectValue placeholder="Select fighter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {fighters
                            .filter(
                              (fighter) =>
                                !fighter2Id || fighter.id !== fighter2Id,
                            )
                            .map((fighter) => (
                              <SelectItem key={fighter.id} value={fighter.id}>
                                {fighter.name}
                                {fighter.nickname
                                  ? ` '${fighter.nickname}'`
                                  : ""}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fighter2Id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Fighter 2</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          if (
                            form.getValues("winnerId") ===
                            form.getValues("fighter2Id")
                          ) {
                            form.setValue("winnerId", null)
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                            <SelectValue placeholder="Select fighter" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {fighters
                            .filter(
                              (fighter) =>
                                !fighter1Id || fighter.id !== fighter1Id,
                            )
                            .map((fighter) => (
                              <SelectItem key={fighter.id} value={fighter.id}>
                                {fighter.name}
                                {fighter.nickname
                                  ? ` '${fighter.nickname}'`
                                  : ""}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="rounds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Rounds</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={12}
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 3)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="championshipFight"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-800 p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-gray-200">
                          Championship Fight
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Fight Result
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="has-winner"
                      checked={hasWinner ?? false}
                      onCheckedChange={setHasWinner}
                    />
                    <Label htmlFor="has-winner" className="text-gray-200">
                      Fight has result
                    </Label>
                  </div>
                </div>

                {hasWinner && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="winnerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">
                            Winner
                          </FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(
                                value !== "DRAW_NO_CONTEST" ? value : null,
                              )
                            }}
                            value={field.value || "DRAW_NO_CONTEST"}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                                <SelectValue placeholder="Select winner" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="DRAW_NO_CONTEST">
                                Draw / No Contest
                              </SelectItem>
                              {form.watch("fighter1Id") && (
                                <SelectItem
                                  key={`fighter1-${form.watch("fighter1Id")}`}
                                  value={form.watch("fighter1Id")}
                                >
                                  {fighters.find(
                                    (f) => f.id === form.watch("fighter1Id"),
                                  )?.name || "Fighter 1"}
                                </SelectItem>
                              )}
                              {form.watch("fighter2Id") && (
                                <SelectItem
                                  key={`fighter2-${form.watch("fighter2Id")}`}
                                  value={form.watch("fighter2Id")}
                                >
                                  {fighters.find(
                                    (f) => f.id === form.watch("fighter2Id"),
                                  )?.name || "Fighter 2"}
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[#ff4d4d]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200">
                            Victory Method
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={FightMethod.KO_TKO}>
                                KO/TKO
                              </SelectItem>
                              <SelectItem value={FightMethod.SUBMISSION}>
                                Submission
                              </SelectItem>
                              <SelectItem value={FightMethod.DECISION}>
                                Decision
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[#ff4d4d]" />
                        </FormItem>
                      )}
                    />

                    {needsFinishDetails && (
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="finishRound"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Finish Round
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={form.watch("rounds")}
                                  className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                                  value={
                                    field.value === null ? "" : field.value
                                  }
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value
                                        ? parseInt(e.target.value)
                                        : null,
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage className="text-[#ff4d4d]" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="finishTimeSeconds"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-200">
                                Finish Time (seconds)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={300}
                                  className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                                  value={
                                    field.value === null ? "" : field.value
                                  }
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.value
                                        ? parseInt(e.target.value)
                                        : null,
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage className="text-[#ff4d4d]" />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                )}
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
                disabled={isPending || Boolean(isSameFighter)}
              >
                <LoadingSwap loading={isPending}>Add Fight</LoadingSwap>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
