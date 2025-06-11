"use server"

import {
  BugReportFormData,
  bugReportSchema,
} from "@/features/mail/schemas/bugReportSchema"
import { sendBugReportEmail } from "@/features/mail/server/actions/sendBugReportEmail"

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

    await sendBugReportEmail({
      from: data.email,
      name: data.name,
      description: data.description,
    })

    return { error: false, message: "Bug report submitted successfully" }
  } catch (error) {
    console.error("Error submitting bug report:", error)
    return { error: true, message: "Failed to submit bug report" }
  }
}
