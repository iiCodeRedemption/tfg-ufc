"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1a1a1a] group-[.toaster]:text-white group-[.toaster]:border-[#333] group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-300",
          actionButton: "group-[.toast]:bg-[#d20a0a] group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-[#333] group-[.toast]:text-white",
          success:
            "group-[.toast]:border-l-4 group-[.toast]:border-l-green-500 group-[.toast]:pl-2",
          error:
            "group-[.toast]:border-l-4 group-[.toast]:border-l-[#d20a0a] group-[.toast]:pl-2",
          info: "group-[.toast]:border-l-4 group-[.toast]:border-l-blue-500 group-[.toast]:pl-2",
          warning:
            "group-[.toast]:border-l-4 group-[.toast]:border-l-yellow-500 group-[.toast]:pl-2",
        },
      }}
      position="top-center"
      closeButton
      richColors
      {...props}
    />
  )
}

export { Toaster }
