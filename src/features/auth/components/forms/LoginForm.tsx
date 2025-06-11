"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormData } from "@/features/auth/schemas/loginSchema"
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
import { login } from "@/features/auth/server/login"
import { googleLogin } from "@/features/auth/server/googleLogin"
import { toast } from "sonner"
import { LoadingSwap } from "@/components/LoadingSwap"
import { useRouter } from "next/navigation"

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isGooglePending, startGoogleTransition] = useTransition()
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: LoginFormData) {
    startTransition(async () => {
      const result = await login(data, { redirectTo })
      if (result?.error) {
        toast.error("Login Failed", {
          description: result.message,
          position: "top-center",
          duration: 4000,
        })
      }
    })
  }

  function handleGoogleLogin() {
    startGoogleTransition(async () => {
      const result = await googleLogin({ redirectTo })

      if (result.error || result.url == null) {
        toast.error("Google Login Failed", {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-200">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="youremail@example.com"
                  className="bg-[#1a1a1a] border-[#333] text-white focus-visible:ring-[#d20a0a]"
                  autoFocus
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

        <Button
          type="submit"
          className="w-full bg-[#d20a0a] hover:bg-red-700 text-white font-medium mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending || form.formState.isSubmitting}
        >
          <LoadingSwap loading={isPending || form.formState.isSubmitting}>
            Sign in
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
          onClick={handleGoogleLogin}
          disabled={isGooglePending}
        >
          <LoadingSwap loading={isGooglePending}>
            <>
              <FcGoogle size={20} />
              Sign in with Google
            </>
          </LoadingSwap>
        </Button>
      </form>
    </Form>
  )
}
