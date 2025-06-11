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
import { EventType } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { createEvent } from "@/features/events/server/createEvent"
import { updateEvent } from "@/features/events/server/updateEvent"
import {
  eventSchema,
  type EventFormData,
} from "@/features/events/schemas/eventSchema"
import { convertCentsToDollars } from "@/lib/math"
import { MAX_UPLOAD_FILE_SIZE } from "@/lib/supabase/data/constants/storage"
import { formatFileSize } from "@/lib/formatters"

export function EventForm({
  event,
}: {
  event?: {
    id?: string
    name: string
    date: string
    time: string
    location: string
    description?: string
    type: EventType
    imageUrl?: string
    isPPV: boolean
    price?: number | undefined
  }
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const defaultValues: EventFormData = event
    ? {
        name: event.name,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description || "",
        type: event.type,
        isPPV: event.isPPV,
        price:
          event.price != null ? convertCentsToDollars(event.price) : undefined,
        image: null,
      }
    : {
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        type: EventType.UFC,
        isPPV: false,
        price: undefined,
        image: null,
      }

  const [imagePreview, setImagePreview] = useState<string | null>(
    event?.imageUrl || null,
  )
  const [fileSizeError, setFileSizeError] = useState<string | null>(null)

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  })

  const isPPV = form.watch("isPPV")

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file == null) return

      if (file.size > MAX_UPLOAD_FILE_SIZE) {
        setFileSizeError(
          `Image size exceeds ${formatFileSize(MAX_UPLOAD_FILE_SIZE)} limit. Please upload a smaller file.`,
        )
        setImagePreview(null)
        form.setValue("image", null)
        return
      }

      setFileSizeError(null)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }

      reader.readAsDataURL(file)
      form.setValue("image", file)
    },
  })

  function onSubmit(data: EventFormData) {
    startTransition(async () => {
      const action =
        event != null ? updateEvent.bind(null, event.id!) : createEvent
      const result = await action(data)

      if (result.error) {
        toast.error(result.message || "Failed to save event")
        return
      }

      toast.success(result.message)
      router.push("/admin?tab=events")
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
                : fileSizeError
                  ? "border-red-500"
                  : "border-gray-700 hover:border-gray-600",
              imagePreview ? "h-48" : "h-32",
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
                    setFileSizeError(null)
                    form.setValue("image", null)
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                {fileSizeError ? (
                  <p className="text-red-500 mb-2">{fileSizeError}</p>
                ) : (
                  <>
                    <p className="text-gray-400 mb-2">
                      Drag & drop event poster here
                    </p>
                    <p className="text-sm text-gray-500">or click to select</p>
                    <p className="text-xs text-gray-500 mt-2">
                      (Max file size: 1MB)
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Promotion</FormLabel>
                  <Select
                    onValueChange={(value: EventType) => {
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
                      <SelectItem value={EventType.UFC}>UFC</SelectItem>
                      <SelectItem value={EventType.RIZIN}>RIZIN</SelectItem>
                      <SelectItem value={EventType.ONE}>ONE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPPV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">PPV Event</FormLabel>
                  <Select
                    onValueChange={(value: string) =>
                      field.onChange(value === "true")
                    }
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#333] text-white focus:ring-[#d20a0a]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Event Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. UFC 300: Pereira vs. Hill"
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
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
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. T-Mobile Arena, Las Vegas, NV"
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
                  <Textarea
                    placeholder="Event description"
                    className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a] min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#ff4d4d]" />
              </FormItem>
            )}
          />

          {isPPV && (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">PPV Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 79.99"
                      className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                      value={field.value === undefined ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            ? parseFloat(e.target.value)
                            : undefined,
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-[#ff4d4d]" />
                </FormItem>
              )}
            />
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
            <Link href="/admin?tab=events">Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-red-700 hover:bg-red-600 text-white"
            disabled={isPending}
          >
            <LoadingSwap loading={isPending}>
              {event != null ? "Save" : "Add"}
            </LoadingSwap>
          </Button>
        </div>
      </form>
    </Form>
  )
}
