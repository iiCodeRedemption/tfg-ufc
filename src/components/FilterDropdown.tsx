"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function FilterDropdown({
  label,
  options,
  value,
  onChange,
  renderOption,
  filterFunction,
}: {
  label: string
  options: { label: string; value: string; code?: string }[]
  value: string
  onChange: (value: string) => void
  renderOption?: (option: {
    label: string
    value: string
    code?: string
  }) => React.ReactNode
  filterFunction?: (value: string, search: string) => boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {value
              ? renderOption != null
                ? renderOption(
                    options.find((option) => option.value === value) || {
                      label:
                        options.find((option) => option.value === value)
                          ?.label || label,
                      value,
                    }
                  )
                : options.find((option) => option.value === value)?.label
              : label}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <Command
          filter={
            filterFunction
              ? (value, search) => {
                  if (search.trim() === "") return 1
                  return filterFunction(value, search) ? 1 : 0
                }
              : undefined
          }
        >
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {renderOption ? renderOption(option) : option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
