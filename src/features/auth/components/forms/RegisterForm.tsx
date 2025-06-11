"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  registerSchema,
  RegisterSchema,
} from "@/features/auth/schemas/registerSchema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { useState, useTransition } from "react"
import { FcGoogle } from "react-icons/fc"
import { register } from "@/features/auth/server/register"
import { googleLogin } from "@/features/auth/server/googleLogin"
import { LoadingSwap } from "@/components/LoadingSwap"
import { useRouter } from "next/navigation"

export function RegisterForm({ redirectTo }: { redirectTo?: string } = {}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isGooglePending, startGoogleTransition] = useTransition()

  const router = useRouter()

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: RegisterSchema) {
    startTransition(async () => {
      const result = await register(data)
      if (result.error) {
        toast.error("Registration Failed", {
          description: result.message,
          position: "top-center",
          duration: 4000,
        })
        return
      }

      toast.success("Registration Successful", {
        description: "Your account has been created. You are now logged in.",
        position: "top-center",
        duration: 4000,
      })

      router.push(redirectTo ?? "/")
    })
  }

  function handleGoogleRegister() {
    startGoogleTransition(async () => {
      const result = await googleLogin({ redirectTo })

      if (result.error || result.url == null) {
        toast.error("Google Registration Failed", {
          description: result.message,
          position: "top-center",
          duration: 4000,
        })
        return
      }

      router.push(result.url)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="yourusername"
                  className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                  autoFocus
                  autoComplete="username"
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
              <FormLabel className="text-gray-200">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="youremail@example.com"
                  className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#ff4d4d]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#1a1a1a] border-[#333] text-white pr-10 focus-visible:ring-[#d20a0a]"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-[#ff4d4d]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="bg-[#1a1a1a] border-[#333] text-white pr-10 focus-visible:ring-[#d20a0a]"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-[#ff4d4d]" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#d20a0a] hover:bg-red-700 text-white font-medium mt-6"
          disabled={isPending || form.formState.isSubmitting}
        >
          <LoadingSwap loading={isPending || form.formState.isSubmitting}>
            Create account
          </LoadingSwap>
        </Button>

        <div className="relative flex items-center py-2 mt-2">
          <div className="flex-grow border-t border-[#333]"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t border-[#333]"></div>
        </div>

        <Button
          type="button"
          className="w-full bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium flex items-center justify-center gap-2"
          onClick={handleGoogleRegister}
          disabled={isGooglePending}
        >
          <LoadingSwap loading={isGooglePending}>
            <>
              <FcGoogle size={20} />
              Register with Google
            </>
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  )
}
