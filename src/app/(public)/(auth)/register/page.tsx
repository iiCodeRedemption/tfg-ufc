import { AppLink } from "@/components/AppLink"
import { RegisterForm } from "@/features/auth/components/forms/RegisterForm"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>
}) {
  const { redirectTo } = await searchParams

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] text-white px-4 py-8">
      <div className="w-full max-w-md p-8 bg-black rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#d20a0a] text-center mb-8">
          Create Your Account
        </h1>

        <RegisterForm redirectTo={redirectTo} />

        <div className="flex flex-col gap-4 mt-8 text-center">
          <p className="text-gray-400">
            Already have an account? <AppLink href="/login">Sign in</AppLink>
          </p>
          <p className="text-sm text-gray-400 text-center">
            By signing up, you agree to our{" "}
            <AppLink href="/terms">Terms of Service</AppLink> and{" "}
            <AppLink href="/terms">Privacy Policy</AppLink>
          </p>
        </div>
      </div>
    </div>
  )
}
