import { NextResponse } from "next/server"

import { getUserByEmail } from "@/features/auth/server/db/getUserByEmail"
import { createUser } from "@/features/auth/server/createUser"
import { createClient } from "@/lib/supabase/server"
import { sendWelcomeEmail } from "@/features/mail/server/actions/sendWelcomeEmail"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)

  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"
  const redirectTo = searchParams.get("redirectTo") ?? next

  if (code == null) {
    return NextResponse.json({ error: "No code found" }, { status: 400 })
  }

  const supabase = await createClient()

  const { error, data } = await supabase.auth.exchangeCodeForSession(code)
  if (error != null) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (data == null || data.user == null) {
    return NextResponse.json(
      { error: "No user data found in session" },
      { status: 400 },
    )
  }

  const { email } = data.user
  if (email == null) {
    return NextResponse.json(
      { error: "No email found in user data" },
      { status: 400 },
    )
  }

  const user = await getUserByEmail(email)
  if (user == null) {
    const createUserError = await createUser({
      userId: data.user.id,
      email: email,
      username: email.split("@")[0],
    })

    if (createUserError.error) {
      return NextResponse.json(
        { error: createUserError.message },
        { status: 500 },
      )
    }

    await sendWelcomeEmail({
      to: email,
    })
  }

  return NextResponse.redirect(`${origin}${redirectTo}`)
}
