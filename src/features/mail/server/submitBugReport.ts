"use server"

import {
  BugReportFormData,
  bugReportSchema,
} from "@/features/mail/schemas/bugReportSchema"
import { sendBugReportEmail } from "@/features/mail/server/actions/sendBugReportEmail"
import { getCurrentUser } from "@/features/auth/server/getCurrentUser"

export async function submitBugReport(unsafeData: BugReportFormData) {
  try {
    const { success, data, error } = bugReportSchema.safeParse(unsafeData)

    if (!success) {
      return {
        error: true,
        message: "Invalid form data",
        fieldErrors: error.flatten().fieldErrors,
      }
    }

    const user = await getCurrentUser()

    if (user == null || user.email == null) {
      return {
        error: true,
        message: "You must be logged in to submit a bug report",
      }
    }

    await sendBugReportEmail({
      from: user.email,
      name: data.name,
      description: data.description,
    })

    return { success: true, message: "Bug report submitted successfully" }
  } catch (error) {
    console.error("Error submitting bug report:", error)
    return { error: true, message: "Failed to submit bug report" }
  }
}
