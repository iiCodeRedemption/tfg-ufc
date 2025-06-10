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
import { useDropzone } from "react-dropzone"
import { cn } from "@/lib/utils"
import { LoadingSwap } from "@/components/LoadingSwap"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EventType, FighterStatus, Gender } from "@prisma/client"
import ReactCountryFlag from "react-country-flag"
import { COUNTRIES } from "@/data/constants/countries"
import Image from "next/image"
import { fighterSchema } from "@/features/fighters/schemas/fighterSchema"
import { FighterWithDetails } from "@/features/fighters/data/types"
import {
  FighterFormData,
  extractFighterFormData,
} from "@/features/fighters/types"
import { useRouter } from "next/navigation"
import { createFighter } from "@/features/fighters/server/createFighter"
import { updateFighter } from "@/features/fighters/server/updateFighter"
import { toast } from "sonner"
import Link from "next/link"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  PROMOTIONS,
  PROMOTION_NAMES,
} from "@/features/fighters/data/constants/promotions"

export function FighterForm({ fighter }: { fighter?: FighterWithDetails }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const defaultValues = extractFighterFormData(fighter)

  const [imagePreview, setImagePreview] = useState<string | null>(
    fighter?.imageUrl || null
  )

  const form = useForm<FighterFormData>({
    resolver: zodResolver(fighterSchema),
    defaultValues,
  })

  const currentPromotion = form.watch("promotion")

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          setImagePreview(reader.result as string)
        }

        reader.readAsDataURL(file)
        form.setValue("image", file)
      }
    },
  })

  function onSubmit(data: FighterFormData) {
    startTransition(async () => {
      const action =
        fighter != null ? updateFighter.bind(null, fighter.id) : createFighter
      const result = await action(data)

      if (result.error) {
        toast.error(result.message || "Failed to save fighter")
        return
      }

      toast.success(
        fighter ? "Fighter updated successfully" : "Fighter added successfully"
      )
      router.push("/admin?tab=fighters")
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={isPending} className="space-y-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-red-500 bg-red-500/10"
                : "border-gray-700 hover:border-gray-600",
              imagePreview ? "h-48" : "h-32"
            )}
          >
            <input {...getInputProps()} />
            {imagePreview ? (
              <div className="relative w-full h-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded"
                  width={100}
                  height={100}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    setImagePreview(null)
                    form.setValue("image", null)
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-400 mb-2">
                  Drag & drop fighter image here
                </p>
                <p className="text-sm text-gray-500">or click to select</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="promotion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Promotion</FormLabel>
                  <Select
                    onValueChange={(value: string) => {
                      field.onChange(value)
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                        <SelectValue placeholder="Select promotion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(PROMOTIONS).map(([, value]) => (
                        <SelectItem key={value} value={value}>
                          {PROMOTION_NAMES[value]}
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Male</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Female</SelectItem>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fighter's full name"
                      className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={FighterStatus.ACTIVE}>
                        Active
                      </SelectItem>
                      <SelectItem value={FighterStatus.RETIRED}>
                        Retired
                      </SelectItem>
                      <SelectItem value={FighterStatus.INACTIVE}>
                        Inactive
                      </SelectItem>
                      <SelectItem value={FighterStatus.CHAMPION}>
                        Champion
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">
                  Nickname (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fighter's nickname"
                    className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
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
                  Description (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fighter's description"
                    className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d]" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-gray-200">Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            <div className="flex items-center gap-2">
                              <ReactCountryFlag
                                countryCode={field.value}
                                svg
                                className="rounded-sm h-4 w-6"
                              />
                              <span>
                                {COUNTRIES.find(
                                  (country) => country.code === field.value
                                )?.name || field.value}
                              </span>
                            </div>
                          ) : (
                            "Select country"
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search country..."
                          className="border-[#333] text-white"
                        />
                        <CommandList>
                          <CommandEmpty className="text-gray-400">
                            No country found.
                          </CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-y-auto">
                            {COUNTRIES.map((country) => (
                              <CommandItem
                                value={country.name}
                                key={country.code}
                                onSelect={() => {
                                  form.setValue("countryCode", country.code)
                                }}
                                className="text-white hover:bg-[#333] focus:bg-[#333]"
                              >
                                <div className="flex items-center gap-2">
                                  <ReactCountryFlag
                                    countryCode={country.code}
                                    svg
                                    className="rounded-sm h-4 w-6"
                                  />
                                  <span>{country.name}</span>
                                  {field.value === country.code && (
                                    <Check className="ml-auto h-4 w-4" />
                                  )}
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Stance (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Orthodox"
                      className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Height</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 5'11"
                      className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Reach (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 72"
                      className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 155"
                      className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />
          </div>

          {currentPromotion === EventType.UFC && (
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white">UFC Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="isP4P"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        P4P Fighter
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value: string) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="titleWins"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Title Wins
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="titleLosses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Title Losses
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {currentPromotion === EventType.RIZIN && (
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white">
                RIZIN Details
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="gym"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Gym</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fighter's gym"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fighter's city"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="debutYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Debut Year
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 2020"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          value={
                            field.value === undefined || field.value === null
                              ? ""
                              : field.value
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {currentPromotion === EventType.ONE && (
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white">ONE Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gym"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Gym</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Fighter's gym"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fightingStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Fighting Style
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Muay Thai"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthLat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Birth Latitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="e.g. 35.6762"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          value={
                            field.value === undefined || field.value === null
                              ? ""
                              : field.value
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
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
                  name="birthLong"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">
                        Birth Longitude
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="e.g. 139.6503"
                          className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                          value={
                            field.value === undefined || field.value === null
                              ? ""
                              : field.value
                          }
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-[#ff4d4d]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
        </fieldset>

        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
            asChild
            disabled={isPending}
          >
            <Link href="/admin?tab=fighters">Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-red-700 hover:bg-red-600 text-white"
            disabled={isPending}
          >
            <LoadingSwap loading={isPending}>
              {fighter != null ? "Save" : "Add"}
            </LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  )
}
