import { LoginForm } from "@/features/auth/components/forms/LoginForm"
import { AppLink } from "@/components/AppLink"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const { redirectTo } = await searchParams

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] text-white px-4 py-8">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#d20a0a] text-center mb-8">
          Sign in
        </h1>

        <LoginForm redirectTo={redirectTo} />

        <div className="mt-4 p-3 bg-[#1a1a1a] rounded-md border border-[#333]">
          <p className="text-sm text-gray-300 text-center leading-relaxed">
            <span className="font-medium text-[#d20a0a]">Note:</span> If you
            previously signed in with Google, you cannot use email/password
            login. Please use the Google sign-in option instead.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8 text-center">
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <AppLink
              href={
                redirectTo
                  ? `/register?redirectTo=${encodeURIComponent(redirectTo)}`
                  : "/register"
              }
            >
              Register now
            </AppLink>
          </p>
          <p className="text-sm text-gray-400 text-center">
            By signing in, you agree to our{" "}
            <AppLink href="/terms">Terms of Service</AppLink> and{" "}
            <AppLink href="/terms">Privacy Policy</AppLink>
          </p>
        </div>
      </div>
    </div>
  )
}
